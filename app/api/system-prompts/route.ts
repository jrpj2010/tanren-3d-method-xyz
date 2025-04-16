import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: すべてのシステムプロンプトを取得
export async function GET(request: NextRequest) {
  try {
    const prompts = await prisma.systemPrompt.findMany({
      orderBy: {
        createdAt: 'desc', // 作成日時の降順で取得
      },
    });
    return NextResponse.json(prompts);
  } catch (error) {
    console.error('Error fetching system prompts:', error);
    return NextResponse.json({ error: 'システムプロンプトの取得中にエラーが発生しました' }, { status: 500 });
  }
}

// POST: 新しいシステムプロンプトを作成
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, content, isDefault } = body;

    if (!name || !content) {
      return NextResponse.json({ error: 'プロンプト名と内容は必須です' }, { status: 400 });
    }

    // もし isDefault が true なら、他のすべてのプロンプトの isDefault を false に更新
    if (isDefault === true) {
      await prisma.systemPrompt.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      });
    }

    const newPrompt = await prisma.systemPrompt.create({
      data: {
        name,
        content,
        isDefault: isDefault === true, // boolean 値であることを確認
      },
    });
    return NextResponse.json(newPrompt, { status: 201 });
  } catch (error: any) {
    console.error('Error creating system prompt:', error);
    // Prisma の一意制約違反エラーコード
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
       return NextResponse.json({ error: '同じ名前のプロンプトが既に存在します' }, { status: 409 }); // 409 Conflict
    }
    return NextResponse.json({ error: 'システムプロンプトの作成中にエラーが発生しました' }, { status: 500 });
  }
}