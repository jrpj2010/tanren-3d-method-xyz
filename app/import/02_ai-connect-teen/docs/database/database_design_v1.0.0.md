# データベース設計 v1.0.0

## 概要
AI Connect Teen プロジェクトのデータベース設計について説明します。
PostgreSQLをメインデータベースとして使用し、Prisma ORMを用いて型安全なデータアクセスを実現します。

## データベースアーキテクチャ

### 基本方針
- リレーショナルデータベース（PostgreSQL）をメイン
- キャッシュ層としてRedisを併用
- 大規模ファイルはS3バケットに保存

### データベース接続
- 開発環境: コンテナ内PostgreSQL
- ステージング環境: AWS RDS (t3.small)
- 本番環境: AWS RDS (t3.medium) + リードレプリカ

## データモデル

### User (ユーザー)
```prisma
model User {
  id            String      @id @default(cuid())
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt
  email         String      @unique
  passwordHash  String
  username      String      @unique
  displayName   String?
  bio           String?
  avatarUrl     String?
  role          UserRole    @default(STUDENT)
  isVerified    Boolean     @default(false)
  lastLoginAt   DateTime?
  status        UserStatus  @default(ACTIVE)
  
  // リレーション
  profile       Profile?
  sentMessages     Message[]   @relation("SentMessages")
  receivedMessages Message[]   @relation("ReceivedMessages")
  aiSessions    AISession[]
  notifications Notification[]
  
  @@index([email])
  @@index([username])
}

enum UserRole {
  STUDENT
  PARENT
  TEACHER
  ADMIN
}

enum UserStatus {
  ACTIVE
  SUSPENDED
  DEACTIVATED
}
```

### Profile (プロフィール)
```prisma
model Profile {
  id            String    @id @default(cuid())
  userId        String    @unique
  age           Int?
  grade         String?
  schoolName    String?
  interests     String[]
  learningGoals String[]
  parentEmail   String?
  
  // リレーション
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
}
```

### Message (メッセージ)
```prisma
model Message {
  id            String    @id @default(cuid())
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  content       String
  senderId      String
  receiverId    String
  isRead        Boolean   @default(false)
  readAt        DateTime?
  attachments   Attachment[]
  
  // リレーション
  sender        User      @relation("SentMessages", fields: [senderId], references: [id])
  receiver      User      @relation("ReceivedMessages", fields: [receiverId], references: [id])
  
  @@index([senderId])
  @@index([receiverId])
  @@index([createdAt])
}
```

### Attachment (添付ファイル)
```prisma
model Attachment {
  id            String    @id @default(cuid())
  createdAt     DateTime  @default(now())
  messageId     String
  fileUrl       String
  fileName      String
  fileSize      Int
  fileType      String
  
  // リレーション
  message       Message   @relation(fields: [messageId], references: [id], onDelete: Cascade)
  
  @@index([messageId])
}
```

### AISession (AIセッション)
```prisma
model AISession {
  id            String    @id @default(cuid())
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  userId        String
  title         String
  isActive      Boolean   @default(true)
  
  // リレーション
  user          User      @relation(fields: [userId], references: [id])
  messages      AIMessage[]
  
  @@index([userId])
  @@index([createdAt])
}
```

### AIMessage (AIメッセージ)
```prisma
model AIMessage {
  id            String    @id @default(cuid())
  createdAt     DateTime  @default(now())
  sessionId     String
  content       String
  role          AIMessageRole
  
  // リレーション
  session       AISession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  
  @@index([sessionId])
  @@index([createdAt])
}

enum AIMessageRole {
  USER
  ASSISTANT
  SYSTEM
}
```

### Notification (通知)
```prisma
model Notification {
  id            String    @id @default(cuid())
  createdAt     DateTime  @default(now())
  userId        String
  type          NotificationType
  title         String
  message       String
  isRead        Boolean   @default(false)
  readAt        DateTime?
  data          Json?
  
  // リレーション
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([createdAt])
}

enum NotificationType {
  NEW_MESSAGE
  SYSTEM
  SECURITY
  ANNOUNCEMENT
}
```

## データ移行戦略

### マイグレーション
- Prismaマイグレーションを使用
- バージョン管理されたマイグレーションファイル
- ロールバック手順の文書化

### バックアップ
- 日次完全バックアップ
- 6時間ごとの差分バックアップ
- 30日間のバックアップ保持

## パフォーマンス最適化

### インデックス
- 頻繁に検索される列にインデックス
- 複合インデックスの活用
- インデックス使用状況の定期的な見直し

### クエリ最適化
- N+1問題の回避
- ページネーションの適用
- 適切なJOIN戦略

## セキュリティ対策

### データ保護
- 個人情報の暗号化
- パスワードのハッシュ化（Argon2id）
- アクセス制御の厳格化

### 監査
- ユーザーアクションのログ記録
- データアクセスの監査証跡
- 定期的なセキュリティレビュー

## バージョン履歴
- v1.0.0 (2025-03-21): 初版作成
