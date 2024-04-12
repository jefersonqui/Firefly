import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { noise2D } from 'canvas-sketch-util/random';
import { mapRange } from 'canvas-sketch-util/math';
import canvasSketch from 'canvas-sketch';
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
import { Pane } from 'tweakpane';
import { shape } from 'prop-types';
import Variables from '../../styles/variables';


const StyledBannerSection = styled.section`
  max-width: 1200px;  
  
  .inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
   

    @media (max-width: 768px) {
      display: block;
    }
  }
`;




const StyledPic = styled.div`
  position: relative;
  max-width: 800px; 

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 100%;
    display: block;
    

  }

  canvas {
    max-width: 1200px;
    box-shadow: 0 4px 20px rgba(0, 0, 10, 0.2);  
    @media (max-width: 768px) {     
      width: 400px;
      height: auto;
    }
  }
  .panel{
     position: absolute;
     top: 20px;
     left: 130px ;
     transform: translateX(-50%);
     z-index: 10;
     @media (max-width: 768px) {
      position: relative; 
      top: 0; 
      left: 0; 
      transform: none; 
    }
  }

  .texto p{
    
    width: 200px;
    position: absolute;
    top: 205px;
    left: 300px;
    color: 'white';
    zIndex: 10;
    font-size: 60px;
    font-weight: bold;
    white-space: nowrap;
    @media (max-width: 768px) {
      position: relative; 
    
      text-align: center;
      top: auto; 
      left: auto; 
      
      font-size: 20px; 
    }
    }
   


`;
const params = {
  cols: 1,
  rows: 1,
  text: '',
  size: 4,
  scaleMin: 1,
  scaleMax: 3,
  freq: -0.007,
  amp: 0.06,
  frame: 0,
  animate: true,
  lineCap: 'butt',
  shape: 'spiral',
  color: 'blue',
  overlay: 'rgb(0, 255, 6)',
  overlay2:'rgb(237, 0, 0)',
};
const PaneContainer = () => {
  const paneRef = useRef(null);

  useEffect(() => {
    const pane = new Pane();
    let f;
    f = pane.addFolder({ title: 'Firefl-y Grid', expanded: true, });
    f.addBinding(params, 'lineCap', { options: { butt: 'butt', round: 'round', square: 'square' } });
    f.addBinding(params, 'cols', { min: 1, max: 70, step: 1 }).on('change', () => canvasSketch(sketch, settings));
    f.addBinding(params, 'rows', { min: 1, max: 70, step: 1 }).on('change', () => canvasSketch(sketch, settings));
    f.addBinding(params, 'scaleMin', { min: 1, max: 5, step: 1 }).on('change', () => canvasSketch(sketch, settings));
    f.addBinding(params, 'scaleMax', { min: 1, max: 5, step: 1 }).on('change', () => canvasSketch(sketch, settings));
    f.addBinding(params, 'overlay'), { color: { type: 'float' } }
    f.addBinding(params, 'overlay2'), { color: { type: 'float' } }



    f = pane.addFolder({ title: 'Firefl-y Noise', expanded: true, }).on('change', () => canvasSketch(sketch, settings));
    f.addBinding(params, 'freq', { min: -0.01, max: 0.01 }).on('change', () => canvasSketch(sketch, settings));
    f.addBinding(params, 'amp', { min: 0, max: 1 }).on('change', () => canvasSketch(sketch, settings));
    f.addBinding(params, 'animate');
    f.addBinding(params, 'frame', { min: 0, max: 999 });
    f.addBinding(params, 'shape', {
      options: {
        square: 'square',
        rectangle: 'rectangle',
        circle: 'circle',
        spiral: 'spiral',
        triangle: 'triangle',
        pentagon: 'pentagon',
        hexagon: 'hexagon',
        star: 'star',
        cone: 'cone',
        sphere: 'sphere',
      }
    }).on('change', () => canvasSketch(sketch, settings));


    paneRef.current.appendChild(pane.element);

    return () => {
      pane.dispose();
    };
  }, []);

  return <div ref={paneRef} />;
};
const Noise = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;


    const render = ({ frame, scale }) => {

      context.clearRect(0, 0, width, height);
      const cols = params.cols;
      const rows = params.rows;
      const numCells = cols * rows;
      const gridw = width * 0.8;
      const gridh = height * 0.8;
      const cellw = gridw / cols;
      const cellh = gridh / rows;
      const margx = (width - gridw) * 0.5;
      const margy = (height - gridh) * 0.5;
      for (let i = 0; i < numCells; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = col * cellw;
        const y = row * cellh;
        const w = cellw * 0.8;
        const h = cellh * 0.8;

        const f = params.animate ? frame : params.frame;
        const n = random.noise3D(x, y, f * 10, params.freq);
        const angle = n * Math.PI * params.amp;
        const scale = mapRange(n, -0.9, 2, params.scaleMin, params.scaleMax);

        context.save();

        context.translate(x, y);
        context.translate(margx, margy);
        context.translate(cellw * 0.5, cellh * 0.5);
        context.rotate(angle);


        context.lineWidth = scale;
        context.lineCap = params.lineCap;

        const fill = context.createLinearGradient(0, 0, w, h);
        fill.addColorStop(0, params.overlay);
        fill.addColorStop(1, params.overlay2);


        context.beginPath();
        switch (params.shape) {
          case 'square':
            context.moveTo(w * -0.5, 0);
            context.lineTo(w * 0.5, 0);
            context.strokeStyle =fill ;//context.strokeStyle =params.overlay ;
            context.stroke();
            break;
          case 'rectangle':
            context.rect(w * -0.5, -h * 0.5, w, h);
            context.strokeStyle = fill;
            context.stroke();
            break;
          case 'circle':
            
            context.arc(0, 0, w * 0.3, 0, Math.PI * 2); // *2 completa la circunferencia *0.3 es el tamaño del radio
            context.strokeStyle = fill;
            context.stroke();
            break;
          case 'spiral':
            const numSpirals = 1; // Número de espirales
            const spiralSpacing = 2; // Espacio entre las espirales
            const spiralRadius = w * 0.3; // Radio de la espiral

            for (let i = 0; i < numSpirals; i++) {
              context.beginPath();
              for (let angle = 0.5; angle <= Math.PI * 1.8; angle += 0.02) { // Utilizar el rango completo de la circunferencia
                const radius = spiralRadius - i * spiralSpacing;
                const x = radius * Math.cos(angle) * Math.sin(angle); // Multiplicar por sin(angle) para darle una forma más redondeada
                const y = radius * Math.sin(angle);
                context.lineTo(x, y);
              }
              context.strokeStyle = fill;
              context.stroke();
            }
            break;
          case 'triangle':
            context.moveTo(0, -h * 0.5);
            context.lineTo(w * 0.5, h * 0.5);
            context.lineTo(w * -0.5, h * 0.5);
            context.closePath();
            context.strokeStyle = fill;
            context.stroke();
            break;
          case 'pentagon':
            // Dibujar un pentágono
            const sidesPentagon = 5; // Número de lados del pentágono
            const pentagonRadius = w * 0.5; // Radio del pentágono

            context.beginPath();
            for (let i = 0; i <= sidesPentagon; i++) {
              const angle = (Math.PI * 2 * i) / sidesPentagon;
              const x = Math.cos(angle) * pentagonRadius;
              const y = Math.sin(angle) * pentagonRadius;
              context.lineTo(x, y);
            }
            context.closePath();
            context.strokeStyle = fill;
            context.stroke();
            break;
          case 'hexagon':
            // Dibujar un hexágono
            const sidesHexagon = 6; // Número de lados del hexágono
            const hexagonRadius = w * 0.2; // Radio del hexágono

            context.beginPath();
            for (let i = 0; i <= sidesHexagon; i++) {
              const angle = (Math.PI * 2 * i) / sidesHexagon;
              const x = Math.cos(angle) * hexagonRadius;
              const y = Math.sin(angle) * hexagonRadius;
              context.lineTo(x, y);
            }
            context.closePath();
            context.strokeStyle = fill;
            context.stroke();
            break;
          case 'star':
            // Dibujar una estrella
            const numPointsStar = 4; // Número de puntos de la estrella
            const innerRadiusStar = w * 0.1; // Radio interior de la estrella
            const outerRadiusStar = w * 0.25; // Radio exterior de la estrella

            context.beginPath();
            for (let i = 0; i <= numPointsStar * 2; i++) {
              const radius = i % 2 === 0 ? outerRadiusStar : innerRadiusStar;
              const angle = (Math.PI * 2 * i) / (numPointsStar * 2);
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              context.lineTo(x, y);
            }
            context.closePath();
            context.strokeStyle = fill;
            context.stroke();
            break;
          case 'cone':

            const coneHeight = w * 0.8;
            const coneRadius = w * 0.5;
            context.beginPath();
            context.ellipse(0, 0, coneRadius, coneRadius * 0.2, 0, 0, Math.PI * 2);
            context.moveTo(-coneRadius, 0);
            context.lineTo(0, -coneHeight);
            context.lineTo(coneRadius, 0);
            context.strokeStyle = fill;
            context.stroke();
            break;
          case 'sphere':
            const sphereRadius = w * 0.3;

            context.beginPath();
            // context.arc(0, 0, sphereRadius, 0, Math.PI * 2);
            context.moveTo(0, -sphereRadius);
            context.lineTo(0, sphereRadius);
            context.moveTo(-sphereRadius, 0);
            context.lineTo(sphereRadius, 0);
            context.strokeStyle = fill;
            context.stroke();
            break;
          default:
            break;
        }
        context.restore();
      }
    };

    const settings = {
      dimensions: [900, 900],
      animate: true,
      context: '2d',
      duration: Infinity,
      fps: 32,
    };

    const sketch = () => {
      return ({ context, width, height, frame }) => {
        render({ context, width, height, frame });
      };
    };



    canvasSketch(sketch, settings);


    return () => {
      // Cleanup code if needed
    };
  }, []);

  return (
    <>

      <StyledBannerSection id="#">
        <h2 className="numbered-heading">Noise</h2>
        <div className="inner">
          <StyledPic>
            <div className='texto' >
              <p>Firefl-y Animation</p>
            </div>
            <canvas ref={canvasRef} width={1200} height={500}></canvas>
            <div className='panel'>
              <PaneContainer />
            </div>
          </StyledPic>
        </div>
      </StyledBannerSection>
    </>
  );
};

export default Noise;