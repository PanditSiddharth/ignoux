import { BlogCard } from "@/components/Cards";
import React from "react";

const blogs = [
  {
    id: 1,
    title: "Understanding Programming Basics for BCA",
    description:
      "A comprehensive guide to help BCA students master the basics of programming, covering important concepts with examples.",
    date: "December 25, 2024",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D",
    link: "/blogs/programming-basics",
  },
  {
    id: 2,
    title: "Top Data Structures Every BCA Student Must Learn",
    description:
      "Explore the essential data structures like arrays, stacks, and queues, with practical use cases and examples.",
    date: "December 20, 2024",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D",
    link: "/blogs/data-structures",
  },
  {
    id: 3,
    title: "How to Ace IGNOU Exams with Smart Study Techniques",
    description:
      "Tips and tricks for IGNOU students to prepare efficiently for their exams while balancing other responsibilities.",
    date: "December 15, 2024",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kZXxlbnwwfHwwfHx8MA%3D%3D",
    link: "/blogs/ignou-exam-tips",
  },
];

export default function Blogs() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold">Our Blogs</h1>
          <p className="mt-4 text-lg">
            Discover insights, tips, and guides on coding, BCA, and more to help you excel in your learning journey.
          </p>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <BlogCard title={blog.title} slug={blog.link}
              description={blog.description}
              image={blog.image}
              date={blog.date}
              key={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} ignoux.in. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
