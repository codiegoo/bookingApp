import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FoviDental - La mejor clínica dental en Los Mochis, Sinaloa",
  description: "Agenda tu cita en FoviDental, la mejor clínica dental en Los Mochis, Sinaloa. Servicios de ortodoncia, limpieza dental, blanqueamiento y más.",
  keywords: "dentista, clínica dental, ortodoncia, limpieza dental, blanqueamiento, carillas dentales, Los Mochis, Sinaloa",
  author: "FoviDental",
  robots: "index, follow", // Permite a los motores de búsqueda indexar la página
  ogTitle: "FoviDental - La mejor clínica dental en Los Mochis, Sinaloa",
  ogDescription: "Expertos en salud dental en Los Mochis. Reserva tu cita hoy mismo y disfruta de una sonrisa saludable.",
  ogType: "website",
  ogUrl: "https://fovidental.com", // Coloca tu URL real
  ogImage: "https://tusitio.com/imagen-clinica.jpg", // Imagen destacada para compartir en redes sociales
  twitterCard: "summary_large_image",
  twitterSite: "@fovid_dental", // Si tienes Twitter
  twitterTitle: "FoviDental - La mejor clínica dental en Los Mochis, Sinaloa",
  twitterDescription: "Agenda tu cita en FoviDental y obtén la mejor atención en salud dental en Los Mochis, Sinaloa.",
  twitterImage: "https://tusitio.com/imagen-clinica.jpg",
  language: "es",
  geoRegion: "MX-SIN", // Código de Sinaloa en México
  geoPlacename: "Los Mochis",
  geoPosition: "25.7954,-108.9994", // Coordenadas de Los Mochis
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
