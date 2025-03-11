import Image from 'next/image'
import './inicio.sass'
import HomeForm from '@/components/HomeForm/HomeForm'


export default function Inicio() {


  return(
    <section className='inicioContain'>
      <div className="leftTextContain">
        <div className="comentContain">Cuidado dental de alto nivel, solo para ti! 🦷</div>
        <h2 className='inicioTitle'>Tu mejor <span className='titleSpan'>experiencia</span> <br /> <span className='titleSpan'>dental</span> te espera</h2>
        <p>En nuestra clínica dental, nos aseguramos de que tu sonrisa luzca increíble. Reserva tu cita hoy y descubre el cuidado dental que mereces!</p>
        <button>Ver servicios</button>
      </div>
      <Image src="/images/dentista.webp" width={400} height={400} alt='dentista '/>
      <HomeForm/>
    </section>
  )
}