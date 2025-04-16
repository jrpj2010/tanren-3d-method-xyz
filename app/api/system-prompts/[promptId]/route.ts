import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Params {
  params: { promptId: string };
}

// PUT: 特定のシステムプロンプトを更新
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { promptId } = params;
    const body = await request.json();
    const { name, content, isDefault } = body;

    if (!name || !content) {
      return NextResponse.json({ error: 'プロンプト名と内容は必須です' }, { status: 400 });
    }

    // もし isDefault が true なら、他のすべてのプロンプトの isDefault を false に更新
    if (isDefault === true) {
      await prisma.systemPrompt.updateMany({
        where: {
          isDefault: true,
          NOT: { id: promptId }, // 更新対象のプロンプトは除く
        },
        data: { isDefault: false },
      });
    }

    const updatedPrompt = await prisma.systemPrompt.update({
      where: { id: promptId },
      data: {
        name,
        content,
        isDefault: isDefault === true,
      },
    });

    return NextResponse.json(updatedPrompt);
  } catch (error: any) {
    console.error('Error updating system prompt:', error);
     // Prisma の一意制約違反エラーコード
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
       return NextResponse.json({ error: '同じ名前のプロンプトが既に存在します' }, { status: 409 });
    }
    // Prisma のレコードが見つからないエラーコード
    if (error.code === 'P2025') {
       return NextResponse.json({ error: '指定されたプロンプトが見つかりません' }, { status: 404 });
    }
    return NextResponse.json({ error: 'システムプロンプトの更新中にエラーが発生しました' }, { status: 500 });
  }
}

// DELETE: 特定のシステムプロンプトを削除
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { promptId } = params;

    // デフォルトプロンプトは削除できないようにする (必要に応じて)
    const promptToDelete = await prisma.systemPrompt.findUnique({
      where: { id: promptId },
    });
    if (promptToDelete?.isDefault) {
      return NextResponse.json({ error: 'デフォルトのプロンプトは削除できません' }, { status: 400 });
    }

    await prisma.systemPrompt.delete({
      where: { id: promptId },
    });

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error: any) {
    console.error('Error deleting system prompt:', error);
    // Prisma のレコードが見つからないエラーコード
    if (error.code === 'P2025') {
       return NextResponse.json({ error: '指定されたプロンプトが見つかりません' }, { status: 404 });
    }
    return NextResponse.json({ error: 'システムプロンプトの削除中にエラーが発生しました' }, { status: 500 });
  }
}