import React from 'react';

interface ClickerCircleProps {
  onClick: () => void;
}

const ClickerCircle: React.FC<ClickerCircleProps> = ({ onClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevenir comportamiento por defecto
    onClick();
  };

  return (
    <div
      className="w-48 h-48 flex items-center justify-center cursor-pointer"
      onMouseDown={handleClick} // Cambiado de onClick a onMouseDown para una respuesta más rápida
    >
      <img
        src="/src/images/Personaje-Lvl-1.png"
        alt="Clicker"
        className="w-full h-full object-contain select-none" // Añadido select-none para prevenir selección de imagen
        draggable="false" // Prevenir arrastre de imagen
      />
    </div>
  );
};

export default ClickerCircle;