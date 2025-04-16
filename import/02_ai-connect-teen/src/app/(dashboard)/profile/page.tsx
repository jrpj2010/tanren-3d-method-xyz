'use client';

import { useState } from 'react';
import { User, Mail, School, Calendar, Edit, Save, X } from 'lucide-react';

type UserProfile = {
  username: string;
  email: string;
  role: string;
  grade: string;
  joinDate: string;
  bio: string;
  interests: string[];
  avatarUrl: string | null;
};

export default function ProfilePage() {
  // サンプルユーザーデータ
  const [profile, setProfile] = useState<UserProfile>({
    username: '田中太郎',
    email: 'tanaka.taro@example.com',
    role: 'STUDENT',
    grade: '高校2年生',
    joinDate: '2024年1月15日',
    bio: '数学と科学が好きです。将来は工学系の大学に進学したいと考えています。',
    interests: ['数学', '物理', 'プログラミング', '読書'],
    avatarUrl: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleEditToggle = () => {
    if (isEditing) {
      // 保存せずにキャンセル
      setEditedProfile(profile);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // TODO: APIを呼び出してプロフィール更新
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const interests = value.split(',').map(item => item.trim()).filter(Boolean);
    setEditedProfile(prev => ({ ...prev, interests }));
  };

  // 役割の日本語表示
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'STUDENT': return '生徒';
      case 'TEACHER': return '教師';
      case 'PARENT': return '保護者';
      default: return role;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">プロフィール</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {/* プロフィールヘッダー */}
        <div className="relative h-40 bg-gradient-to-r from-primary/20 to-blue-400/20">
          <div className="absolute -bottom-16 left-8 flex">
            <div className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
              {profile.avatarUrl ? (
                <img 
                  src={profile.avatarUrl} 
                  alt={profile.username} 
                  className="h-full w-full rounded-full object-cover" 
                />
              ) : (
                <User className="h-16 w-16" />
              )}
            </div>
          </div>
          <div className="absolute top-4 right-4">
            {isEditing ? (
              <div className="flex space-x-2">
                <button 
                  onClick={handleSave} 
                  className="p-2 bg-primary text-white rounded-full"
                >
                  <Save className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleEditToggle} 
                  className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleEditToggle} 
                className="p-2 bg-white dark:bg-gray-700 rounded-full"
              >
                <Edit className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* プロフィール情報 */}
        <div className="pt-20 px-8 pb-8">
          <div className="space-y-6">
            {/* 基本情報 */}
            <div>
              <h2 className="text-xl font-bold mb-4">基本情報</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>ユーザー名</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={editedProfile.username}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <div className="font-medium">{profile.username}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>メールアドレス</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <div className="font-medium">{profile.email}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <School className="h-4 w-4" />
                    <span>学年</span>
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      name="grade"
                      value={editedProfile.grade}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <div className="font-medium">{profile.grade}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>登録日</span>
                  </div>
                  <div className="font-medium">{profile.joinDate}</div>
                </div>
              </div>
            </div>

            {/* 自己紹介 */}
            <div>
              <h2 className="text-xl font-bold mb-4">自己紹介</h2>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={editedProfile.bio}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-primary min-h-[120px]"
                  placeholder="自己紹介を入力してください"
                />
              ) : (
                <p className="text-gray-800 dark:text-gray-200">{profile.bio}</p>
              )}
            </div>

            {/* 興味・関心 */}
            <div>
              <h2 className="text-xl font-bold mb-4">興味・関心</h2>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={editedProfile.interests.join(', ')}
                    onChange={handleInterestChange}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
                    placeholder="カンマ区切りで入力（例: 数学, 物理, プログラミング）"
                  />
                  <p className="text-xs text-gray-500 mt-1">カンマ（,）で区切って入力してください</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* アカウント情報 */}
            <div>
              <h2 className="text-xl font-bold mb-4">アカウント情報</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                  <div>
                    <div className="font-medium">アカウントタイプ</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {getRoleLabel(profile.role)}
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm">
                    アクティブ
                  </span>
                </div>

                <div className="space-y-4">
                  <button className="text-primary hover:underline text-sm">
                    パスワードを変更
                  </button>
                  <button className="text-red-600 dark:text-red-400 hover:underline text-sm block">
                    アカウントを削除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
