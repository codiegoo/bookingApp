import './contact.sass'
import { RiInstagramFill } from "react-icons/ri";
import { RiWhatsappFill } from "react-icons/ri";
import { RiFacebookCircleFill } from "react-icons/ri";




export default function Contact() {

  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.3047675185976!2d-108.99467112616658!3d25.79351770729255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ba2f56cc7d5d49%3A0xac7dbc630912547a!2sAv.%20Gral.%20Gabriel%20Leyva%2099-55%2C%20Centro%2C%2081200%20Los%20Mochis%2C%20Sin.!5e0!3m2!1ses!2smx!4v1741284134009!5m2!1ses!2smx";
  return (
    <section className="contactContain">
      <iframe 
        src={mapSrc}
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className='textContactContain'>
        <h3>¿Necesitas <span>más información</span> <br /> o <span>una cotización</span> sin costo?</h3>
        <p>¡Estamos aquí para ayudarte! Contáctanos a través de nuestras redes sociales o déjanos un mensaje. En FoviDental, tu sonrisa es nuestra prioridad, y estamos listos para responder todas tus preguntas y brindarte la atención que mereces. ¡Esperamos saber de ti pronto! </p>
        <div className="socialMediaContain">
          <button><RiInstagramFill className='contactIcon'/>Instagram</button>
          <button><RiFacebookCircleFill className='contactIcon'/>Facebook</button>
          <button><RiWhatsappFill className='contactIcon'/>Whatsapp</button>
        </div>
      </div>
    </section>
  );
}
