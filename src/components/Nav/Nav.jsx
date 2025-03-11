'use client';

import Image from "next/image";
import './nav.sass';
import { useState, useEffect } from "react";
import NavBurger from "../NavBurger/NavBurger";

export default function Nav() {
  const [activeLink, setActiveLink] = useState("#InicioContain");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 990);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setIsBurgerOpen(false);
  };

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
  };

  return (
    <nav className="nav">
      <Image width={150} height={60} src="/images/fovilogoX.webp" alt="Logo" />
      {isSmallScreen && (
        <button onClick={toggleBurgerMenu} className="burger-button">
          <span>☰</span>
        </button>
      )}


      {isSmallScreen && isBurgerOpen && (
        <NavBurger
          activeLink={activeLink}
          handleLinkClick={handleLinkClick}
          isBurgerOpen={isBurgerOpen}
          toggleBurgerMenu={toggleBurgerMenu}
        />
      )}

      

      {!isSmallScreen && (
        <ul className="nav-list">
          <li>
            <a
              href="#InicioContain"
              className={activeLink === "#InicioContain" ? "button" : ""}
              onClick={() => handleLinkClick("#InicioContain")}
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#ServiciosContain"
              className={activeLink === "#ServiciosContain" ? "button" : ""}
              onClick={() => handleLinkClick("#ServiciosContain")}
            >
              Nosotros
            </a>
          </li>
          <li>
            <a
              href="#NosotrosContain"
              className={activeLink === "#NosotrosContain" ? "button" : ""}
              onClick={() => handleLinkClick("#NosotrosContain")}
            >
              Servicios
            </a>
          </li>
          <li>
            <a
              href="#ContactoContain"
              className={activeLink === "#ContactoContain" ? "button" : ""}
              onClick={() => handleLinkClick("#ContactoContain")}
            >
              Contacto
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}
