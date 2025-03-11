'use client';

import Link from "next/link";

export default function NavBurger({ activeLink, handleLinkClick, isBurgerOpen, toggleBurgerMenu }) {
  return (
    <div className="navBurgerContain">
      <button className="burger-button" onClick={toggleBurgerMenu}>
        <span className="burger-icon">✖</span>
      </button>
      {isBurgerOpen && (
        <ul className="burgerUl">
          <li>
            <Link
              href="#InicioContain"
              className={activeLink === "#InicioContain" ? "button" : ""}
              onClick={() => handleLinkClick("#InicioContain")}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              href="#ServiciosContain"
              className={activeLink === "#ServiciosContain" ? "button" : ""}
              onClick={() => handleLinkClick("#ServiciosContain")}
            >
              Servicios
            </Link>
          </li>
          <li>
            <Link
              href="#NosotrosContain"
              className={activeLink === "#NosotrosContain" ? "button" : ""}
              onClick={() => handleLinkClick("#NosotrosContain")}
            >
              Nosotros
            </Link>
          </li>
          <li>
            <Link
              href="#ContactoContain"
              className={activeLink === "#ContactoContain" ? "button" : ""}
              onClick={() => handleLinkClick("#ContactoContain")}
            >
              Contacto
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
