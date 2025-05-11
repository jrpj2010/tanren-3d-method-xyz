import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { z } from 'zod';

// メッセージスキーマ
const messageSchema = z.object({
  conversationId: z.string().uuid(),
  content: z.string().min(1).max(1000),
});

// メッセージ一覧取得
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: '認証が必要です' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');
    
    if (!conversationId) {
      return NextResponse.json(
        { success: false, message: 'conversationIdが必要です' },
        { status: 400 }
      );
    }
    
    // 会話が存在するか確認
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        participants: {
          where: { userId: session.user.id },
        },
      },
    });
    
    // ユーザーが会話の参加者であるか確認
    if (!conversation || conversation.participants.length === 0) {
      return NextResponse.json(
        { success: false, message: 'このアクションの権限がありません' },
        { status: 403 }
      );
    }
    
    // メッセージを取得
    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            profile: {
              select: {
                avatarUrl: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
    
    return NextResponse.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('メッセージ取得エラー:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}

// メッセージ送信
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: '認証が必要です' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // バリデーション
    const result = messageSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: '入力データが無効です',
          errors: result.error.format(),
        },
        { status: 400 }
      );
    }
    
    const { conversationId, content } = result.data;
    
    // 会話が存在するか確認
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        participants: {
          where: { userId: session.user.id },
        },
      },
    });
    
    // ユーザーが会話の参加者であるか確認
    if (!conversation || conversation.participants.length === 0) {
      return NextResponse.json(
        { success: false, message: 'このアクションの権限がありません' },
        { status: 403 }
      );
    }
    
    // メッセージを作成
    const message = await prisma.message.create({
      data: {
        content,
        senderId: session.user.id,
        conversationId,
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            profile: {
              select: {
                avatarUrl: true,
              },
            },
          },
        },
      },
    });
    
    // 会話の最終更新日時を更新
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });
    
    return NextResponse.json(
      {
        success: true,
        message: 'メッセージが送信されました',
        data: message,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('メッセージ送信エラー:', error);
    return NextResponse.json(
      { success: false, message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
}
