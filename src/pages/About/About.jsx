'use client'
import { useEffect, useRef, useState } from "react";
import './about.sass'

export default function About() {
  const videoRef = useRef(null); // Referencia al elemento de video
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // Índice del video actual

  // Lista de videos
  const videos = [
    "/videos/video1.mp4",
    "/videos/video2.mp4",
  ];

  // Función para manejar el ciclo infinito
  const handleVideoEnd = () => {
    // Cambia al siguiente video en la lista
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(nextIndex);
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    // Configura el evento cuando el componente se monta
    if (videoElement) {
      videoElement.src = videos[currentVideoIndex]; // Establece la fuente del video
      videoElement.play(); // Reproduce el video

      videoElement.addEventListener("ended", handleVideoEnd);
    }

    // Limpia el evento cuando el componente se desmonta
    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [currentVideoIndex]); // Se ejecuta cuando cambia el índice del video

  return (
    <section className="aboutContain">
      <div className="videoContain">
        <video
          ref={videoRef}
          muted // Agrega muted para evitar problemas de autoplay en algunos navegadores
          playsInline // Para iOS
          autoPlay // Reproduce automáticamente
        >
          Tu navegador no soporta el elemento de video.
        </video>
      </div>

      <div className="textAboutContain">
        <h3>
          +10<span> años de </span>experiencia
          <br />
          en el <span>cuidado dental</span>
        </h3>
        <p>
          Durante más de una década, hemos brindado atención dental de calidad,
          combinando tecnología avanzada con un trato cálido y personalizado.
          Nuestro compromiso es cuidar tu sonrisa, ofreciéndote tratamientos
          seguros, efectivos y adaptados a tus necesidades.
        </p>
        <div className="listAboutContain">
          <p></p>
          <p></p>
          <p></p>
        </div>
        <button>Ver mas</button>
      </div>
    </section>
  );
}