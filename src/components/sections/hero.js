import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: space-between;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;
    

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }
  h2{
    font-size: 82px;
    // font-family:"helvetica";
    
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
    font-size:50px;
  }

  p {
    margin: 20px 0 0;
    max-width: 740px;
    font-size:1.1em;
    text-align:justify;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>¡Hola y bienvenidos!</h1>;
  const two = <h2 className="big-heading">BAZAR</h2>;
  const three = <h3 className="big-heading">Desarrollo de experiencias digitales para la web.</h3>;
  const four = (
    <>
      <p>
      Creamos experiencias digitales excepcionales que combinan funcionalidad, estética e innovación.{'  '}
        <a href="https://upstatement.com/" target="_blank" rel="noreferrer">
          Sinergy
        </a>
        .
      </p>

    </>
  );
  const five = (
    
    <a
      className="email-link"
      href="https://www.newline.co/courses/build-a-spotify-connected-app"
      target="_blank"
      rel="noreferrer">
      Visita el Blog!
    </a>
    
  );
  //  const six = (
  //   <div className='containerquiguart'>
  //     <p className='textquiguarth'>Quiguarth</p>
  //   </div>
  // );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
