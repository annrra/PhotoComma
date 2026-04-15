import type { Metadata } from "next";
import { HomeLayout } from '@/src/components/HomeLayout';

export const metadata: Metadata = {
  title: 'photo comma',
  description: 'Photo comma is a personal photography project with photo stories and stand alone images without particular connection with each other taken randomly from here and there.',

  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      <HomeLayout />
    </>
  );
}

