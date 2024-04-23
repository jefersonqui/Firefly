import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const generatePixelatedBackground = (width, height, hexColor) => {
  const pixelSize = 1;
  const spacing = 10;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;


  for (let y = 0; y < height; y += spacing) {
    for (let x = 0; x < width; x += spacing) {
      const alpha = 1 - y / height;
      ctx.fillStyle = hexColor + Math.floor(alpha * 255).toString(16);
      ctx.fillRect(x, y, pixelSize, pixelSize);
    }
  }

  return canvas.toDataURL();
};

const PixelatedBackgroundWrapper = styled.div`
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-image: ${({ width, height, hexColor }) =>
    `url(${generatePixelatedBackground(width, height, hexColor)})`};
`;

const PixelatedBackground = ({ width, height, hexColor }) => {
  return (
    <PixelatedBackgroundWrapper width={width} height={height} hexColor={hexColor} />
  );
};

PixelatedBackground.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  hexColor: PropTypes.string.isRequired,
};

export default PixelatedBackground;
