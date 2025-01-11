import Link from "next/link";
import { FaYoutube, FaLinkedin, FaTelegram, FaGithub } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold">Learn Programming & Development</h2>
          <p className="mt-4 text-lg">
            Join thousands of learners and start your coding journey with free tutorials and resources.
          </p>
          <Link href={'/courses'} ><button className="mt-6 px-6 py-2 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-100">
            Join Courses
            </button>
          </Link>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center">Popular Courses</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((course) => (
              <div key={course} className="bg-white shadow rounded overflow-hidden">
                <img
                  src={`https://static.vecteezy.com/system/resources/thumbnails/004/272/479/small/programming-code-coding-or-hacker-background-programming-code-icon-made-with-binary-code-digital-binary-data-and-streaming-digital-code-matrix-background-with-digits-1-0-illustration-vector.jpg`}
                  alt="Course Thumbnail"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Course Title {course}</h3>
                  <p className="mt-2 text-gray-600">Learn coding basics and advanced topics.</p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Courses Section */}
            <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-center">Popular blogs</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((course) => (
              <div key={course} className="bg-white shadow rounded overflow-hidden">
                <img
                  src={`https://static.vecteezy.com/system/resources/thumbnails/004/272/479/small/programming-code-coding-or-hacker-background-programming-code-icon-made-with-binary-code-digital-binary-data-and-streaming-digital-code-matrix-background-with-digits-1-0-illustration-vector.jpg`}
                  alt="Course Thumbnail"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold">Blog Title {course}</h3>
                  <p className="mt-2 text-gray-600">Learn coding basics and advanced topics.</p>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Read blog
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <h3 className="text-lg font-bold">Follow Us</h3>
          <div className="mt-4 flex justify-center space-x-6">
           <Link target="_blank" href={"https://youtube.com/ignouStudyCenter"}>
            <FaYoutube className="text-2xl hover:text-red-600 cursor-pointer" />
           </Link>
           <Link target="_blank" href={"https://telegram.me/ignou_Study_Channel"}>
            <FaTelegram className="text-2xl hover:text-blue-700 cursor-pointer" />
           </Link>
           <Link target="_blank" href={"https://github.com/panditsiddharth"}>
            <FaGithub className="text-2xl hover:text-black cursor-pointer" />
           </Link>
           <Link target="_blank" href={"https://linkedin.com/in/sidsharma0"}>
            <FaLinkedin className="text-2xl hover:text-blue-600 cursor-pointer" />
           </Link>
          </div>
          <p className="mt-4 text-gray-400">© 2024 IGNOUX.in. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
