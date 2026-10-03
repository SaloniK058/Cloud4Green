import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CtaSection from "@/components/sections/enterprise-cta/EnterpriseCTA";
import CustomerStoriesHero from "@/components/customer-stories/CustomerStoriesHero";
import FeaturedStory from "@/components/customer-stories/FeaturedStory";
import StoriesGrid from "@/components/customer-stories/StoriesGrid";
import {  customerStories } from "@/data/customerStories";

/**
 * /customers — linked from the "Customer stories" promo in both navbar mega
 * menus and the top-level nav item (see src/config/navigation.js).
 *
 * Masthead, one featured story at full width, then the rest as a filterable
 * grid, closing on the same <CtaSection> as every other page. The stories
 * live in src/data/customerStories.js; mark one `featured: true` to lead.
 */
export default function CustomerStories() {
  const featured = customerStories.find((s) => s.featured) ?? customerStories[0];
  const rest = customerStories.filter((s) => s !== featured);

  return (
    <>
      <Navbar />

      <main className="bg-[#FAFAF7]">
        {/* INDUSTRIES includes the "All" filter, hence the - 1. */}
        <CustomerStoriesHero industryCount={ 20} />
        <FeaturedStory story={featured} />
        <StoriesGrid stories={rest} />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
