import { PrismaClient } from 'generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient(); // eslint-disable-line new-cap

export const seedUsers = async () => {
  const users = [
    {
      user_id: crypto.randomUUID(),
      email: 'test@test.com',
      password: await bcrypt.hash('password', 10),
      first_name: 'John',
      last_name: 'Doe',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: crypto.randomUUID(),
      email: 'test2@test.com',
      password: await bcrypt.hash('password1', 10),
      first_name: 'Will',
      last_name: 'Baker',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      user_id: crypto.randomUUID(),
      email: 'test3@test.com',
      password: await bcrypt.hash('password2', 10),
      first_name: 'Mike',
      last_name: 'Smith',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
};
