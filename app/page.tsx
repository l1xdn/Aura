
"use client";

import Link from 'next/link';
import Thumbnail from "./components/thumbnail";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

// Component to handle individual course sections
function CourseSection({ course }: { course: any }) {
  const lectures = useQuery(api.courses.getLecturesByCourse, { courseId: course._id });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-200 px-4 pt-4">
        {course.nameArabic}
      </h1>
      <div className="flex overflow-x-auto gap-4 p-4">
        {lectures === undefined ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
            <span className="text-gray-400">Loading lectures...</span>
          </div>
        ) : (
          lectures.map((lecture) => (
            <Thumbnail
              key={lecture._id}
              src={lecture.thumbnail || course.thumbnail}
              name={lecture.titleArabic}
              id={lecture.videoId}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const courses = useQuery(api.courses.getAllCourses);
  const seedDatabase = useMutation(api.seedData.seedDatabase);

  // Seed database on first load if no courses exist
  const handleSeedDatabase = async () => {
    try {
      await seedDatabase();
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  };

  if (courses === undefined) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-200">Loading courses...</p>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-200 mb-4">No courses found. Would you like to seed the database with initial data?</p>
          <button 
            onClick={handleSeedDatabase}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Seed Database
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {courses.map((course) => (
        <CourseSection key={course._id} course={course} />
      ))}
      
      <div className="p-5">
        <Link href="/pdf">
          <button className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto">
            Pdf's
          </button>
        </Link>
      </div>
    </>
  );
}

