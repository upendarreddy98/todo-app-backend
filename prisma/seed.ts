// This file is used to seed the database with sample data

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.todo.deleteMany();

  // Insert sample data
  const todos = await prisma.todo.createMany({
    data: [
      {
        title: 'Welcome to Todo App',
        color: 'blue',
        completed: false,
      },
      {
        title: 'Learn Next.js and Express.js',
        color: 'green',
        completed: false,
      },
      {
        title: 'Build Amazing Features',
        color: 'purple',
        completed: false,
      },
      {
        title: 'Test the Application',
        color: 'orange',
        completed: true,
      },
      {
        title: 'Deploy to Production',
        color: 'red',
        completed: false,
      },
    ],
  });

  console.log(`Created ${todos.count} sample todos`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
