// app/admin/page.jsx
'use client';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'

const AdminDashboard = () => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [maxSlots, setMaxSlots] = useState(5);

  const handleCreateSlots = async () => {
    const response = await fetch('/api/available-slots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        start_time: startTime,
        end_time: endTime,
        max_slots: maxSlots,
      }),
    });
    const data = await response.json();
    console.log('Citas creadas:', data);
  };

  const handleDisableDay = async () => {
    const response = await fetch('/api/disabled-days', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        description: 'Día festivo',
      }),
    });
    const data = await response.json();
    console.log('Día deshabilitado:', data);
  };

  return (
    <div>
      <h1>Dashboard del Administrador</h1>
      <div>
        <h2>Crear Citas Disponibles</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <input
          type="number"
          value={maxSlots}
          onChange={(e) => setMaxSlots(e.target.value)}
        />
        <button onClick={handleCreateSlots}>Crear Citas</button>
      </div>
      <div>
        <h2>Deshabilitar Día</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleDisableDay}>Deshabilitar Día</button>
      </div>
      <div>
        <h2>Calendario</h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={[]}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;