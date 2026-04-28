import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
// Components
import Navbar from '../../components/Navbar/Navbar';
import Main from '../../components/Main/Main';
import Carousel from '../../components/Carousel/Carousel';
import Section from '../../components/Section/Section';
import Footer from '../../components/Footer/Footer';
import { motion, AnimatePresence } from 'framer-motion';
// Providers
import { UserProvider as ProviderTalento } from '../../services/UserContext';
import { UserProvider as ProviderEmpresa } from '../../services/UserContextEmpresa';

const Home = () => {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          // Redireciona conforme o papel do usuário (ajuste conforme sua lógica de token)
          navigate('/DashboardEmpresa'); 
        } else {
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error('Token inválido:', error);
        localStorage.removeItem('authToken');
      }
    }
  }, [navigate]);

  return (
    <ProviderTalento>
      <ProviderEmpresa>
        {/* Forçando o estilo caso o utilitário do Tailwind esteja em cache */}
        <div 
          className="bg-engine min-h-screen selection:bg-acid selection:text-white text-ink"
          style={{ backgroundColor: '#F2F0EA' }} 
        >
          <Navbar 
            menu={menu} 
            setMenu={setMenu} 
            barraPesquisa={false} 
            showDashnone={true} 
            link={true}
          />
          
          <AnimatePresence mode="wait">
            {!menu && (
              <motion.main 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-[1440px] mx-auto pt-[90px] px-4 md:px-10" 
              >
                <div className="flex flex-col gap-24">
                  <Main />
                  <Carousel />
                  <Section />
                  <Footer />
                </div>
              </motion.main>
            )}
          </AnimatePresence>
        </div>
      </ProviderEmpresa>
    </ProviderTalento>
  );
}
export default Home;