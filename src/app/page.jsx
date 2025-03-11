import Inicio from "@/pages/Inicio/Inicio";
import About from "@/pages/About/About";
import Services from "@/pages/Services/Services";
import Footer from "@/pages/Footer/Footer";
import Contact from "@/pages/Contact/Contact";
import Nav from "@/components/Nav/Nav";
import './main.sass'

export default function Home() {
  return (
    <>
      <Nav/>
      <Inicio/>
      <About/>
      <Services/>
      <Contact/>
      <Footer/>
    </>
  );
}
