import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHeaders = styled.header`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background-image: ${({ backgroundImage }) => (backgroundImage ? `url(${backgroundImage})` : 'none')};

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }
`;

const Conections = ({ isHome }) => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const pixelatedBackground = useRef(null);

  useEffect(() => {
    const generatePixelatedBackground = () => {
      const pixelSize = 1;
      const spacing = 15;

      const width = pixelatedBackground.current.clientWidth;
      const height = pixelatedBackground.current.clientHeight;

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;

      const rows = Math.ceil(height / (pixelSize + spacing));
      const cols = Math.ceil(width / (pixelSize + spacing));

      for (let y = 0; y < rows; y++) {
        const intensity = 1 - y / rows;
        
        for (let x = 0; x < cols; x++) {
          const xPos = x * (pixelSize + spacing);
          const yPos = y * (pixelSize + spacing);
          const blackValue = Math.round(255 * intensity);
          ctx.fillStyle = `rgb(${blackValue}, ${blackValue}, ${blackValue})`
          ctx.fillRect(xPos, yPos, pixelSize, pixelSize);
        }
      }

      setBackgroundImage(canvas.toDataURL());
    };

    generatePixelatedBackground();

    // Cleanup function
    return () => {
      // Perform any cleanup here if needed
    };
  }, []);

  return (
    <StyledHeaders ref={pixelatedBackground} backgroundImage={backgroundImage}>
      Contenido
    </StyledHeaders>
  );
};

Conections.propTypes = {
  isHome: PropTypes.bool,
};

export default Conections;
