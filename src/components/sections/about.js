import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
// @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

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
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }
///////////////////77
    .superimg{
      position: absolute;
      top: 70%; 
      left: 30%; 
      z-index: 1;
      color: #fff;
      font-size:2em;
      font-family: "SFMonospace";
      // opacity: 0.5;
      
    }
    .supertext{
      font-weight: 400;
    }


    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['JavaScript (ES6+)', 'TypeScript', 'React', 'Eleventy', 'Node.js', 'WordPress'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">Acerca de mi</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
            Nos especializamos en el desarrollo web, manipulación 
            y visualización de datos, así como diseño y modelado 3D.
            </p>

            <p>
            Nuestra experiencia proviene de colaboraciones con diversas instituciones, como la {' '}
              <a href="https://www.unicauca.edu.co/versionP/">Universidad del Cauca</a>,{' '}
              
              la {' '}
              <a href="https://www.apple.com/">Institución Universitaria Colegio Mayor del Cauca </a>, {' '}
                una {' '}
              <a href="https://platzi.com/"> Startup</a>,{' '}
              <a href="https://scout.camd.northeastern.edu/">y un estudio de diseño dirigido por estudiantes.</a>. Nuestro enfoque 
              se centra en la creación de productos y experiencias digitales accesibles e inclusivas. 
              En BAZAR, creemos que la diversidad enriquece nuestra labor y que la tecnología debe reflejar
               esa diversidad. Trabajamos con una variedad de <a href="https://upstatement.com/">Clientes</a> para llevar sus ideas al mundo digital.
            </p>

            <p>
            Recientemente, hemos lanzado algunos{' '}
              <a href="https://www.newline.co/courses/build-a-spotify-connected-app">
              proyectos creativos 
              </a>{' '}
              esperamos sean de interés, utilizando tecnologías como D3.js
              &amp; React.
            </p>

            <p>Aquí hay algunas tecnologías con las que hemos estado trabajando recientemente</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
        
          <div className="wrapper">
            
            <StaticImage
              className="img"
              src="../../images/me.jpeg" 
              
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
            <StyledText>
              <div className='superimg'>
                <p className='supertext'>BAZAR</p>
              </div>
            </StyledText>

          </div>
          
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
