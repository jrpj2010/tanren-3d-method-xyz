import React from 'react';
import Link from 'next/link';
import { MainLayout } from './components/layout/MainLayout';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { COLOR_SCHEME } from './lib/api/config';

export default function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl mt-8 mb-16 text-center">
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ 
              fontFamily: 'Noto Serif JP, serif',
              color: COLOR_SCHEME.PRIMARY,
              letterSpacing: '0.05em',
            }}
          >
            VibeCoding
          </h1>
          <p 
            className="text-xl"
            style={{ 
              fontFamily: 'Noto Serif JP, serif',
              color: COLOR_SCHEME.PRIMARY,
              letterSpacing: '0.03em',
            }}
          >
            議事録からプレゼンテーションスライドを自動生成
          </p>
          <div className="mt-6">
            <Link href="/new-project">
              <Button 
                variant="accent1" 
                size="lg"
                style={{ letterSpacing: '0.05em' }}
              >
                新規プロジェクト作成
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <Card>
            <CardHeader>
              <CardTitle
                style={{ 
                  color: COLOR_SCHEME.ACCENT_1,
                  fontFamily: 'Noto Serif JP, serif',
                  letterSpacing: '0.05em',
                }}
              >
                簡単操作
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed"
                style={{ 
                  color: COLOR_SCHEME.PRIMARY,
                  letterSpacing: '0.03em',
                }}
              >
                議事録テキストを入力または貼り付けるだけで、AIが自動的に最適なスライド構成を作成します。複雑な操作は一切不要です。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle
                style={{ 
                  color: COLOR_SCHEME.ACCENT_2,
                  fontFamily: 'Noto Serif JP, serif',
                  letterSpacing: '0.05em',
                }}
              >
                美しいデザイン
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed"
                style={{ 
                  color: COLOR_SCHEME.PRIMARY,
                  letterSpacing: '0.03em',
                }}
              >
                明治・昭和モダンテイストの洗練されたデザインで、情報が整理された美しいスライドを生成します。一流デザイナーのような仕上がりが特徴です。
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle
                style={{ 
                  color: COLOR_SCHEME.ACCENT_3,
                  fontFamily: 'Noto Serif JP, serif',
                  letterSpacing: '0.05em',
                }}
              >
                完全パッケージ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed"
                style={{ 
                  color: COLOR_SCHEME.PRIMARY,
                  letterSpacing: '0.03em',
                }}
              >
                SVGスライド、トークスクリプト、画像生成プロンプトをセットで出力。プレゼンテーションに必要なすべての素材を一度に生成します。
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 w-full max-w-4xl">
          <h2 
            className="text-2xl font-bold mb-4 text-center"
            style={{ 
              fontFamily: 'Noto Serif JP, serif',
              color: COLOR_SCHEME.PRIMARY,
              letterSpacing: '0.05em',
            }}
          >
            使い方
          </h2>
          <div className="rounded-lg p-6"
            style={{ 
              backgroundColor: COLOR_SCHEME.SECONDARY,
              border: `1px solid ${COLOR_SCHEME.PRIMARY}`,
            }}
          >
            <ol className="list-decimal pl-5 space-y-4"
              style={{ 
                color: COLOR_SCHEME.PRIMARY,
                letterSpacing: '0.03em',
              }}
            >
              <li>「新規プロジェクト作成」ボタンをクリックします。</li>
              <li>議事録テキストを入力エリアに貼り付けるか、テキストファイルをアップロードします。</li>
              <li>プロジェクト名を入力し、必要に応じてスライド数を調整します。</li>
              <li>「スライド生成」ボタンをクリックすると、AIが議事録を分析し最適なスライドを生成します。</li>
              <li>生成されたスライドをプレビューし、問題がなければ「すべてダウンロード」ボタンからプロジェクト一式をダウンロードできます。</li>
            </ol>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
