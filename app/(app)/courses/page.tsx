import React from "react";

const courses = [
  {
    id: 1,
    title: "BCA Programming Basics",
    description: "Learn the fundamentals of programming with a focus on BCA syllabus topics.",
    price: "FREE",
    image: "https://static.vecteezy.com/system/resources/thumbnails/004/272/479/small/programming-code-coding-or-hacker-background-programming-code-icon-made-with-binary-code-digital-binary-data-and-streaming-digital-code-matrix-background-with-digits-1-0-illustration-vector.jpg",
    link: "/courses/bca-programming-basics",
  },
  {
    id: 2,
    title: "Advanced Java for BCA",
    description: "Deep dive into Java programming, including object-oriented principles and project examples.",
    price: "FREE",
    image: "https://static.vecteezy.com/system/resources/thumbnails/004/272/479/small/programming-code-coding-or-hacker-background-programming-code-icon-made-with-binary-code-digital-binary-data-and-streaming-digital-code-matrix-background-with-digits-1-0-illustration-vector.jpg",
    link: "/courses/advanced-java",
  },
  {
    id: 3,
    title: "Data Structures for Beginners",
    description: "Master data structures like arrays, linked lists, stacks, and queues with practical examples.",
    price: "₹10",
    image: "https://static.vecteezy.com/system/resources/thumbnails/004/272/479/small/programming-code-coding-or-hacker-background-programming-code-icon-made-with-binary-code-digital-binary-data-and-streaming-digital-code-matrix-background-with-digits-1-0-illustration-vector.jpg",
    link: "/courses/data-structures",
  },
];

export default function Courses() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold">Our Courses</h1>
          <p className="mt-4 text-lg">
            Explore our curated courses designed to help BCA students and coding enthusiasts excel.
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>
                  <p className="text-gray-600 mt-2">{course.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-blue-600">{course.price}</span>
                    <a
                      href={course.link}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      View Course
                    </a>
                  </div>
                </div>
              </div>
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
