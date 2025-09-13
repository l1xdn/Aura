import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Courses table - represents different subjects/courses
  courses: defineTable({
    name: v.string(),
    nameArabic: v.string(),
    description: v.optional(v.string()),
    thumbnail: v.string(), // URL to course thumbnail image
    order: v.number(), // For ordering courses on the page
    isActive: v.boolean(),
    createdAt: v.number(),
  }),

  // Lectures table - represents individual video lectures
  lectures: defineTable({
    courseId: v.id("courses"),
    title: v.string(),
    titleArabic: v.string(),
    videoId: v.string(), // YouTube video ID
    thumbnail: v.optional(v.string()), // Custom thumbnail, falls back to course thumbnail
    description: v.optional(v.string()),
    order: v.number(), // Order within the course
    duration: v.optional(v.number()), // Duration in seconds
    isActive: v.boolean(),
    createdAt: v.number(),
  }).index("by_course", ["courseId"]),

  // Materials table - represents PDF and other downloadable materials
  materials: defineTable({
    courseId: v.optional(v.id("courses")), // Optional - some materials might be general
    lectureId: v.optional(v.id("lectures")), // Optional - some materials might be course-wide
    name: v.string(),
    nameArabic: v.string(),
    type: v.union(v.literal("pdf"), v.literal("document"), v.literal("image"), v.literal("other")),
    url: v.string(), // URL to the file
    fileSize: v.optional(v.number()), // File size in bytes
    description: v.optional(v.string()),
    order: v.number(),
    isActive: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_course", ["courseId"])
    .index("by_lecture", ["lectureId"]),
});