import { PrismaClient } from 'generated/prisma';

export const technologies = [
  {
    technology_id: crypto.randomUUID(),
    title: 'React',
  },
  {
    technology_id: crypto.randomUUID(),
    title: 'Node.js',
  },
  {
    technology_id: crypto.randomUUID(),
    title: 'Next.js',
  },
  {
    technology_id: crypto.randomUUID(),
    title: 'TypeScript',
  },
  {
    technology_id: crypto.randomUUID(),
    title: 'JavaScript',
  },
  {
    technology_id: crypto.randomUUID(),
    title: 'Python',
  },
];

export const seedTechnologies = async (prisma: PrismaClient) => {
  await prisma.technology.createMany({
    data: technologies,
  });
  return technologies;
};
