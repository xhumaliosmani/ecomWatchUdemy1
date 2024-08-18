import React from "react";
import Image from "next/image";
import { Clock, User, Tag, Facebook, Twitter, Linkedin } from "lucide-react";
import ProfileBlog from "@/public/profileblog.png";
import Smartwatch1 from "@/public/smartwatch1.jpg";
import Smartwatch2 from "@/public/smartwatch2.jpg";
import Smartwatch3 from "@/public/smartwatch3.jpg";
import NewsletterComponent from "@/components/HomepageComponents/NewsletterComponent";

const BlogPostPage = () => {
  const post = {
    title: "The Rise of Smartwatches: Fashion Meets Technology",
    date: "August 3, 2024",
    author: "Emily Chen",
    category: "Tech Fashion",
    readTime: "10 min read",
    content: [
      {
        type: "paragraph",
        text: "In recent years, the line between technology and fashion has become increasingly blurred, and nowhere is this more evident than in the world of smartwatches. These wrist-worn devices have evolved from clunky gadgets to stylish accessories that complement our wardrobes while keeping us connected. Let's explore how smartwatches have risen to become the perfect fusion of fashion and technology.",
      },
      {
        type: "subheading",
        text: "The Evolution of Smartwatches",
      },
      {
        type: "paragraph",
        text: "The journey of smartwatches began with function-first devices that prioritized features over form. Early models were often bulky and unattractive, appealing mainly to tech enthusiasts. However, as technology advanced and consumer demand grew, manufacturers started to pay more attention to design aesthetics.",
      },
      {
        type: "image",
        src: Smartwatch1,
        alt: "Evolution of smartwatches",
        caption:
          "The evolution of smartwatches from early models to sleek, fashionable devices",
      },
      {
        type: "subheading",
        text: "Fashion Brands Enter the Tech Space",
      },
      {
        type: "paragraph",
        text: "A significant turning point came when traditional fashion and luxury watch brands began to enter the smartwatch market. Companies like Tag Heuer, Fossil, and Michael Kors started producing smartwatches that combined their signature styles with modern technology. This move helped legitimize smartwatches as fashion accessories and opened up a new market of style-conscious consumers.",
      },
      {
        type: "subheading",
        text: "Customization and Personalization",
      },
      {
        type: "paragraph",
        text: "One of the key factors in the rise of smartwatches as fashion items has been the ability to customize and personalize them. Many smartwatches now offer interchangeable bands and a wide variety of digital watch faces, allowing users to match their watch to their outfit or mood. This level of personalization has made smartwatches appealing to a broader audience who view their watches as an extension of their personal style.",
      },
      {
        type: "image",
        src: Smartwatch2,
        alt: "Customizable smartwatch",
        caption:
          "Modern smartwatches offer a wide range of customization options to suit individual styles",
      },
      {
        type: "subheading",
        text: "Blending Form and Function",
      },
      {
        type: "paragraph",
        text: "Today's smartwatches are marvels of engineering, packing powerful technology into sleek, attractive designs. Features like health monitoring, contactless payments, and voice assistants coexist with premium materials, elegant displays, and fashion-forward designs. Brands are constantly pushing the boundaries of what's possible, creating devices that are as much about style as they are about functionality.",
      },
      {
        type: "subheading",
        text: "The Impact on Traditional Watchmaking",
      },
      {
        type: "paragraph",
        text: "The rise of smartwatches has had a significant impact on the traditional watch industry. While some feared that smartwatches would make traditional timepieces obsolete, many established watchmakers have instead embraced the technology, creating hybrid watches that combine classic analog designs with smart features.",
      },
      {
        type: "image",
        src: Smartwatch3,
        alt: "Hybrid smartwatch",
        caption:
          "Hybrid smartwatches blend traditional watch design with modern smart features",
      },
      {
        type: "subheading",
        text: "The Future of Smartwatches",
      },
      {
        type: "paragraph",
        text: "As we look to the future, the integration of fashion and technology in smartwatches is set to become even more seamless. Advances in flexible displays, sustainable materials, and AI technology promise to usher in a new era of wearable devices that are not only more capable but also more fashion-forward than ever before.",
      },
      {
        type: "subheading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "The rise of smartwatches represents a perfect marriage of fashion and technology. These devices have evolved from purely functional gadgets to stylish accessories that complement our personal style while keeping us connected and informed. As technology continues to advance and designers push the boundaries of what's possible, we can expect smartwatches to play an increasingly important role in both our digital lives and our fashion choices. The future of wrist wear is smart, and it's more fashionable than ever.",
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
              <p className="text-gray-600">Tech Fashion Analyst and Blogger</p>
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
