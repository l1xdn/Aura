import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to get all active courses
export const getAllCourses = query({
  args: {},
  handler: async (ctx) => {
    const courses = await ctx.db
      .query("courses")
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("asc")
      .collect();
    
    return courses.sort((a, b) => a.order - b.order);
  },
});

// Query to get a specific course by ID
export const getCourseById = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.courseId);
  },
});

// Query to get lectures for a specific course
export const getLecturesByCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const lectures = await ctx.db
      .query("lectures")
      .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    
    return lectures.sort((a, b) => a.order - b.order);
  },
});

// Query to get materials for a specific course
export const getMaterialsByCourse = query({
  args: { courseId: v.id("courses") },
  handler: async (ctx, args) => {
    const materials = await ctx.db
      .query("materials")
      .withIndex("by_course", (q) => q.eq("courseId", args.courseId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    
    return materials.sort((a, b) => a.order - b.order);
  },
});

// Query to get all materials (for PDF page)
export const getAllMaterials = query({
  args: {},
  handler: async (ctx) => {
    const materials = await ctx.db
      .query("materials")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
    
    return materials.sort((a, b) => a.order - b.order);
  },
});

// Mutation to create a new course
export const createCourse = mutation({
  args: {
    name: v.string(),
    nameArabic: v.string(),
    description: v.optional(v.string()),
    thumbnail: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const courseId = await ctx.db.insert("courses", {
      ...args,
      isActive: true,
      createdAt: Date.now(),
    });
    return courseId;
  },
});

// Mutation to create a new lecture
export const createLecture = mutation({
  args: {
    courseId: v.id("courses"),
    title: v.string(),
    titleArabic: v.string(),
    videoId: v.string(),
    thumbnail: v.optional(v.string()),
    description: v.optional(v.string()),
    order: v.number(),
    duration: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const lectureId = await ctx.db.insert("lectures", {
      ...args,
      isActive: true,
      createdAt: Date.now(),
    });
    return lectureId;
  },
});

// Mutation to create a new material
export const createMaterial = mutation({
  args: {
    courseId: v.optional(v.id("courses")),
    lectureId: v.optional(v.id("lectures")),
    name: v.string(),
    nameArabic: v.string(),
    type: v.union(v.literal("pdf"), v.literal("document"), v.literal("image"), v.literal("other")),
    url: v.string(),
    fileSize: v.optional(v.number()),
    description: v.optional(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const materialId = await ctx.db.insert("materials", {
      ...args,
      isActive: true,
      createdAt: Date.now(),
    });
    return materialId;
  },
});