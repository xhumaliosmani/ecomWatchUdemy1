"use client"
import FeaturedProduct from "@/components/HomepageComponents/FeaturedProduct";
import Image from "next/image";
import HeroVideo from '@/components/HomepageComponents/HeroVideo'
import BestSellingWatches from "@/components/HomepageComponents/BestSelling";
import GallerySlider from "@/components/HomepageComponents/GallerySlider";
import WatchOfTheMonth from "@/components/HomepageComponents/WatchOfTheMonth";
import WatchReviewSlider from "@/components/HomepageComponents/WatchReviewSlider";
import NewsletterComponent from "@/components/HomepageComponents/NewsletterComponent";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
  return (
    <div>
      <HeroVideo/>
     <BestSellingWatches/>
     <FeaturedProduct/>
     <GallerySlider/>
     <WatchOfTheMonth/>
     <WatchReviewSlider/>
     <NewsletterComponent/>
    </div>
  );
}
