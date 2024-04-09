import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
import { noise2D } from 'canvas-sketch-util/random';


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
    // background-color: var(--green);

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

const Banner = () => {
  const canvasRef = useRef(null);
  const skills = ['Three.js', 'canvas-sketch','d3.js','p5.js'];
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const agents = [];
    for (let i = 0; i < 15; i++) {
      const x = random.range(0, width);
      const y = random.range(0, height);
      agents.push(new Agent(x, y));
    }

    const render = () => {
      context.fillStyle = '#0a192f';
      context.fillRect(0, 0, width, height);
      agents.forEach(agent => {
        agent.update();
        agent.draw(context);
        agent.bounce(width, height);
      });
      for (let i = 0; i < agents.length; i++) {
        const agent = agents[i];
        for (let j = i + 1; j < agents.length; j++) {
          const other = agents[j];
          const dist = agent.pos.getDistance(other.pos);
          const fill = context.createLinearGradient(0, 0, width, height);
          fill.addColorStop(0, 'white');
          fill.addColorStop(1, 'yellow');

          if (dist > 200) continue;
          context.lineWidth = math.mapRange(dist, 0, 400, 0.1, 0.2);
          context.beginPath();
          context.strokeStyle = fill;
          context.moveTo(agent.pos.x, agent.pos.y);
          context.lineTo(other.pos.x, other.pos.y);
          context.stroke();
        }
      }
      requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(render);
  }, []);

  return (
    <StyledBannerSection id="about">
      <h2 className="numbered-heading">Canvas-sketch</h2>
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
        </StyledText>
        <StyledPic>
          <canvas ref={canvasRef} width={600} height={100}></canvas>
        </StyledPic>
      </div>
    </StyledBannerSection>
  );
};
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;

  }
  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
class Agent {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(2, 5);
  }
  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  }
  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
  draw(context) {

    context.save();

    context.translate(this.pos.x, this.pos.y);
    context.lineWidth = 'orange';
    context.beginPath();
    context.strokeStyle = 'orange';
    context.fillStyle = 'orange';
    context.moveTo(0, -this.radius);
    context.lineTo(-this.radius * Math.sqrt(3) / 2, this.radius / 2);
    context.lineTo(this.radius * Math.sqrt(3) / 2, this.radius / 2);
    // context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.stroke();
    context.fillStyle = 'orange';
    context.fill();
    context.restore();
  }
}
export default Banner;