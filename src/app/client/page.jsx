'use client'
import dynamic from "next/dynamic";

const MyCalendar = dynamic(() => import("../../components/Calendar/Calendar.jsx"), {
  ssr: false, // Evita problemas con SSR de Next.js
});

const CalendarPage = () => {
  return (
    <div>
      <MyCalendar />
    </div>
  );
};

export default CalendarPage;
