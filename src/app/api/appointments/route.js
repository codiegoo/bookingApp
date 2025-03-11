import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany();
    return Response.json(appointments);
  } catch (error) {
    console.error('Error in GET /api/appointments:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const { user_id, date, time, status } = await request.json();
  try {
    const newAppointment = await prisma.appointment.create({
      data: {
        user_id,
        date: new Date(date),
        time: new Date(time),
        status,
      },
    });
    return Response.json(newAppointment);
  } catch (error) {
    console.error('Error in POST /api/appointments:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}