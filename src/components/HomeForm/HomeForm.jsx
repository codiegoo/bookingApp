'use client'
import './homeForm.sass'
import { useState } from "react";
import dynamic from "next/dynamic";
import { LiaUserInjuredSolid } from "react-icons/lia";
import { IoCallOutline } from "react-icons/io5";
import { RiToothLine } from "react-icons/ri";
import { BsCalendar2Date } from "react-icons/bs";


const MyCalendar = dynamic(() => import("../../components/Calendar/Calendar.jsx"), {
  ssr: false, // Evita problemas con SSR de Next.js
});


export default function HomeForm() {
  const [selectedDate, setSelectedDate] = useState(""); // Estado para la fecha elegida
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Controla si se muestra el calendario
  const [selectedService, setSelectedService] = useState("");

  const handleDateClick = (e) => {
    e.preventDefault();
    setIsCalendarOpen(true); // Abre el calendario al hacer clic en el input
  };

  // Lista de servicios dentales
  const dentalServices = [
    "Chequeo general",
    "Limpieza dental",
    "Extracción",
    "Blanqueamiento",
    "Ortodoncia",
    "Endodoncia",
    "Implantes dentales",
    "Carillas",
  ];

  const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
  
      // Obtener los datos del formulario
      const nombreCompleto = formData.get('nombre');
      const numeroWhatsApp = formData.get('phone');
      const servicio = formData.get('service');
      const fecha = formData.get('date');
  
      enviarMensajeWhatsApp(nombreCompleto, numeroWhatsApp, servicio, fecha);
    };
  
  
    // Función para enviar mensaje a WhatsApp
    const enviarMensajeWhatsApp = (nombreCompleto, numeroWhatsApp, servicio, fecha) => {
      const mensaje = `Hola, mi nombre es ${nombreCompleto} y me gustaría agendar un cita para ${servicio} al teléfono ${numeroWhatsApp} en el horario y dia ${fecha}`; // Mensaje a enviar
  
      const numeroDestino = '6871403223'; // Número de WhatsApp al que enviar el mensaje
  
      // Crear el enlace para abrir WhatsApp con el mensaje y el número de destino
      const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensaje)}`;
  
      // Abrir WhatsApp en una nueva pestaña del navegador
      window.open(url, '_blank');
    };

  return (
    <form onSubmit={handleSubmit} className="homeFormContain">
      <div className="inputContain">
        <label htmlFor="nombre">Nombre:</label>
        <div className="iconInput">
          <LiaUserInjuredSolid className='formIconContain'/>
          <input type="text" placeholder="Nombre completo" name="nombre" />
        </div>
      </div>
      
      <div className="inputContain">
        <label htmlFor="phone">Teléfono:</label>
        <div className="iconInput">
          <IoCallOutline className='formIconContain'/>
          <input type="text" placeholder="Tu WhatsApp" name="phone" />
        </div>
      </div>
      
      <div className="inputContain">
        <label htmlFor="service">Servicio:</label>
        <div className="iconInput">
          <RiToothLine className='formIconContain'/>
          <select
            name="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="" disabled>Selecciona el motivo de tu cita</option>
            {dentalServices.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="inputContain">
        <label htmlFor="date">Fecha</label>
        <div className="iconInput">
          <BsCalendar2Date className='formIconContain'/>
          <input
            type="text"
            placeholder="Fecha"
            name="date"
            value={selectedDate}
            onClick={handleDateClick}
            readOnly
          />
        </div>
      </div>

      <button type='submit'>Reservar</button>

      {isCalendarOpen && (
          <div className="calendar-overlay">
            <MyCalendar 
              onSelectDate={(date) => {
                setSelectedDate(date); // Actualiza el input con la fecha seleccionada
                setIsCalendarOpen(false); // Cierra el calendario
              }}
              onClose={() => setIsCalendarOpen(false)}
            />
          </div>
      )}
    </form>
  );
}
