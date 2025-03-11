'use client'
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import data from "@/db/data.json";
import "./cardService.sass";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";


export default function CardsService() {
  const [currentIndex, setCurrentIndex] = useState(0); // Índice de la tarjeta actual
  const cardsPerPage = 3; // Número de tarjetas visibles a la vez
  const [touchStartX, setTouchStartX] = useState(0); // Posición inicial del toque
  const [touchEndX, setTouchEndX] = useState(0); // Posición final del toque
  const cardsContainerRef = useRef(null); // Referencia al contenedor de tarjetas

  // Función para mover el slider a la izquierda
  const slideLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : data.length - cardsPerPage
    );
  };

  // Función para mover el slider a la derecha
  const slideRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < data.length - cardsPerPage ? prevIndex + 1 : 0
    );
  };

  // Manejar el inicio del toque
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // Manejar el movimiento del toque
  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  // Manejar el final del toque
  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Deslizar hacia la izquierda
      slideRight();
    } else if (touchEndX - touchStartX > 50) {
      // Deslizar hacia la derecha
      slideLeft();
    }
  };

  // Manejar el scroll horizontal con el touchpad
  const handleWheel = (e) => {
    if (e.deltaX !== 0) {
      e.preventDefault();
      cardsContainerRef.current.scrollLeft += e.deltaX;
    }
  };

  // Agregar event listeners para el touchpad
  useEffect(() => {
    const cardsContainer = cardsContainerRef.current;
    if (cardsContainer) {
      cardsContainer.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (cardsContainer) {
        cardsContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <section className="sliderContain">
      <IoIosArrowDropleft onClick={slideLeft}/>
      <div
        className="cardsWrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={cardsContainerRef}
      >
        <div
          className="cardsContainer"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerPage)}%)`,
          }}
        >
          {data.map((service, index) => (
            <div key={index} className="card">
              <Image
                src={service.image}
                alt={service.name}
                width={200}
                height={150}
              />
              <span className="cardIcon">{service.icon}</span>
              <h5>{service.name}</h5>
              <p>{service.description}</p>
              <button>Ver más</button>
            </div>
          ))}
        </div>
      </div>
      <IoIosArrowDropright onClick={slideRight}/>
    </section>
  );
}