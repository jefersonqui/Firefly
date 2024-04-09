import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { noise2D } from 'canvas-sketch-util/random';
import { mapRange } from 'canvas-sketch-util/math';
import canvasSketch from 'canvas-sketch';
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
import { Pane } from 'tweakpane';
import { shape } from 'prop-types';


const StyledBannerSection = styled.section`
  max-width: 1200px;  

  .inner {
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-gap: 30px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 800px; 

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  canvas {
    box-shadow: 0 4px 20px rgba(0, 0, 10, 0.2);
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }
    }
  }
`;
const params = {
  cols: 10,
  rows: 10,
  text: '',
  size: 10,
  scaleMin: 0.5,
  scaleMax: 10,
  freq: 0.001,
  amp: 0.2,
  frame: 0,
  animate: true,
  lineCap: 'butt',
  shape: 'square',
};
const PaneContainer = () => {
  const paneRef = useRef(null);

  useEffect(() => {
    const pane = new Pane();
    let f;
    f = pane.addFolder({ title: 'Grid', expanded: true, });
    f.addBinding(params, 'lineCap', { options: { butt: 'butt', round: 'round', square: 'square' } });
    f.addBinding(params, 'cols', { min: 1, max: 100, step: 1 }).on('change', () => canvasSketch(sketch, settings));
    f.addBinding(params, 'rows', { min: 1, max: 100, step: 1 }).on('change', () => canvasSketch(sketch, settings));
    f.addBinding(params, 'scaleMin', { min: 1, max: 100, step: 1 }).on('change', () => canvasSketch(sketch, settings));
    f.addBinding(params, 'scaleMax', { min: 1, max: 100, step: 1 }).on('change', () => canvasSketch(sketch, settings));

    f = pane.addFolder({ title: 'Noise', expanded: true, }).on('change', () => canvasSketch(sketch, settings));
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
  const skills = ['Three.js', 'canvas-sketch', 'd3.js', 'p5.js'];



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


        // const n = random.noise2D(x + frame * 20, y, params.freq);
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


        context.beginPath();
        switch (params.shape) {
          case 'square':
            context.moveTo(w * -0.5, 0);
            context.lineTo(w * 0.5, 0);
            context.strokeStyle = 'blue';
            context.stroke();
            break;
          case 'rectangle':
            context.rect(w * -0.5, -h * 0.5, w, h);
            context.strokeStyle = 'blue';
            context.stroke();
            break;
          case 'circle':
            context.arc(0, 0, w * 0.5, 0, Math.PI * 2);
            context.strokeStyle = 'orange';
            context.stroke();
            break;
          case 'spiral':
            const numSpirals = 1; // Número de espirales
            const spiralSpacing = 5; // Espacio entre las espirales
            const spiralRadius = w * 0.5; // Radio de la espiral

            for (let i = 0; i < numSpirals; i++) {
              context.beginPath();
              for (let angle = 0.5; angle <= Math.PI * 1.8; angle += 0.02) { // Utilizar el rango completo de la circunferencia
                const radius = spiralRadius - i * spiralSpacing;
                const x = radius * Math.cos(angle) * Math.sin(angle); // Multiplicar por sin(angle) para darle una forma más redondeada
                const y = radius * Math.sin(angle);
                context.lineTo(x, y);
              }
              context.strokeStyle = 'blue';
              context.stroke();
            }
            break;
          case 'triangle':
            context.moveTo(0, -h * 0.5);
            context.lineTo(w * 0.5, h * 0.5);
            context.lineTo(w * -0.5, h * 0.5);
            context.closePath();
            context.strokeStyle = 'blue';
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
            context.strokeStyle = 'red';
            context.stroke();
            break;
          case 'hexagon':
            // Dibujar un hexágono
            const sidesHexagon = 6; // Número de lados del hexágono
            const hexagonRadius = w * 0.5; // Radio del hexágono

            context.beginPath();
            for (let i = 0; i <= sidesHexagon; i++) {
              const angle = (Math.PI * 2 * i) / sidesHexagon;
              const x = Math.cos(angle) * hexagonRadius;
              const y = Math.sin(angle) * hexagonRadius;
              context.lineTo(x, y);
            }
            context.closePath();
            context.strokeStyle = 'green';
            context.stroke();
            break;
          case 'star':
            // Dibujar una estrella
            const numPointsStar = 5; // Número de puntos de la estrella
            const innerRadiusStar = w * 0.3; // Radio interior de la estrella
            const outerRadiusStar = w * 0.5; // Radio exterior de la estrella

            context.beginPath();
            for (let i = 0; i <= numPointsStar * 2; i++) {
              const radius = i % 2 === 0 ? outerRadiusStar : innerRadiusStar;
              const angle = (Math.PI * 2 * i) / (numPointsStar * 2);
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              context.lineTo(x, y);
            }
            context.closePath();
            context.strokeStyle = 'blue';
            context.stroke();
            break;
            case 'cone':
              // Dibujar un contorno básico de cono
              const coneHeight = w * 0.8; // Altura del cono
              const coneRadius = w * 0.5; // Radio de la base del cono
            
              context.beginPath();
              // Dibujar la elipse de la base del cono
              context.ellipse(0, 0, coneRadius, coneRadius * 0.2, 0, 0, Math.PI * 2);
              // Dibujar los lados del cono
              context.moveTo(-coneRadius, 0);
              context.lineTo(0, -coneHeight);
              context.lineTo(coneRadius, 0);
              context.strokeStyle = 'orange';
              context.stroke();
              break;
              case 'sphere':
                // Dibujar un contorno básico de esfera
                const sphereRadius = w * 0.4; // Radio de la esfera
              
                context.beginPath();
                // Dibujar dos circunferencias perpendiculares
                context.arc(0, 0, sphereRadius, 0, Math.PI * 2);
                context.moveTo(0, -sphereRadius);
                context.lineTo(0, sphereRadius);
                context.moveTo(-sphereRadius, 0);
                context.lineTo(sphereRadius, 0);
                context.strokeStyle = 'purple';
                context.stroke();
                break;
          default:
            break;
        }
        context.restore();
      }
    };

    const settings = {
      dimensions: [1000, 1000],
      animate: true,
      context: '2d',
      duration: Infinity,
      fps: 32,
      //   scaleToView: true,
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
    <StyledBannerSection id="#">
      <h2 className="numbered-heading">Noise</h2>
      <div className="inner">
        <StyledText>
          <div>
            <p>
              Toda la potencialidad de canvas-sketch para animaciones y otras herramientas
            </p>
            <p>Tecnologías usadas:</p>
          </div>
          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
          <PaneContainer />
        </StyledText>

        <StyledPic>
          <canvas ref={canvasRef} width={600} height={600}></canvas>
        </StyledPic>



      </div>
    </StyledBannerSection>
  );
};

export default Noise;