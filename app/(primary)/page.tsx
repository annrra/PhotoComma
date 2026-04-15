import type { Metadata } from "next";
import { HomeLayout } from '@/src/components/HomeLayout';
import { getHomePage, getHeroSlides } from '@/lib/api';

export const metadata: Metadata = {
  title: 'photo comma',
  description: 'Photo comma is a personal photography project with photo stories and stand alone images without particular connection with each other taken randomly from here and there.',

  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  const introData = await getHomePage();
  const intro = introData?.nodeByUri ?? {};
  const introContent = intro?.content || '';

  const slidesRaw = await getHeroSlides();
  const slides = slidesRaw?.posts?.nodes ?? [];

  return (
    <>
      <HomeLayout introContent={introContent} slides={slides} />
    </>
  );
}

