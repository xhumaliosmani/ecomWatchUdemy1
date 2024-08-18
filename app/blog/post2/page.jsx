import React from "react";
import Image from "next/image";
import { Clock, User, Tag, Facebook, Twitter, Linkedin } from "lucide-react";
import ProfileBlog from "@/public/profileblog.png";
import Watch1 from "@/public/watch1.jpg";
import Watch2 from "@/public/watch2.jpg";
import Watch3 from "@/public/watch3.jpg";
import NewsletterComponent from "@/components/HomepageComponents/NewsletterComponent";

const BlogPostPage = () => {
  const post = {
    title: "Top 10 Best and Most Expensive Luxury Watches of 2024",
    date: "August 3, 2024",
    author: "John Smith",
    category: "Luxury Timepieces",
    readTime: "12 min read",
    content: [
      {
        type: "paragraph",
        text: "The world of luxury watches continues to evolve, pushing the boundaries of craftsmanship, innovation, and opulence. In 2024, we've seen some truly remarkable timepieces that combine exquisite design, cutting-edge technology, and astronomical price tags. Let's explore the top 10 best and most expensive luxury watches that have captured the hearts of collectors and enthusiasts this year.",
      },
      {
        type: "subheading",
        text: "1. Patek Philippe Grandmaster Chime Ref. 6300A-010",
      },
      {
        type: "paragraph",
        text: "Topping our list is the Patek Philippe Grandmaster Chime, a true masterpiece of horology. With 20 complications, including five chiming modes, a perpetual calendar, and a second time zone, this watch is a testament to Patek Philippe's unparalleled expertise. Valued at an astounding $31 million, it's not just a timepiece, but a work of art.",
      },
      {
        type: "image",
        src: Watch1,
        alt: "Patek Philippe Grandmaster Chime Ref. 6300A-010",
        caption:
          "The Patek Philippe Grandmaster Chime, the pinnacle of watchmaking in 2024",
      },
      {
        type: "subheading",
        text: "2. Richard Mille RM 56-02 Sapphire Tourbillon",
      },
      {
        type: "paragraph",
        text: "Richard Mille continues to push the envelope with the RM 56-02 Sapphire Tourbillon. Crafted almost entirely from sapphire crystal, this watch offers unparalleled transparency and durability. Its complex tourbillon movement seems to float within the case, a true feat of engineering priced at $2.7 million.",
      },
      {
        type: "subheading",
        text: "3. Audemars Piguet Royal Oak Concept Black Panther Flying Tourbillon",
      },
      {
        type: "paragraph",
        text: "Combining haute horlogerie with pop culture, Audemars Piguet's Black Panther watch features a hand-painted white gold Black Panther figure on the dial. The flying tourbillon and the intricate details make this limited edition piece a collector's dream, valued at $5.2 million.",
      },
      {
        type: "image",
        src: Watch2,
        alt: "Audemars Piguet Royal Oak Concept Black Panther Flying Tourbillon",
        caption:
          "The innovative Audemars Piguet Royal Oak Concept Black Panther Flying Tourbillon",
      },
      {
        type: "subheading",
        text: "4. Rolex Daytona 'Platinum Ice'",
      },
      {
        type: "paragraph",
        text: "Rolex's 2024 iteration of the iconic Daytona comes in a full platinum case and bracelet, with a stunning meteorite dial. This 'Platinum Ice' edition combines Rolex's legendary reliability with breathtaking aesthetics, commanding a price of $825,000.",
      },
      {
        type: "subheading",
        text: "5. Jaeger-LeCoultre Reverso Hybris Mechanica Calibre 185",
      },
      {
        type: "paragraph",
        text: "Celebrating the 90th anniversary of the Reverso, Jaeger-LeCoultre created this quadriptyque timepiece featuring 11 complications, including a perpetual calendar and minute repeater. Limited to just 10 pieces, it's priced at $1.65 million.",
      },
      {
        type: "subheading",
        text: "6. Vacheron Constantin Les Cabinotiers Grande Complication Bacchus",
      },
      {
        type: "paragraph",
        text: "A unique piece showcasing Vacheron Constantin's mastery of both watchmaking and decorative arts, the Bacchus combines 16 complications with exquisite hand-engraving. This horological marvel is valued at $2.5 million.",
      },
      {
        type: "image",
        src: Watch3,
        alt: "Vacheron Constantin Les Cabinotiers Grande Complication Bacchus",
        caption:
          "The intricately decorated Vacheron Constantin Les Cabinotiers Grande Complication Bacchus",
      },
      {
        type: "subheading",
        text: "7. Cartier Rotonde de Cartier Astromystérieux Caliber 9462 MC",
      },
      {
        type: "paragraph",
        text: "Cartier's latest addition to its Mystery series features a floating tourbillon that seems to defy gravity. This platinum-cased wonder, limited to just 5 pieces, is priced at $1.2 million.",
      },
      {
        type: "subheading",
        text: "8. Chopard L.U.C Full Strike Sapphire",
      },
      {
        type: "paragraph",
        text: "Chopard's first full sapphire-cased watch houses an impressive minute repeater movement. The transparent case allows for an unobstructed view of the intricate mechanism, justifying its $1.8 million price tag.",
      },
      {
        type: "subheading",
        text: "9. Greubel Forsey GMT Quadruple Tourbillon",
      },
      {
        type: "paragraph",
        text: "Featuring not one, but four tourbillons, this Greubel Forsey masterpiece also includes a rotating globe for world time indication. Limited to just 11 pieces, it's valued at $820,000.",
      },
      {
        type: "subheading",
        text: "10. MB&F Legacy Machine Thunderdome",
      },
      {
        type: "paragraph",
        text: "Rounding out our list is MB&F's Legacy Machine Thunderdome, featuring the world's fastest triple-axis tourbillon. This avant-garde timepiece, limited to 33 pieces in platinum, is priced at $780,000.",
      },
      {
        type: "paragraph",
        text: "These exceptional timepieces represent the pinnacle of watchmaking in 2024, combining unprecedented technical innovation with stunning artistry. While their price tags may be out of reach for most, they serve as a testament to the enduring appeal of mechanical watches in an increasingly digital world.",
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
              <p className="text-gray-600">Luxury Watch Expert and Collector</p>
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
