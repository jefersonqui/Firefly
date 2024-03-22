import React, { useEffect, useRef, useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
// @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

const StyledAboutSection = styled.section`
  max-width: 1400px;  

  .inner {
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    grid-gap: 30px;
    

    @media (max-width: 768px) {
      display: block;
    }
    @media (max-width: 1080px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(140px, 200px));
    grid-gap: 0 50px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;
    @media (max-width: 1080px) {
      grid-template-columns: repeat(3, minmax(140px, 200px));
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, minmax(150px, 100px));
    }

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
  display: grid;
  grid-template-rows: 2fr .5fr;
  grid-gap:10px;
  position: relative;
  max-width: 800px; 

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 100%;
  }


  .wrapper {
    border: 2px solid red;
    ${({ theme }) => theme.mixins.boxShadow};
    display: flex;
    position: relative;
    // width: 100%;
    border-radius: var(--border-radius);
    // background-color: var(--green);


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
      left: 0;
      margin:0;
      right: 0;
      top: 0;
      max-width: none;
      width:100%;
      
      
      
    }
    ///////////////////
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
      display:flex;
      font-weight: 600;
      color: var(--lightest-slate);
      
      font-family: "Bungee";
      opacity: 0.1;
      // @media (max-width: 1080px) {
      //   font-size: 30px;
      //   margin: 0 auto;
      // }
      // @media (max-width: 768px) {
      //   font-size: 30px;
      // }
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
  .carousel-f{
    margin-top:20px;
    padding: 10px;
    border: 2px solid red;
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

  const [sliderIndex, setSliderIndex] = useState(0);
  const images = ['../../images/m1.gif', 
  '../../images/m2.png', 
  '../../images/m3.gif'];
  const nextSlide = () => {
    if (sliderIndex === images.length - 1) {
      setSliderIndex(0);
    } else {
      setSliderIndex(sliderIndex + 1);
    }
  };

  const prevSlide = () => {
    if (sliderIndex === 0) {
      setSliderIndex(images.length - 1);
    } else {
      setSliderIndex(sliderIndex - 1);
    }
  };


  const skills = ['JavaScript (ES6+)', 'Python', 'React', 'Autocad', 'Blender', 'Matlab'];


  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About</h2>

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
              src={images[sliderIndex]}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
            <StyledText>
              <div className='superimg'>
                <p className='supertext'>FIREFL-Y</p>

              </div>
            </StyledText>

          </div>
          <div className='carousel-f'>
            <button onClick={prevSlide}>Anterior</button>
            <button onClick={nextSlide}>Siguiente</button>
          </div>

        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
