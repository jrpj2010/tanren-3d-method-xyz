import { Client } from "@googlemaps/google-maps-services-js";
import { parse } from 'csv-parse';
import { stringify } from 'csv-stringify/sync';
import fs from 'fs/promises';
import path from 'path';

// 提供されたAPIキーを使用
const API_KEY = "AIzaSyDvZa5QTmqdAB0do_K3W5NAeW6di69_3BI";
const client = new Client({});

const inputFile = 'tokyo_tourist_spots.csv';
const outputFile = 'tokyo_tourist_spots_with_coordinates.csv';

// APIリクエスト間の待機時間 (ミリ秒) - レート制限対策
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const REQUEST_DELAY = 100; // 100ミリ秒待機

async function getCoordinates(address) {
  try {
    const response = await client.geocode({
      params: {
        address: address,
        key: API_KEY,
        language: 'ja' // 結果を日本語で取得
      },
      timeout: 5000, // タイムアウトを5秒に設定
    });

    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      console.log(`座標取得成功: ${address} -> ${location.lat}, ${location.lng}`);
      return { lat: location.lat, lng: location.lng };
    } else {
      console.warn(`座標取得失敗: ${address} - Status: ${response.data.status}`);
      if (response.data.error_message) {
        console.warn(`  Error Message: ${response.data.error_message}`);
      }
      return null;
    }
  } catch (error) {
    console.error(`座標取得中にエラー発生: ${address}`, error.response?.data || error.message);
    return null;
  }
}

async function processCSV() {
  try {
    const inputFilePath = path.resolve(inputFile);
    const outputFilePath = path.resolve(outputFile);

    console.log(`入力ファイル読み込み中: ${inputFilePath}`);
    const fileContent = await fs.readFile(inputFilePath, { encoding: 'utf8' });

    const parser = parse({
      columns: true, // ヘッダー行をキーとして使用
      skip_empty_lines: true
    });

    const records = [];
    parser.on('readable', function(){
      let record;
      while ((record = parser.read()) !== null) {
        records.push(record);
      }
    });
    parser.on('error', function(err){
      console.error('CSVパースエラー:', err.message);
    });

    parser.write(fileContent);
    parser.end();

    await new Promise(resolve => parser.on('end', resolve)); // パース完了を待つ

    console.log(`${records.length} 件のレコードを読み込みました。`);

    const outputRecords = [];
    // 新しいヘッダー
    outputRecords.push(['名称', '簡単な説明', '緯度', '経度']);

    for (const record of records) {
      const name = record['名称']; // CSVのヘッダー名に合わせる
      const description = record['簡単な説明']; // CSVのヘッダー名に合わせる

      if (!name) {
        console.warn('名称が見つからないレコードをスキップ:', record);
        continue;
      }

      console.log(`処理中: ${name}`);
      const coords = await getCoordinates(name);
      await delay(REQUEST_DELAY); // レート制限対策

      outputRecords.push([
        name,
        description,
        coords ? coords.lat : '', // 座標が取得できなかった場合は空文字
        coords ? coords.lng : ''  // 座標が取得できなかった場合は空文字
      ]);
    }

    console.log('CSVデータ生成中...');
    const outputCSV = stringify(outputRecords);

    console.log(`出力ファイル書き込み中: ${outputFilePath}`);
    await fs.writeFile(outputFilePath, outputCSV, { encoding: 'utf8' });

    console.log(`処理完了！結果は ${outputFile} に保存されました。`);

  } catch (error) {
    console.error('スクリプト実行中にエラーが発生しました:', error);
  }
}

processCSV();
