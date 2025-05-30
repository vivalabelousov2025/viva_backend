import { PrismaClient } from 'generated/prisma';

export const technologies = [
  {
    technology_id: '1',
    title: 'React',
  },
  {
    technology_id: '2',
    title: 'Node.js',
  },
  {
    technology_id: '3',
    title: 'Next.js',
  },
  {
    technology_id: '4',
    title: 'TypeScript',
  },
  {
    technology_id: '5',
    title: 'JavaScript',
  },
  {
    technology_id: '6',
    title: 'Python',
  },
];

export const seedTechnologies = async (prisma: PrismaClient) => {
  await prisma.technology.createMany({
    data: technologies,
  });
  return technologies;
};
