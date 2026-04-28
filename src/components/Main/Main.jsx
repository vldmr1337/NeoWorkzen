import ImageSection from '../../assets/ImageSection.png'
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import './Main.css'
import setaIcon from '../../../public/icons/arrow-narrow-right.svg'

const Main = () => {
  return (
    <motion.div   
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="main-hero container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 py-12 md:py-24"
    >
      <div className="flex flex-col items-start gap-6 text-left">
        <h1 className="titulo-hero font-space text-ink leading-[1.1] tracking-tight">
          Impulsione sua <br /> 
          <span className="text-acid outline-text">carreira.</span>
        </h1>
        
        <p className="paragrafo-hero font-lexend text-ink/80 max-w-lg text-lg md:text-xl">
          O <span className="font-bold text-ink">Workzen</span> é o ponto de encontro entre talentos fora da curva e empresas que buscam inovação.
        </p>
     
        <div className="mt-4">
          <Link to="/Escolha">
            <BtnPrincipal 
              texto="Começar Agora" 
              bg="#4658f6" 
              hoverBg="#1A1A1B"
              color="#fff" 
              width="220px"
              padding="15px"
              showIcon={true}
              icon={setaIcon}
            />
          </Link>
        </div>
      </div>
      
      <div className="flex justify-center md:justify-end">
        <div className="relative">
          {/* Decoração brutalista atrás da imagem */}
          <div className="absolute inset-0 bg-acid translate-x-4 translate-y-4 -z-10 opacity-10"></div>
          <img
            src={ImageSection}
            alt="Workzen Hero"
            className="image-hero w-full max-w-[680px] object-contain"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Main