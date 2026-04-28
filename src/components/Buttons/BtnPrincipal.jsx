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
  showIcon = false,
  className = ""
}) => {
  const [active, setActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePress = (e) => {
    setActive(true);
    if (onClick) onClick(e);
    // Remove o estado de "ativo" após 200ms para o efeito de feedback
    setTimeout(() => setActive(false), 200);
  };

  return (
    <button
      className={`relative overflow-hidden transition-all duration-200 active:scale-95 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePress}
      style={{
        width: width,
        backgroundColor: isHovered ? (hoverBg || bg) : bg,
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
        fontFamily: 'inherit'
      }}
    >
      <div className="flex items-center justify-center gap-2 pointer-events-none">
        <span className="uppercase tracking-wider">{texto}</span>
        
        {showIcon && (
          <img
            src={active || isHovered ? "icons/iconWhite-block.svg" : "icons/icon-block.svg"}
            alt="Icone"
            className="w-4 h-4 transition-transform"
            style={{ filter: active ? 'brightness(1)' : 'none' }}
          />
        )}
      </div>
    </button>
  );
};

BtnPrincipal.propTypes = {
  texto: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
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
  showIcon: PropTypes.bool,
  className: PropTypes.string,
};

export default BtnPrincipal;