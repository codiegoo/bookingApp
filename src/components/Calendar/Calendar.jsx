'use client'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect } from 'react';
import './calendar.sass'

const MyCalendar = ({ onSelectDate, onClose }) => {
  const [events, setEvents] = useState([]);
  const [disabledDays, setDisabledDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showCalendar, setShowCalendar] = useState(true);

  useEffect(() => {
    fetch('/api/disabled-days')
      .then((response) => response.json())
      .then((data) => {
        setDisabledDays(data.map((day) => new Date(day.date).toISOString().split('T')[0]));
      });

    fetch('/api/available-slots')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.map((slot) => ({
          id: slot.id,
          title: `${formatTime(slot.start_time)} - ${formatTime(slot.end_time)}`,
          start: slot.start_time,
          end: slot.end_time,
          color: 'green',
        })));
      })
      .catch((error) => console.error('Error obteniendo citas:', error));
  }, []);


  // Función para formatear la hora en un formato legible (ej: 10:00 AM)
  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
  
    // Extrae horas y minutos
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Formatea la hora en formato 12 horas (AM/PM)
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; // Convierte 0 a 12 para formato 12 horas
    const formattedMinutes = minutes.toString().padStart(2, '0'); // Asegura dos dígitos para los minutos
  
    // Devuelve el formato deseado (ej: 10:00am)
    return `${formattedHours}:${formattedMinutes}${ampm}`;
  };

  const handleDateClick = (info) => {
    // Verifica si el día está desactivado
    if (disabledDays.includes(info.dateStr)) {
      alert('Este día no está disponible.');
      return;
    }
  
    setSelectedDate(info.dateStr);
    const slotsForDay = events.filter(event => event.start.startsWith(info.dateStr));
    setAvailableSlots(slotsForDay);
    setShowCalendar(false); // Oculta el calendario
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    const formattedDate = selectedDate.replace(/-/g, '/'); // Cambia el formato de la fecha (ej: 2025-03-15 -> 2025/03/15)
    const formattedTime = `${formatTime(slot.start)}-${formatTime(slot.end)}`; // Formato del horario (ej: 10:00am-11:00am)
    onSelectDate(`${formattedDate} - ${formattedTime}`); // Devuelve el formato deseado
  };

  // Función para personalizar el contenido de las celdas de los días
  const renderDayCellContent = (cellInfo) => {
    const isDisabled = disabledDays.includes(cellInfo.date.toISOString().split('T')[0]);
    return (
      <div className={isDisabled ? 'disabled-day' : ''}>
        {cellInfo.dayNumberText}
      </div>
    );
  };

  return (
    <div className='calendarContain'>
      {showCalendar && (
        <FullCalendar
          className="calendar-modal"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="es"
          validRange={{ start: new Date() }}
          dateClick={handleDateClick}
          dayCellContent={renderDayCellContent} // Personaliza el contenido de las celdas
        />
      )}
  
      {selectedDate && availableSlots.length > 0 && (
        <div className='availableSlotsContain'>
          <h3>Citas disponibles para {selectedDate}</h3>
          <ul>
            {availableSlots.map((slot) => (
              <li key={slot.id} style={{ marginBottom: '10px' }}> {/* Usa slot.id como clave */}
                <button
                  style={{ padding: '5px 10px', backgroundColor: 'green', color: 'white' }}
                  onClick={() => handleSlotSelect(slot)}
                >
                  {formatTime(slot.start)} - {formatTime(slot.end)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
  
      <button onClick={onClose} style={{ marginTop: '20px', padding: '10px', backgroundColor: 'red', color: 'white', cursor: 'pointer' }}>
        Cerrar
      </button>
    </div>
  );
};

export default MyCalendar;