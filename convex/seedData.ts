import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Mutation to seed the database with initial data
export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    const existingCourses = await ctx.db.query("courses").collect();
    if (existingCourses.length > 0) {
      return { message: "Database already seeded" };
    }

    // Create courses
    const electricalCourseId = await ctx.db.insert("courses", {
      name: "Electrical Engineering",
      nameArabic: "محاضرات الكهرباء",
      description: "Electrical engineering lectures and materials",
      thumbnail: "https://png.pngtree.com/png-vector/20220622/ourmid/pngtree-atom-and-nucleus-molecule-research-png-image_5170401.png",
      order: 1,
      isActive: true,
      createdAt: Date.now(),
    });

    const mathCourseId = await ctx.db.insert("courses", {
      name: "Mathematics",
      nameArabic: "محاضرات الرياضيات",
      description: "Mathematics lectures and materials",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Deus_mathematics.png/1200px-Deus_mathematics.png?20210211120521",
      order: 2,
      isActive: true,
      createdAt: Date.now(),
    });

    const autocadCourseId = await ctx.db.insert("courses", {
      name: "AutoCAD",
      nameArabic: "محاضرات AutoCad",
      description: "AutoCAD tutorials and lessons",
      thumbnail: "https://upload.wikimedia.org/wikipedia/en/f/f7/AutoCAD_2016_screenshot.png",
      order: 3,
      isActive: true,
      createdAt: Date.now(),
    });

    const circuitsCourseId = await ctx.db.insert("courses", {
      name: "Electrical Circuits",
      nameArabic: "محاضرة دوائر كهربائية",
      description: "Electrical circuits analysis",
      thumbnail: "https://png.pngtree.com/png-vector/20220622/ourmid/pngtree-atom-and-nucleus-molecule-research-png-image_5170401.png",
      order: 4,
      isActive: true,
      createdAt: Date.now(),
    });

    // Create lectures for Electrical Engineering
    const electricalLectures = [
      { title: "Lecture No. 1", titleArabic: "محاضرة رقم 1", videoId: "6u1RaAbRTR4", order: 1 },
      { title: "Lecture No. 2", titleArabic: "محاضرة رقم 2", videoId: "oRP_ZAkPz8c", order: 2 },
      { title: "Lecture No. 3", titleArabic: "محاضرة رقم 3", videoId: "1cWsyKypfqU", order: 3 },
      { title: "Lecture No. 4", titleArabic: "محاضرة رقم 4", videoId: "LXjnIQ_I2_w", order: 4 },
      { title: "Lecture No. 5", titleArabic: "محاضرة رقم 5", videoId: "JYC5eC4PPxM", order: 5 },
    ];

    for (const lecture of electricalLectures) {
      await ctx.db.insert("lectures", {
        courseId: electricalCourseId,
        ...lecture,
        isActive: true,
        createdAt: Date.now(),
      });
    }

    // Create lectures for Mathematics
    const mathLectures = [
      { title: "Lecture No. 1", titleArabic: "محاضرة رقم 1", videoId: "UgRYH3rjVug", order: 1 },
      { title: "Lecture No. 2", titleArabic: "محاضرة رقم 2", videoId: "nKIcfXdh8Qc", order: 2 },
      { title: "Lecture No. 3", titleArabic: "محاضرة رقم 3", videoId: "tIjZEtTdHnU", order: 3 },
      { title: "Lecture No. 4", titleArabic: "محاضرة رقم 4", videoId: "VesnIJ59O_A", order: 4 },
    ];

    for (const lecture of mathLectures) {
      await ctx.db.insert("lectures", {
        courseId: mathCourseId,
        ...lecture,
        isActive: true,
        createdAt: Date.now(),
      });
    }

    // Create lectures for AutoCAD
    const autocadLectures = [
      { title: "Lecture No. 1", titleArabic: "محاضرة رقم 1", videoId: "gknHglBfQRU", order: 1 },
      { title: "Lecture No. 2", titleArabic: "محاضرة رقم 2", videoId: "XMWxjVSEQBE", order: 2 },
      { title: "Lecture No. 3", titleArabic: "محاضرة رقم 3", videoId: "fhKm-4RjQS0", order: 3 },
      { title: "Lecture No. 4", titleArabic: "محاضرة رقم 4", videoId: "Bwjj8ZED2Fs", order: 4 },
      { title: "Lecture No. 5", titleArabic: "محاضرة رقم 5", videoId: "yjgFNj1327s", order: 5 },
    ];

    for (const lecture of autocadLectures) {
      await ctx.db.insert("lectures", {
        courseId: autocadCourseId,
        ...lecture,
        isActive: true,
        createdAt: Date.now(),
      });
    }

    // Create lecture for Electrical Circuits
    await ctx.db.insert("lectures", {
      courseId: circuitsCourseId,
      title: "Lecture No. 1",
      titleArabic: "محاضرة رقم 1",
      videoId: "QDSTUwnRsgI",
      order: 1,
      isActive: true,
      createdAt: Date.now(),
    });

    // Create materials (PDFs)
    const materials = [
      { name: "Physics 1", nameArabic: "كهرباء 1", url: "/ph-1.pdf", type: "pdf" as const, order: 1 },
      { name: "Physics 2", nameArabic: "كهرباء 2", url: "/ph-2.pdf", type: "pdf" as const, order: 2 },
      { name: "Mathematics 1", nameArabic: "رياضيات 1", url: "/math-1.pdf", type: "pdf" as const, order: 3 },
      { name: "Mathematics 2", nameArabic: "رياضيات 2", url: "/math-2.pdf", type: "pdf" as const, order: 4 },
      { name: "Digital Systems 1", nameArabic: "انظمة رقمية 1", url: "/ds-1.pdf", type: "pdf" as const, order: 5 },
      { name: "Digital Systems 2", nameArabic: "انظمة رقمية 2", url: "/ds-2.pdf", type: "pdf" as const, order: 6 },
      { name: "Digital Systems", nameArabic: "انظمة رقمية", url: "/ns.pdf", type: "pdf" as const, order: 7 },
      { name: "Math Assignments", nameArabic: "مهمات الرياضيات", url: "/math-test.pdf", type: "pdf" as const, order: 8 },
      { name: "Schedule", nameArabic: "الجدول", url: "/cr.pdf", type: "pdf" as const, order: 9 },
    ];

    for (const material of materials) {
      await ctx.db.insert("materials", {
        ...material,
        isActive: true,
        createdAt: Date.now(),
      });
    }

    return { message: "Database seeded successfully" };
  },
});