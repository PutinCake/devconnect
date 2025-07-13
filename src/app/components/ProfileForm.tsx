'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './ProfileForm.module.css';

const DEFAULT_AVATAR = "https://avatars.githubusercontent.com/u/583231?v=4";

interface ProfileFormProps {
  title: string;
  isSetup?: boolean;
}

export default function ProfileForm({ title, isSetup = false }: ProfileFormProps) {
  const { data: session, status, update } = useSession({
    required: true, // 自动重定向到登录页如果未认证
  });
  const router = useRouter();
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setAvatarUrl(session.user.image || DEFAULT_AVATAR);
    }
  }, [session]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/profile/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, avatarUrl }),
      });

      if (res.ok) {
        // 立即更新客户端 session，使导航栏等处的 UI 实时变化
        await update({ user: { name, image: avatarUrl } });
        
        if (isSetup) {
          // 首次设置后，跳转到 dashboard
          router.push('/dashboard');
        } else {
          // 编辑成功后，给一个提示
          alert('Profile updated successfully!');
        }
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to update profile.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return <p className={styles.loading}>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{title}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.avatarPreview}>
          <Image
            src={avatarUrl}
            alt="Avatar Preview"
            width={80}
            height={80}
            className={styles.avatarImage}
            onError={() => setAvatarUrl(DEFAULT_AVATAR)}
            priority
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="avatarUrl" className={styles.label}>Avatar URL</label>
          <input id="avatarUrl" type="url" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} className={styles.input} />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" disabled={isLoading} className={styles.button}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}