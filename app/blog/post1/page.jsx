import React from "react";
import Image from "next/image";
import { Clock, User, Tag, Facebook, Twitter, Linkedin } from "lucide-react";
import ProfileBlog from "@/public/profileblog.png";
import Post1 from "@/public/post11.jpg";
import Post2 from "@/public/post12.jpg";
import Post3 from "@/public/post13.jpg";
import NewsletterComponent from "@/components/HomepageComponents/NewsletterComponent";

const BlogPostPage = () => {
  const post = {
    title: "The Art of Horology: Understanding Watch Movements",
    date: "June 15, 2024",
    author: "Jane Doe",
    category: "Watch Education",
    readTime: "8 min read",
    content: [
      {
        type: "paragraph",
        text: "The heart of every watch lies in its movement, the intricate mechanism that powers the timepiece and keeps it ticking. Understanding watch movements is crucial for any horological enthusiast or collector. In this article, we'll dive deep into the world of watch movements, exploring their types, components, and the artistry behind them.",
      },
      {
        type: "subheading",
        text: "Types of Watch Movements",
      },
      {
        type: "paragraph",
        text: "There are three main types of watch movements: mechanical, automatic, and quartz. Each has its own unique characteristics and appeal to different types of watch enthusiasts.",
      },
      {
        type: "image",
        src: Post1,
        alt: "Mechanical watch movement",
        caption: "A typical mechanical watch movement",
      },
      {
        type: "subheading",
        text: "Mechanical Movements",
      },
      {
        type: "paragraph",
        text: "Mechanical movements are the oldest type of watch movement. They are powered by a mainspring that stores energy when wound. This energy is then released slowly through a series of gears and springs, powering the watch's functions.",
      },
      {
        type: "subheading",
        text: "Automatic Movements",
      },
      {
        type: "paragraph",
        text: "Automatic movements are similar to mechanical movements, but they have an additional rotor that winds the mainspring using the natural motion of the wearer's wrist. This eliminates the need for manual winding in most cases.",
      },
      {
        type: "image",
        src: Post2,
        alt: "Automatic watch movement",
        caption: "An automatic watch movement with visible rotor",
      },
      {
        type: "subheading",
        text: "Quartz Movements",
      },
      {
        type: "paragraph",
        text: "Quartz movements use a battery to send an electrical current through a quartz crystal, causing it to vibrate. These vibrations are then converted into pulses that drive the motor, moving the watch hands. Quartz movements are known for their accuracy and low maintenance.",
      },
      {
        type: "subheading",
        text: "The Artistry of Watchmaking",
      },
      {
        type: "paragraph",
        text: "Beyond the technical aspects, watchmaking is an art form. Master watchmakers spend years perfecting their craft, creating movements that are not only functional but also beautiful. Many high-end watches feature decorated movements with intricate engravings, polished surfaces, and complex complications.",
      },
      {
        type: "image",
        src: Post3,
        alt: "Decorated watch movement",
        caption:
          "A beautifully decorated watch movement showcasing the artistry of horology",
      },
      {
        type: "paragraph",
        text: "Understanding watch movements adds a new dimension to the appreciation of timepieces. Whether you prefer the smooth sweep of a mechanical movement, the convenience of an automatic, or the precision of quartz, each type of movement has its own charm and represents a fascinating aspect of horological engineering and artistry.",
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
              <p className="text-gray-600">Horologist and Watch Enthusiast</p>
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
