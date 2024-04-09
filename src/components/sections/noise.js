import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { noise2D } from 'canvas-sketch-util/random';
import { mapRange } from 'canvas-sketch-util/math';
import canvasSketch from 'canvas-sketch';
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
import { Pane } from 'tweakpane';

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
const PaneContainer = () => {
    const paneRef = useRef(null);
    const params = {
        cols: 10,
        rows: 10,
        text: '', // Agregado para control de texto
        size: 10 // Agregado para control de tamaño
      };
    useEffect(() => {
        const pane = new Pane();
        const f = pane.addFolder({
            title: 'Noise Params',
            expanded: true,
        });

        f.addBinding(params, 'cols', { min: 1, max: 20, step: 1 }).on('change', () => canvasSketch(sketch, settings));
        f.addBinding(params, 'rows', { min: 1, max: 20, step: 1 }).on('change', () => canvasSketch(sketch, settings));
        f.addBinding(params, 'text');
        f.addBinding(params, 'size', { min: 1, max: 20, step: 1 });

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

            const cols = 10;
            const rows = 10;
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

                const n = noise2D(x + frame * 20, y, 0.001);
                const angle = n * Math.PI * 0.2;
                const scale = mapRange(n, -0.9, 2, 1, 20);

                context.save();

                context.translate(x, y);
                context.translate(margx, margy);
                context.translate(cellw * 0.5, cellh * 0.5);
                context.rotate(angle);


                context.lineWidth = scale;

                context.beginPath();
                context.moveTo(w * -0.5, 0);
                context.lineTo(w * 0.5, 0);
                context.strokeStyle = 'orange'
                context.stroke();
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
                    <PaneContainer/>
                </StyledText>
                
                <StyledPic>
                    <canvas ref={canvasRef} width={600} height={600}></canvas>
                </StyledPic>
                
                    
                
            </div>
        </StyledBannerSection>
    );
};

export default Noise;