import { useState, useEffect } from 'react'; // Adicionamos os hooks
import ImageSection from '../../assets/ImageSection.png'
import BtnPrincipal from '../Buttons/BtnPrincipal.jsx'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import './Main.css'
import setaIcon from '../../../public/icons/arrow-narrow-right.svg'

const Main = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Monitora o tamanho da tela para esconder/mostrar a seta
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div   
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="main-hero container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center px-6 py-12 md:py-24"
    >
      {/* LADO ESQUERDO: TEXTO */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="titulo-hero font-space text-ink leading-[1.1] tracking-tight">
          Impulsione sua <br /> 
          <span className="text-acid outline-text">carreira.</span>
        </h1>
        
        <p className="paragrafo-hero font-lexend text-ink/80 max-w-lg text-lg md:text-xl">
          O <span className="font-bold text-ink">Workzen</span> é o ponto de encontro entre talentos fora da curva e empresas que buscam inovação.
        </p>
     
        <div className="mt-4 w-full md:w-auto">
          <Link to="/Escolha">
            <BtnPrincipal 
              texto="Começar Agora" 
              bg="#4658f6" 
              hoverBg="#1A1A1B"
              color="#fff" 
              width="100%" 
              className="md:w-[220px]" 
              padding="15px"
              /* O segredo: Se for mobile, icon é null. Se não, é o setaIcon */
              icon={isMobile ? null : setaIcon}
              showIcon={!isMobile} 
            />
          </Link>
        </div>
      </div>
      
      {/* LADO DIREITO: IMAGEM */}
      <div className="flex justify-center md:justify-end mt-10 md:mt-0">
        <div className="relative w-full">
          <img
            src={ImageSection}
            alt="Workzen Hero"
            className="image-hero w-full h-auto object-contain max-w-[400px] md:max-w-[680px] mx-auto md:mr-0"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Main