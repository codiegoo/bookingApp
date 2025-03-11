import { useState } from "react";

export default function DayListQuotes() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  return(
    <div style={{ marginTop: '20px' }}>
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
  )
}