import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function POST(request) {
  const { date, start_time, end_time, max_slots } = await request.json();

  try {
    const slots = [];
    const slotDuration = 60; // minutos
    const start = new Date(`${date}T${start_time}:00.000Z`); // Asegurar formato correcto
    const end = new Date(`${date}T${end_time}:00.000Z`);

    for (let i = 0; i < max_slots; i++) {
      const slotStart = new Date(start.getTime() + i * slotDuration * 60000);
      const slotEnd = new Date(slotStart.getTime() + slotDuration * 60000);

      if (slotEnd > end) break;

      const newSlot = await prisma.availableSlot.create({
        data: {
          date: start,
          start_time: slotStart,
          end_time: slotEnd,
          max_slots: 1,
        },
      });
      slots.push(newSlot);
    }

    return NextResponse.json(slots);
  } catch (error) {
    console.error("Error en la API /api/available-slots:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET() {
  try {
    // Obtener todas las citas disponibles para el día
    const slots = await prisma.availableSlot.findMany();
    return NextResponse.json(slots);
  } catch (error) {
    console.error("Error en GET /api/available-slots:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}