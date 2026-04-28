import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BtnPrincipal = ({
  texto,
  onClick,
  bg = '#4658f6',
  color = '#fff',
  hoverBg,
  width = 'auto',
  border = 'transparent',
  borderLeftColor = '#fff',
  borderRadius = '0px',
  padding = '10px 20px',
  fontSize = '0.875rem',
  fontWeight = '600',
  icon, // <--- NOVA PROP: recebe o caminho do SVG ou componente
  iconHover, // <--- OPCIONAL: ícone diferente para o hover
  className = ""
}) => {
  const [active, setActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePress = (e) => {
    setActive(true);
    if (onClick) onClick(e);
    setTimeout(() => setActive(false), 200);
  };

  return (
    <button
      className={`relative overflow-hidden transition-all duration-300 active:scale-95 group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePress}
      style={{
        width: width,
        backgroundColor: isHovered ? (hoverBg || '#1A1A1B') : bg, // Padrão ink no hover
        color: color,
        padding: padding,
        borderRadius: borderRadius,
        fontSize: fontSize,
        fontWeight: fontWeight,
        border: `2px solid ${border}`,
        borderLeft: active ? `6px solid ${borderLeftColor}` : `0px solid transparent`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        whiteSpace: 'nowrap', // <--- ADICIONE ISSO AQUI
        flexShrink: 0        // <--- E ISSO PARA NÃO "ESPREMER" O BOTÃO
      }}
    >
      <div className="flex items-center justify-center gap-3 pointer-events-none">
        <span className="uppercase tracking-[0.1em]">{texto}</span>
        
        {icon && (
          <img
            src={isHovered && iconHover ? iconHover : icon}
            alt="Icone"
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        )}
      </div>
    </button>
  );
};

BtnPrincipal.propTypes = {
  texto: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  bg: PropTypes.string,
  hoverBg: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  border: PropTypes.string,
  borderLeftColor: PropTypes.string,
  borderRadius: PropTypes.string,
  padding: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string,
  icon: PropTypes.string, // Agora é uma string com o caminho do arquivo
  iconHover: PropTypes.string,
  className: PropTypes.string,
};

export default BtnPrincipal;