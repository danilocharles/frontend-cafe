import { useState } from 'react';

const CircleToggle = () => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`w-16 h-16 rounded-full cursor-pointer flex items-center justify-center 
        ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
      onClick={toggleSelection}
    >
      {isSelected ? '' : ''}
    </div>
  );
};

export default CircleToggle;