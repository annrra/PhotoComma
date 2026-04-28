import type { Metadata } from "next";
import { HomeLayout } from '@/src/components/HomeLayout';
import { getHomePage, getHeroSlides, getMainNavigation } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Photography & Visual Stories',
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

  const navRaw = await getMainNavigation();
  const navItems = navRaw?.menu?.menuItems?.nodes ?? [];

  return (
    <>
      <HomeLayout introContent={introContent} slides={slides} navigation={navItems} />
    </>
  );
}

