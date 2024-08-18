import React from "react";
import Image from "next/image";
import { Clock, User, Tag, Facebook, Twitter, Linkedin } from "lucide-react";
import ProfileBlog from "@/public/profileblog.png";
import VintageWatch1 from "@/public/vintagewatch1.jpg";
import VintageWatch2 from "@/public/vintagewatch2.jpg";
import VintageWatch3 from "@/public/vintagewatch3.jpg";
import NewsletterComponent from "@/components/HomepageComponents/NewsletterComponent";

const BlogPostPage = () => {
  const post = {
    title: "Vintage Watch Collecting: A Beginner's Guide",
    date: "August 3, 2024",
    author: "Alex Thompson",
    category: "Horology",
    readTime: "15 min read",
    content: [
      {
        type: "paragraph",
        text: "Vintage watch collecting is a fascinating hobby that combines history, craftsmanship, and style. For beginners, the world of vintage timepieces can seem overwhelming, but with the right knowledge and approach, it can be an incredibly rewarding pursuit. This guide will walk you through the basics of vintage watch collecting, helping you start your journey into this captivating realm.",
      },
      {
        type: "subheading",
        text: "Why Collect Vintage Watches?",
      },
      {
        type: "paragraph",
        text: "Vintage watches offer a unique appeal that modern timepieces often can't match. They carry stories from the past, showcase historical craftsmanship, and often appreciate in value over time. Collecting vintage watches allows you to own a piece of horological history and express your personal style through timeless designs.",
      },
      {
        type: "image",
        src: VintageWatch1,
        alt: "Assortment of vintage watches",
        caption:
          "A diverse collection of vintage watches showcasing various styles and eras",
      },
      {
        type: "subheading",
        text: "Understanding Vintage Watch Eras",
      },
      {
        type: "paragraph",
        text: "Vintage watches are typically categorized by era: Pre-World War II (1900-1939), Post-War (1940s-1950s), Mid-Century (1960s-1970s), and Late 20th Century (1980s-1990s). Each era has its distinct styles, movements, and iconic models. Familiarizing yourself with these periods will help you focus your collection and appreciate the historical context of your pieces.",
      },
      {
        type: "subheading",
        text: "Key Factors to Consider",
      },
      {
        type: "paragraph",
        text: "When starting your vintage watch collection, keep these factors in mind:",
      },
      {
        type: "list",
        items: [
          "Condition: Look for watches in good condition with original parts. Some wear is expected, but excessive damage can affect value and functionality.",
          "Originality: Original dials, hands, and movements are highly prized in vintage watches. Be wary of 'Franken-watches' with mismatched parts.",
          "Rarity: Limited production runs or discontinued models often command higher prices and interest among collectors.",
          "Brand reputation: Well-known brands like Rolex, Omega, and Patek Philippe are popular, but don't overlook lesser-known brands with interesting histories.",
          "Movement type: Understand the differences between mechanical, automatic, and quartz movements, and their significance in different eras.",
        ],
      },
      {
        type: "image",
        src: VintageWatch2,
        alt: "Vintage watch movement",
        caption:
          "A close-up of a vintage mechanical watch movement, showcasing the intricate craftsmanship",
      },
      {
        type: "subheading",
        text: "Where to Find Vintage Watches",
      },
      {
        type: "paragraph",
        text: "There are several avenues for acquiring vintage watches:",
      },
      {
        type: "list",
        items: [
          "Specialized watch dealers: Often the safest option, with authenticated pieces and sometimes warranties.",
          "Auction houses: Can offer rare finds but require careful research and potentially higher budgets.",
          "Online marketplaces: Platforms like Chrono24 or eBay offer a wide selection but require diligent verification.",
          "Estate sales and flea markets: Can yield unexpected treasures but carry higher risks of inauthentic pieces.",
        ],
      },
      {
        type: "subheading",
        text: "Authentication and Research",
      },
      {
        type: "paragraph",
        text: "Authentication is crucial in vintage watch collecting. Learn to spot red flags like inconsistent serial numbers, wrong font types, or incorrect movement designs. Invest time in research: consult reference books, join online forums, and consider having potential purchases authenticated by experts.",
      },
      {
        type: "image",
        src: VintageWatch3,
        alt: "Authenticating a vintage watch",
        caption:
          "An expert examining a vintage watch to verify its authenticity",
      },
      {
        type: "subheading",
        text: "Caring for Your Vintage Watches",
      },
      {
        type: "paragraph",
        text: "Proper care is essential to maintain the value and functionality of your vintage watches:",
      },
      {
        type: "list",
        items: [
          "Regular servicing: Have your watches serviced by a qualified watchmaker every 3-5 years.",
          "Proper storage: Store watches in a cool, dry place, away from direct sunlight and magnetic fields.",
          "Gentle cleaning: Use a soft cloth for regular cleaning, avoiding water unless the watch is known to be water-resistant.",
          "Wear with care: Be mindful of potential damage from impacts or exposure to chemicals.",
        ],
      },
      {
        type: "subheading",
        text: "Building Your Collection",
      },
      {
        type: "paragraph",
        text: "Start your collection by focusing on a specific era, brand, or style that resonates with you. As you gain knowledge and experience, you can expand your collection's scope. Remember, collecting should be enjoyable, so choose pieces that you truly appreciate and would love to wear.",
      },
      {
        type: "subheading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "Vintage watch collecting is a journey of discovery, offering endless opportunities to learn about history, mechanics, and design. By starting with these basics and continuing to educate yourself, you'll be well on your way to building a meaningful and valuable collection. Remember, the most important aspect of collecting is the joy it brings you. Happy collecting!",
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{post.title}</h1>
          <div className="flex justify-center items-center text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>{post.date}</span>
            <User className="w-4 h-4 ml-4 mr-2" />
            <span>{post.author}</span>
            <Tag className="w-4 h-4 ml-4 mr-2" />
            <span>{post.category}</span>
          </div>
        </div>
      </header>

      {/* Blog Post Content */}
      <article className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              {post.content.map((item, index) => {
                switch (item.type) {
                  case "paragraph":
                    return (
                      <p key={index} className="text-gray-700 mb-6">
                        {item.text}
                      </p>
                    );
                  case "subheading":
                    return (
                      <h2 key={index} className="text-2xl font-bold mb-4">
                        {item.text}
                      </h2>
                    );
                  case "image":
                    return (
                      <figure key={index} className="mb-6">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={800}
                          height={600}
                          className="w-full h-auto rounded-lg"
                        />
                        <figcaption className="text-sm text-gray-500 mt-2">
                          {item.caption}
                        </figcaption>
                      </figure>
                    );
                  case "list":
                    return (
                      <ul key={index} className="list-disc pl-6 mb-6">
                        {item.items.map((listItem, itemIndex) => (
                          <li key={itemIndex} className="text-gray-700 mb-2">
                            {listItem}
                          </li>
                        ))}
                      </ul>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        </div>
      </article>

      {/* Author Bio */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center">
            <Image
              src={ProfileBlog}
              alt={post.author}
              width={100}
              height={100}
              className="rounded-xl mr-4"
            />
            <div>
              <h3 className="text-xl font-bold">{post.author}</h3>
              <p className="text-gray-600">
                Vintage Watch Collector and Horologist
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <h3 className="text-xl font-bold mb-4">Share this article</h3>
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300">
              <Facebook className="w-6 h-6" />
            </button>
            <button className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition duration-300">
              <Twitter className="w-6 h-6" />
            </button>
            <button className="bg-blue-800 text-white p-2 rounded-full hover:bg-blue-900 transition duration-300">
              <Linkedin className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <NewsletterComponent />
    </div>
  );
};

export default BlogPostPage;
