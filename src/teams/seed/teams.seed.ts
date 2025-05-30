import { PrismaClient, Team } from 'generated/prisma';

const prisma = new PrismaClient(); // eslint-disable-line new-cap

export const seedTeams = async () => {
  const teams: Team[] = [
    {
      team_id: '1',
      name: 'Team 1',
      members_count: 1,
      experience: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      team_id: '2',
      name: 'Team 2',
      members_count: 2,
      experience: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      team_id: '3',
      name: 'Team 3',
      members_count: 3,
      experience: 3,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  for (const team of teams) {
    await prisma.team.create({
      data: team,
    });
  }
};
