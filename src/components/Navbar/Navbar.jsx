import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowDown, IoIosSearch, IoMdNotificationsOutline, IoMdSettings, IoMdLogOut } from "react-icons/io";
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
  userTalento = false,
  NavEmpresa = false,
  barraPesquisa = false,
  setSearchText,
  notify
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const { data: user } = useUserTalento();
  const { data: userDataEmpresa } = useUserEmpresa();
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Efeito de scroll para mudar a altura da nav
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debounce para pesquisa
  useEffect(() => {
    if (setSearchText) setSearchText(inputValue);
  }, [inputValue, setSearchText]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/Login';
  };

  // Se não houver usuário logado e não for a home, não renderiza (conforme sua lógica original)
  if (!(userDataEmpresa || user || isHome)) return null;

  return (
    <nav className={`elysian-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        
        {/* LADO ESQUERDO: LOGO E LINKS PRINCIPAIS */}
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <img src={Logo} alt="Worzen" style={{ width: '180px' }} />
          </Link>
          
          {link && (
            <div className="nav-links">
              <button className="nav-btn-link">BUSCAR TRABALHO <IoIosArrowDown /></button>
              <button className="nav-btn-link">ANUNCIAR VAGA <IoIosArrowDown /></button>
            </div>
          )}
        </div>

        {/* LADO DIREITO: PESQUISA, NOTIFICAÇÃO E PROFILE */}
        <div className="nav-right">
          
          {/* BARRA DE PESQUISA ESTILIZADA */}
          {barraPesquisa && (
            <div className="search-wrapper">
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
            
            {/* NOTIFICAÇÕES */}
            {(user || userDataEmpresa) && (
              <button className="icon-action">
                <IoMdNotificationsOutline size={22} />
                {notify && <span className="notify-dot"></span>}
              </button>
            )}

{/* ÁREA DE LOGIN (CASO DESLOGADO) */}
{isHome && !user && !userDataEmpresa && showDashnone && (
  <div className="flex gap-4 items-center">
    <Link to="/Login">
      {/* bg="transparent" para o estilo outline
          border="#4658f6" para aparecer a borda no botão transparente
      */}
      <BtnPrincipal 
        texto="Entrar" 
        bg="transparent" 
        border="rgba(255,255,255,0.1)" 
        hoverBg="rgba(255,255,255,0.05)"
        color="#fff" 
        width="100px" 
      />
    </Link>
    
    {criConta && (
      <Link to="/Escolha">
        {/* Usando a cor --acid do seu CSS (#4658f6) */}
        <BtnPrincipal 
          texto="Criar Conta" 
          bg="#4658f6" 
          hoverBg="#3544c7"
          color="#fff" 
          width="150px" 
        />
      </Link>
    )}
  </div>
)}

            {/* AVATAR E DROPDOWN (TALENTO OU EMPRESA) */}
            {(user || userDataEmpresa) && img && (
              <div className="profile-trigger" onClick={() => setShowProfile(!showProfile)}>
                <div className="avatar-box">
                  {user?.image || userDataEmpresa?.image ? (
                    <img src={user?.image || userDataEmpresa?.image} alt="User" />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-zinc-800">
                       {user ? <User prLet={true} /> : <UserEmpresa prLet={true} />}
                    </div>
                  )}
                </div>

                <AnimatePresence>
                  {showProfile && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="elysian-dropdown"
                    >
                      <div className="dropdown-header">
                        <p className="user-name">{(user?.name || userDataEmpresa?.name || 'USER').toUpperCase()}</p>
                        <p className="user-role outline-text">
                          {user ? 'TALENTO_LEVEL_1' : 'MODO_CORPORATIVO'}
                        </p>
                      </div>
                      
                      <div className="dropdown-body">
                        <Link to={user ? "/config" : "/ConfiguracaoEmpresa"} className="drop-item">
                          <IoMdSettings /> CONFIGURAÇÕES
                        </Link>
                        <button onClick={handleLogout} className="drop-item logout">
                          <IoMdLogOut /> DISCONNECT_
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

          </div>
        </div>
      </div>
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
