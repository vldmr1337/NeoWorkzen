import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowDown, IoIosSearch, IoMdNotificationsOutline, IoMdSettings, IoMdLogOut, IoIosMenu, IoIosClose } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

import BtnPrincipal from '../Buttons/BtnPrincipal.jsx';
import User from '../../components/UserProfile/UserProfile.jsx';
import UserEmpresa from '../../components/UserEmpresa/UserEmpresa.jsx';
import { useUser as useUserTalento } from '../../services/UserContext';
import { useUser as useUserEmpresa } from '../../services/UserContextEmpresa.jsx';
import Logo from '../../assets/Logo.png';
import './Navbar.css';

const Navbar = ({
  showDashnone = true,
  link = true,
  img = true,
  criConta = true,
  barraPesquisa = false,
  setSearchText,
  notify
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [menuMobile, setMenuMobile] = useState(false);
  
  const { data: user } = useUserTalento();
  const { data: userDataEmpresa } = useUserEmpresa();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuMobile(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/Login';
  };

  if (!(userDataEmpresa || user || isHome)) return null;

  return (
    <nav className={`elysian-nav ${scrolled ? 'scrolled' : ''}`}>
      {/* Adicionado 'relative' para o container pai */}
      <div className="nav-container relative">
        
        {/* LADO ESQUERDO */}
        <div className="nav-left">
          <button 
            className="mobile-menu-btn flex md:hidden" 
            onClick={() => setMenuMobile(!menuMobile)}
          >
            {menuMobile ? <IoIosClose size={32} /> : <IoIosMenu size={32} />}
          </button>

          {/* Container da logo ajustado para centralização */}
          <Link to="/" className="nav-logo-container">
            <img src={Logo} alt="Worzen" className="logo-img" />
          </Link>
          
          {link && (
            <div className="nav-links hidden md:flex">
              <button className="nav-btn-link">BUSCAR TRABALHO <IoIosArrowDown /></button>
              <button className="nav-btn-link">ANUNCIAR VAGA <IoIosArrowDown /></button>
            </div>
          )}
        </div>

        {/* LADO DIREITO */}
        <div className="nav-right">
          {barraPesquisa && (
            <div className="search-wrapper hidden md:flex">
              <IoIosSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="PROCURAR..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          )}

          <div className="nav-actions">
            {isHome && !user && !userDataEmpresa && showDashnone && (
              <div className="hidden md:flex gap-2 md:gap-4 items-center">
                <Link to="/Login">
                  <BtnPrincipal texto="Entrar" bg="transparent" border="rgba(255, 255, 255, 0.1)" width="80px" className="md:w-[100px]" hoverBg="#212121" />
                </Link>
                {criConta && (
                  <Link to="/Escolha">
                    <BtnPrincipal texto="Criar Conta" hoverBg="#3544c7" width="130px" className="md:w-[150px]" />
                  </Link>
                )}
              </div>
            )}

            {(user || userDataEmpresa) && img && (
              <div className="profile-trigger" onClick={() => setShowProfile(!showProfile)}>
                <div className="avatar-box">
                  <img src={user?.image || userDataEmpresa?.image || 'https://via.placeholder.com/150'} alt="User" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuMobile && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mobile-overlay md:hidden"
          >
            <div className="flex flex-col gap-6 p-8">
              <button className="nav-btn-link text-lg justify-start">BUSCAR TRABALHO</button>
              <button className="nav-btn-link text-lg justify-start">ANUNCIAR VAGA</button>
              
              {barraPesquisa && (
                 <div className="search-wrapper flex">
                    <IoIosSearch className="search-icon" />
                    <input type="text" placeholder="PROCURAR..." className="w-full bg-transparent outline-none text-white" />
                 </div>
              )}

              {isHome && !user && !userDataEmpresa && showDashnone && (
                <div className="flex flex-col gap-4 pt-4 border-t border-zinc-800">
                  <Link to="/Login" onClick={() => setMenuMobile(false)}>
                    <BtnPrincipal texto="Entrar" bg="transparent" border="rgba(255, 255, 255, 0.1)" width="100%" hoverBg="#212121" />
                  </Link>
                  {criConta && (
                    <Link to="/Escolha" onClick={() => setMenuMobile(false)}>
                      <BtnPrincipal texto="Criar Conta" hoverBg="#3544c7" width="100%" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

Navbar.propTypes = {
  menu: PropTypes.bool,
  setMenu: PropTypes.func,
  showDashnone: PropTypes.bool,
  link: PropTypes.bool,
  img: PropTypes.bool,
  criConta: PropTypes.bool,
  userTalento: PropTypes.bool,
  NavEmpresa: PropTypes.bool,
  barraPesquisa: PropTypes.bool,
  setSearchText: PropTypes.func,
};

export default Navbar;