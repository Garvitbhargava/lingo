import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([{ title: "Spanish", imageSrc: "/es.svg" }])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the man"?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the woman"?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the boy"?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the man"',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the zombie"?',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the robot"?',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the girl"?',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the zombie"',
                order: 8,
              },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el hombre",
                  imageSrc: "/man.svg",
                  audioSrc: "/es_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la mujer",
                  imageSrc: "/woman.svg",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el chico",
                  imageSrc: "/boy.svg",
                  audioSrc: "/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "la mujer",
                  imageSrc: "/woman.svg",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el chico",
                  imageSrc: "/boy.svg",
                  audioSrc: "/es_boy.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el hombre",
                  imageSrc: "/man.svg",
                  audioSrc: "/es_man.mp3",
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la mujer",
                  imageSrc: "/woman.svg",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el hombre",
                  imageSrc: "/man.svg",
                  audioSrc: "/es_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el chico",
                  imageSrc: "/boy.svg",
                  audioSrc: "/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la mujer",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el hombre",
                  audioSrc: "/es_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el chico",
                  audioSrc: "/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el hombre",
                  imageSrc: "/man.svg",
                  audioSrc: "/es_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la mujer",
                  imageSrc: "/woman.svg",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/es_zombie.mp3",
                },
              ]);
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el robot",
                  imageSrc: "/robot.svg",
                  audioSrc: "/es_robot.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/es_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el chico",
                  imageSrc: "/boy.svg",
                  audioSrc: "/es_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "la nina",
                  imageSrc: "/girl.svg",
                  audioSrc: "/es_girl.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/es_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el hombre",
                  imageSrc: "/man.svg",
                  audioSrc: "/es_man.mp3",
                },
              ]);
            }

            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la mujer",
                  audioSrc: "/es_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "el zombie",
                  audioSrc: "/es_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "el chico",
                  audioSrc: "/es_boy.mp3",
                },
              ]);
            }
          }
        }
      }
    }
    const EngCourses = await db
      .insert(schema.courses)
      .values([{ title: "English", imageSrc: "/india.png" }])
      .returning();

    for (const course of EngCourses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the man"?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the woman"?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the boy"?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the man"',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the zombie"?',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the robot"?',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the girl"?',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the zombie"',
                order: 8,
              },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the man",
                  imageSrc: "/man.svg",
                  audioSrc: "/en_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the woman",
                  imageSrc: "/woman.svg",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the boy",
                  imageSrc: "/boy.svg",
                  audioSrc: "/en_boy.mp3",
                },
              ]);
            }
            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the woman",
                  imageSrc: "/woman.svg",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the boy",
                  imageSrc: "/boy.svg",
                  audioSrc: "/en_boy.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the man",
                  imageSrc: "/man.svg",
                  audioSrc: "/en_man.mp3",
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the woman",
                  imageSrc: "/woman.svg",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the man",
                  imageSrc: "/man.svg",
                  audioSrc: "/en_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the boy",
                  imageSrc: "/boy.svg",
                  audioSrc: "/en_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the woman",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the man",
                  audioSrc: "/en_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the boy",
                  audioSrc: "/en_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the man",
                  imageSrc: "/man.svg",
                  audioSrc: "/en_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the woman",
                  imageSrc: "/woman.svg",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/en_zombie.mp3",
                },
              ]);
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the robot",
                  imageSrc: "/robot.svg",
                  audioSrc: "/en_robot.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/en_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the boy",
                  imageSrc: "/boy.svg",
                  audioSrc: "/en_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the girl",
                  imageSrc: "/girl.svg",
                  audioSrc: "/en_girl.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/en_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the man",
                  imageSrc: "/man.svg",
                  audioSrc: "/en_man.mp3",
                },
              ]);
            }

            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the woman",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the zombie",
                  audioSrc: "/en_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the boy",
                  audioSrc: "/en_boy.mp3",
                },
              ]);
            }
          }
        }
      }
    }
    const FrenchCourses = await db
      .insert(schema.courses)
      .values([{ title: "Français", imageSrc: "/fr.svg" }])
      .returning();

    for (const course of FrenchCourses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // Pour chaque unité, insérez les leçons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // Pour chaque leçon, insérez les défis
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the man"?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the woman"?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the boy"?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the man"',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the zombie"?',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the robot"?',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the girl"?',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the zombie"',
                order: 8,
              },
            ])
            .returning();

          // Pour chaque défi, insérez les options de défi
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "le homme",
                  imageSrc: "/man.svg",
                  audioSrc: "/en_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la femme",
                  imageSrc: "/woman.svg",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "le garçon",
                  imageSrc: "/boy.svg",
                  audioSrc: "/en_boy.mp3",
                },
              ]);
            }
            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "la femme",
                  imageSrc: "/woman.svg",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "le garçon",
                  imageSrc: "/boy.svg",
                  audioSrc: "/en_boy.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "le homme",
                  imageSrc: "/man.svg",
                  audioSrc: "/en_man.mp3",
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la femme",
                  imageSrc: "/woman.svg",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "le homme",
                  imageSrc: "/man.svg",
                  audioSrc: "/en_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "le garçon",
                  imageSrc: "/boy.svg",
                  audioSrc: "/en_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la femme",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "le homme",
                  audioSrc: "/en_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "le garçon",
                  audioSrc: "/en_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "le homme",
                  imageSrc: "/boy.svg",
                  audioSrc: "/en_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la femme",
                  imageSrc: "/woman.svg",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "le zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/en_zombie.mp3",
                },
              ]);
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "le robot",
                  imageSrc: "/robot.svg",
                  audioSrc: "/en_robot.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "le zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/en_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "le garçon",
                  imageSrc: "/boy.svg",
                  audioSrc: "/en_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "la fille",
                  imageSrc: "/girl.svg",
                  audioSrc: "/en_girl.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "le zombie",
                  imageSrc: "/zombie.svg",
                  audioSrc: "/en_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "le homme",
                  imageSrc: "/man.svg",
                  audioSrc: "/en_man.mp3",
                },
              ]);
            }

            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "la femme",
                  audioSrc: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "le zombie",
                  audioSrc: "/en_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "le garçon",
                  audioSrc: "/en_boy.mp3",
                },
              ]);
            }
          }
        }
      }
    }

    const ItalianCourses = await db
      .insert(schema.courses)
      .values([{ title: "Italian", imageSrc: "/it.svg" }])
      .returning();

    for (const course of ItalianCourses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
          {
            courseId: course.id,
            title: "Unit 2",
            description: `Learn intermediate ${course.title}`,
            order: 2,
          },
        ])
        .returning();

      // Pour chaque unité, insérez les leçons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // Pour chaque leçon, insérez les défis
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the man"?',
                order: 1,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the woman"?',
                order: 2,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the boy"?',
                order: 3,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the man"',
                order: 4,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the zombie"?',
                order: 5,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the robot"?',
                order: 6,
              },
              {
                lessonId: lesson.id,
                type: "SELECT",
                question: 'Which one of these is "the girl"?',
                order: 7,
              },
              {
                lessonId: lesson.id,
                type: "ASSIST",
                question: '"the zombie"',
                order: 8,
              },
            ])
            .returning();

          // Pour chaque défi, insérez les options de défi
          const FrenchCourses = await db
            .insert(schema.courses)
            .values([{ title: "Français", imageSrc: "/france.png" }])
            .returning();

          for (const course of FrenchCourses) {
            const units = await db
              .insert(schema.units)
              .values([
                {
                  courseId: course.id,
                  title: "Unité 1",
                  description: `Apprenez les bases du ${course.title}`,
                  order: 1,
                },
                {
                  courseId: course.id,
                  title: "Unité 2",
                  description: `Apprenez le français intermédiaire`,
                  order: 2,
                },
              ])
              .returning();

            // Pour chaque unité, insérez les leçons
            for (const unit of units) {
              const lessons = await db
                .insert(schema.lessons)
                .values([
                  { unitId: unit.id, title: "Noms", order: 1 },
                  { unitId: unit.id, title: "Verbes", order: 2 },
                  { unitId: unit.id, title: "Adjectifs", order: 3 },
                  { unitId: unit.id, title: "Phrases", order: 4 },
                  { unitId: unit.id, title: "Sentences", order: 5 },
                ])
                .returning();

              // Pour chaque leçon, insérez les défis
              for (const lesson of lessons) {
                const challenges = await db
                  .insert(schema.challenges)
                  .values([
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Quel est "le homme"?',
                      order: 1,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Quel est "la femme"?',
                      order: 2,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Quel est "le garçon"?',
                      order: 3,
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: '"le homme"',
                      order: 4,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Quel est "le zombie"?',
                      order: 5,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Quel est "le robot"?',
                      order: 6,
                    },
                    {
                      lessonId: lesson.id,
                      type: "SELECT",
                      question: 'Quel est "la fille"?',
                      order: 7,
                    },
                    {
                      lessonId: lesson.id,
                      type: "ASSIST",
                      question: '"le zombie"',
                      order: 8,
                    },
                  ])
                  .returning();

                // Pour chaque défi, insérez les options de défi
                for (const challenge of challenges) {
                  if (challenge.order === 1) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "le homme",
                        imageSrc: "/homme.svg",
                        audioSrc: "/fr_homme.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la femme",
                        imageSrc: "/femme.svg",
                        audioSrc: "/fr_femme.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "le garçon",
                        imageSrc: "/garcon.svg",
                        audioSrc: "/fr_garcon.mp3",
                      },
                    ]);
                  }
                  if (challenge.order === 2) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la femme",
                        imageSrc: "/femme.svg",
                        audioSrc: "/fr_femme.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "le garçon",
                        imageSrc: "/garcon.svg",
                        audioSrc: "/fr_garcon.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "le homme",
                        imageSrc: "/homme.svg",
                        audioSrc: "/fr_homme.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 3) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la femme",
                        imageSrc: "/femme.svg",
                        audioSrc: "/fr_femme.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "le homme",
                        imageSrc: "/homme.svg",
                        audioSrc: "/fr_homme.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "le garçon",
                        imageSrc: "/garcon.svg",
                        audioSrc: "/fr_garcon.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 4) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la femme",
                        audioSrc: "/fr_femme.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "le homme",
                        audioSrc: "/fr_homme.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "le garçon",
                        audioSrc: "/fr_garcon.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 5) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "le homme",
                        imageSrc: "/homme.svg",
                        audioSrc: "/fr_homme.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la femme",
                        imageSrc: "/femme.svg",
                        audioSrc: "/fr_femme.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "le zombie",
                        imageSrc: "/zombie.svg",
                        audioSrc: "/fr_zombie.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 6) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "le robot",
                        imageSrc: "/robot.svg",
                        audioSrc: "/fr_robot.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "le zombie",
                        imageSrc: "/zombie.svg",
                        audioSrc: "/fr_zombie.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "le garçon",
                        imageSrc: "/garcon.svg",
                        audioSrc: "/fr_garcon.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 7) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "la fille",
                        imageSrc: "/fille.svg",
                        audioSrc: "/fr_fille.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "le zombie",
                        imageSrc: "/zombie.svg",
                        audioSrc: "/fr_zombie.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "le homme",
                        imageSrc: "/homme.svg",
                        audioSrc: "/fr_homme.mp3",
                      },
                    ]);
                  }

                  if (challenge.order === 8) {
                    await db.insert(schema.challengeOptions).values([
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "la femme",
                        audioSrc: "/fr_femme.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: true,
                        text: "le zombie",
                        audioSrc: "/fr_zombie.mp3",
                      },
                      {
                        challengeId: challenge.id,
                        correct: false,
                        text: "le garçon",
                        audioSrc: "/fr_garcon.mp3",
                      },
                    ]);
                  }
                }
              }
            }
          }
        }
      }
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
