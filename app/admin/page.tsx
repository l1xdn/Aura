"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth, useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// Component to display course with its lectures
function CourseWithLectures({ course }: { course: any }) {
  const lectures = useQuery(api.courses.getLecturesByCourse, { courseId: course._id });
  
  return (
    <div>
      <h3 className="font-bold text-blue-400">{course.nameArabic}</h3>
      {lectures?.map((lecture) => (
        <div key={lecture._id} className="bg-gray-800 p-2 ml-4 rounded mb-1">
          <p>{lecture.titleArabic}</p>
          <p className="text-sm text-gray-500">Video ID: {lecture.videoId}</p>
        </div>
      ))}
    </div>
  );
}

export default function AdminPage() {
  // All hooks must be called at the top level
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<"courses" | "lectures" | "materials">("courses");
  const courses = useQuery(api.courses.getAllCourses);
  const materials = useQuery(api.courses.getAllMaterials);
  
  const createCourse = useMutation(api.courses.createCourse);
  const createLecture = useMutation(api.courses.createLecture);
  const createMaterial = useMutation(api.courses.createMaterial);
  const seedDatabase = useMutation(api.seedData.seedDatabase);

  const [courseForm, setCourseForm] = useState({
    name: "",
    nameArabic: "",
    description: "",
    thumbnail: "",
    order: 1
  });

  const [lectureForm, setLectureForm] = useState({
    courseId: "",
    title: "",
    titleArabic: "",
    videoId: "",
    thumbnail: "",
    description: "",
    order: 1
  });

  const [materialForm, setMaterialForm] = useState({
    courseId: "",
    name: "",
    nameArabic: "",
    type: "pdf" as const,
    url: "",
    description: "",
    order: 1
  });

  // Show loading while auth is loading
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-200">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Admin Access Required</h1>
          <p className="text-gray-400 mb-6">Please sign in to access the admin panel.</p>
          <SignInButton mode="modal">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCourse(courseForm);
      setCourseForm({ name: "", nameArabic: "", description: "", thumbnail: "", order: 1 });
      alert("Course created successfully!");
    } catch (error) {
      alert("Error creating course: " + error);
    }
  };

  const handleCreateLecture = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLecture({
        ...lectureForm,
        courseId: lectureForm.courseId as any
      });
      setLectureForm({ courseId: "", title: "", titleArabic: "", videoId: "", thumbnail: "", description: "", order: 1 });
      alert("Lecture created successfully!");
    } catch (error) {
      alert("Error creating lecture: " + error);
    }
  };

  const handleCreateMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMaterial({
        ...materialForm,
        courseId: materialForm.courseId || undefined as any
      });
      setMaterialForm({ courseId: "", name: "", nameArabic: "", type: "pdf", url: "", description: "", order: 1 });
      alert("Material created successfully!");
    } catch (error) {
      alert("Error creating material: " + error);
    }
  };

  const handleSeedDatabase = async () => {
    try {
      await seedDatabase();
      alert("Database seeded successfully!");
    } catch (error) {
      alert("Error seeding database: " + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-gray-400 mt-1">Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}</p>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
        
        {/* Seed Database Button */}
        <div className="mb-8">
          <button
            onClick={handleSeedDatabase}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Seed Database with Initial Data
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2 rounded ${activeTab === "courses" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            Courses
          </button>
          <button
            onClick={() => setActiveTab("lectures")}
            className={`px-4 py-2 rounded ${activeTab === "lectures" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            Lectures
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`px-4 py-2 rounded ${activeTab === "materials" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            Materials
          </button>
        </div>

        {/* Course Management */}
        {activeTab === "courses" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
              <form onSubmit={handleCreateCourse} className="space-y-4">
                <input
                  type="text"
                  placeholder="Course Name (English)"
                  value={courseForm.name}
                  onChange={(e) => setCourseForm({...courseForm, name: e.target.value})}
                  className="w-full p-2 bg-gray-800 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Course Name (Arabic)"
                  value={courseForm.nameArabic}
                  onChange={(e) => setCourseForm({...courseForm, nameArabic: e.target.value})}
                  className="w-full p-2 bg-gray-800 rounded"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                  className="w-full p-2 bg-gray-800 rounded"
                />
                <input
                  type="url"
                  placeholder="Thumbnail URL"
                  value={courseForm.thumbnail}
                  onChange={(e) => setCourseForm({...courseForm, thumbnail: e.target.value})}
                  className="w-full p-2 bg-gray-800 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Order"
                  value={courseForm.order}
                  onChange={(e) => setCourseForm({...courseForm, order: parseInt(e.target.value)})}
                  className="w-full p-2 bg-gray-800 rounded"
                  required
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded">
                  Create Course
                </button>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Existing Courses</h2>
              <div className="space-y-2">
                {courses?.map((course) => (
                  <div key={course._id} className="bg-gray-800 p-4 rounded">
                    <h3 className="font-bold">{course.nameArabic}</h3>
                    <p className="text-gray-400">{course.name}</p>
                    <p className="text-sm text-gray-500">Order: {course.order}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Lecture Management */}
        {activeTab === "lectures" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Create New Lecture</h2>
              <form onSubmit={handleCreateLecture} className="space-y-4">
                <select
                  value={lectureForm.courseId}
                  onChange={(e) => setLectureForm({...lectureForm, courseId: e.target.value})}
                  className="w-full p-2 bg-gray-800 rounded"
                  required
                >
                  <option value="">Select Course</option>
                  {courses?.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.nameArabic}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Lecture Title (English)"
                  value={lectureForm.title}
                  onChange={(e) => setLectureForm({...lectureForm, title: e.target.value})}
                  className="w-full p-2 bg-gray-800 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Lecture Title (Arabic)"
                  value={lectureForm.titleArabic}
                  onChange={(e) => setLectureForm({...lectureForm, titleArabic: e.target.value})}
                  className="w-full p-2 bg-gray-800 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="YouTube Video ID"
                  value={lectureForm.videoId}
                  onChange={(e) => setLectureForm({...lectureForm, videoId: e.target.value})}
                  className="w-full p-2 bg-gray-800 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Order"
                  value={lectureForm.order}
                  onChange={(e) => setLectureForm({...lectureForm, order: parseInt(e.target.value)})}
                  className="w-full p-2 bg-gray-800 rounded"
                  required
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded">
                  Create Lecture
                </button>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Existing Lectures</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {courses?.map((course) => (
                  <CourseWithLectures key={course._id} course={course} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Material Management */}
        {activeTab === "materials" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Create New Material</h2>
              <form onSubmit={handleCreateMaterial} className="space-y-4">
                <select
                  value={materialForm.courseId}
                  onChange={(e) => setMaterialForm({...materialForm, courseId: e.target.value})}
                  className="w-full p-2 bg-gray-800 rounded"
                >
                  <option value="">Select Course (Optional)</option>
                  {courses?.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.nameArabic}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Material Name (English)"
                  value={materialForm.name}
                  onChange={(e) => setMaterialForm({...materialForm, name: e.target.value})}
                  className="w-full p-2 bg-gray-800 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Material Name (Arabic)"
                  value={materialForm.nameArabic}
                  onChange={(e) => setMaterialForm({...materialForm, nameArabic: e.target.value})}
                  className="w-full p-2 bg-gray-800 rounded"
                  required
                />
                <select
                  value={materialForm.type}
                  onChange={(e) => setMaterialForm({...materialForm, type: e.target.value as any})}
                  className="w-full p-2 bg-gray-800 rounded"
                >
                  <option value="pdf">PDF</option>
                  <option value="document">Document</option>
                  <option value="image">Image</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="url"
                  placeholder="File URL"
                  value={materialForm.url}
                  onChange={(e) => setMaterialForm({...materialForm, url: e.target.value})}
                  className="w-full p-2 bg-gray-800 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Order"
                  value={materialForm.order}
                  onChange={(e) => setMaterialForm({...materialForm, order: parseInt(e.target.value)})}
                  className="w-full p-2 bg-gray-800 rounded"
                  required
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded">
                  Create Material
                </button>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Existing Materials</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {materials?.map((material) => (
                  <div key={material._id} className="bg-gray-800 p-4 rounded">
                    <h3 className="font-bold">{material.nameArabic}</h3>
                    <p className="text-gray-400">{material.name}</p>
                    <p className="text-sm text-gray-500">Type: {material.type}</p>
                    <a href={material.url} className="text-blue-400 hover:underline text-sm">
                      {material.url}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}