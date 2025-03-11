import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const disabledDays = await prisma.disabledDay.findMany();
    return Response.json(disabledDays);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const { date, description } = await request.json();
  try {
    const newDisabledDay = await prisma.disabledDay.create({
      data: {
        date: new Date(date),
        description,
      },
    });
    return Response.json(newDisabledDay);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}