/** @type {import('tailwindcss').Config} */
export default {  
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xl': '1300px',
        'sm': '1024px',
      },
      colors: {
        // O Azul elétrico agora contrasta com o fundo claro
        acid: '#4658f6',
        // Ink agora é um grafite muito escuro para texto, não preto puro
        ink: '#1A1A1B',
        // Paper é o Off-White premium que você pediu
        paper: '#F2F0EA',
        // Grid agora é escuro e bem sutil sobre o papel
        grid: 'rgba(26, 26, 27, 0.05)',
        // Cor de borda para elementos brutalistas
        'soft-border': '#D1D1D1',
      },
      fontFamily: {
        // Space Grotesk combina mais com o estilo premium/tech que a Lexend
        lexend: ['Lexend', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, var(--tw-content-grid) 1px, transparent 1px), linear-gradient(to bottom, var(--tw-content-grid) 1px, transparent 1px)",
      },
    },
  },
  plugins: [
    function({ addComponents, theme }){
      addComponents({
        // O fundo da "Engine" agora em Light Mode
        '.bg-engine': {
          backgroundColor: theme('colors.paper'),
          backgroundImage: `linear-gradient(to right, ${theme('colors.grid')} 1px, transparent 1px), linear-gradient(to bottom, ${theme('colors.grid')} 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          position: 'relative',
        },
        // Footer adaptado: Texto escuro sobre fundo claro
        '.h1Footer': {
            color: theme('colors.ink'),
            fontFamily: theme('fontFamily.lexend'),
            fontSize: '0.875rem',
            fontWeight: '700',
            lineHeight: '160%', 
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
        },
        '.SubFooter': {
          color: '#64748b', // Cinza médio para contraste suave no papel
          fontFamily: theme('fontFamily.lexend'),
          fontSize: '0.875rem',
          fontWeight: '500',
          lineHeight: '160%',
        }
      });
    }
  ],
}