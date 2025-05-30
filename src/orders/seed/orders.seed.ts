import { PrismaClient } from 'generated/prisma';
import { OrderStatus } from 'generated/prisma';

const prisma = new PrismaClient(); // eslint-disable-line new-cap

export const seedOrders = async () => {
  const orders = [
    {
      order_id: '1',
      user_id: '1',
      team_id: '1',
      title: 'Разработка веб-сайта',
      description: 'Создание корпоративного сайта с адаптивным дизайном',
      status: OrderStatus.PENDING,
      total_price: 150000,
      estimated_start_date: new Date('2024-03-01'),
      estimated_end_date: new Date('2024-04-01'),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      order_id: '2',
      user_id: '2',
      team_id: '2',
      title: 'Мобильное приложение',
      description: 'Разработка iOS приложения для доставки еды',
      status: OrderStatus.PENDING,
      total_price: 200000,
      estimated_start_date: new Date('2024-03-15'),
      estimated_end_date: new Date('2024-05-15'),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      order_id: '3',
      user_id: '3',
      team_id: '1',
      title: 'UI/UX дизайн',
      description: 'Создание дизайн-системы для банковского приложения',
      status: OrderStatus.COMPLETED,
      total_price: 80000,
      estimated_start_date: new Date('2024-02-01'),
      estimated_end_date: new Date('2024-02-28'),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      order_id: '4',
      user_id: '1',
      team_id: '3',
      title: 'SEO оптимизация',
      description: 'Повышение позиций сайта в поисковой выдаче',
      status: OrderStatus.PENDING,
      total_price: 50000,
      estimated_start_date: new Date('2024-03-10'),
      estimated_end_date: new Date('2024-04-10'),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      order_id: '5',
      user_id: '2',
      team_id: '2',
      title: 'Техническая поддержка',
      description: 'Обслуживание и поддержка корпоративного портала',
      status: OrderStatus.PENDING,
      total_price: 120000,
      estimated_start_date: new Date('2024-03-20'),
      estimated_end_date: new Date('2024-06-20'),
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  for (const order of orders) {
    await prisma.order.create({
      data: order,
    });
  }
};
