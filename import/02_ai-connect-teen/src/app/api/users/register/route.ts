import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';
import { z } from 'zod';

// バリデーションスキーマ
const userSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['STUDENT', 'TEACHER', 'PARENT']),
  grade: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // バリデーション
    const result = userSchema.safeParse(body);
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
    
    const { username, email, password, role, grade } = result.data;
    
    // メールアドレスの重複チェック
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'このメールアドレスは既に登録されています',
        },
        { status: 409 }
      );
    }
    
    // パスワードのハッシュ化
    const passwordHash = await hash(password, 10);
    
    // ユーザーの作成
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        role,
        grade: grade || null,
        profile: {
          create: {
            bio: '',
          }
        }
      },
    });
    
    // パスワードハッシュを除外したレスポンス
    return NextResponse.json(
      {
        success: true,
        message: 'ユーザーが正常に登録されました',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('ユーザー登録エラー:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'サーバーエラーが発生しました',
      },
      { status: 500 }
    );
  }
}
