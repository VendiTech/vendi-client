'use client';

import Link from 'next/link';
import { useCreateScheduleModal } from '@/ui/organisms/Modals';
import { Button } from '@/ui/atoms/Button';

export default function Home() {
  const [openScheduleModal] = useCreateScheduleModal();

  const createSchedule = () =>
    openScheduleModal({
      onConfirm: () => {},
    });

  return (
    <div>
      <Button onClick={createSchedule}>modal</Button>
      <Link href={'/admin'}>Admin</Link>
    </div>
  );
}
