
import './services.sass'
import CardsService from "@/components/CardsService/CardsService";



export default function Services() {


  return(
    <section className='servicesContain'>
      <div className="servicesInner">
        <div className="titleContain">
          <h3>Una <span>amplia gama de</span> servicios <br /> para tu <span>sonrisa</span></h3>
        </div>
      </div>
      <CardsService/>
    </section>
  )
}