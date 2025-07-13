// src/app/profile/setup/page.tsx
import ProfileForm from '@/app/components/ProfileForm';

export default function SetProfilePage() {
  return (
    <main>
      <ProfileForm title="Set Up Your Profile" isSetup={true} />
    </main>
  );
}
