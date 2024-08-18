import React from "react";
import Image from "next/image";
import { Clock, User, Tag, ChevronRight } from "lucide-react";
import Blog1 from "@/public/blog1.jpg";
import Blog2 from "@/public/blog2.jpg";
import Blog3 from "@/public/blog3.jpg";
import Blog4 from "@/public/blog4.jpg";
import Link from "next/link";
import NewsletterComponent from "@/components/HomepageComponents/NewsletterComponent";

const BlogPage = () => {
  const featuredPost = {
    title: "The Art of Horology: Understanding Watch Movements",
    excerpt:
      "The heart of every watch lies in its movement - a miniature marvel of engineering that transforms the steady oscillations of a balance wheel or the vibrations of a quartz crystal into the precise measurement of time. These intricate mechanisms, whether mechanical or electronic, represent centuries of horological innovation and craftsmanship. From the delicate balance spring to the intricate gear trains of a mechanical movement, or the precise frequency of a quartz oscillator, each component plays a crucial role in the accuracy and functionality of your timepiece.",
    date: "June 15, 2024",
    author: "Jane Doe",
    category: "Watch Education",
    image: Blog1,
    link: "blog/post1",
  };

  const blogPosts = [
    {
      title: "Top 10 Best and Most Expensive Luxury Watches of 2024",
      excerpt:
        "Explore the most exquisite timepieces that have taken the horological world by storm this year.",
      date: "July 1, 2024",
      author: "John Smith",
      category: "Luxury Watches",
      image: Blog2,
      link: "blog/post2",
    },
    {
      title: "The Rise of Smartwatches: Fashion Meets Technology",
      excerpt:
        "How traditional watchmakers are adapting to the digital age without compromising on style.",
      date: "June 28, 2024",
      author: "Emily Chen",
      category: "Tech & Innovation",
      image: Blog3,
      link: "blog/post3",
    },
    {
      title: "Vintage Watch Collecting: A Beginner's Guide",
      excerpt:
        "Everything you need to know to start your journey into the world of vintage timepieces.",
      date: "June 22, 2024",
      author: "Michael Brown",
      category: "Vintage Watches",
      image: Blog4,
      link: "blog/post4",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            EcommWatch Blog
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Insights, Stories, and Horological Wonders
          </p>
        </div>
      </header>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Article
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  width={800}
                  height={600}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-4">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{featuredPost.date}</span>
                  <User className="w-4 h-4 ml-4 mr-2" />
                  <span>{featuredPost.author}</span>
                  <Tag className="w-4 h-4 ml-4 mr-2" />
                  <span>{featuredPost.category}</span>
                </div>
                <Link
                  href={featuredPost.link}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Recent Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{post.date}</span>
                    <User className="w-4 h-4 ml-4 mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600 font-semibold">
                      {post.category}
                    </span>
                    <Link
                      href={post.link}
                      className="text-blue-600 hover:text-blue-800 transition duration-300 flex items-center"
                    >
                      Read More <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterComponent />
    </div>
  );
};

export default BlogPage;
