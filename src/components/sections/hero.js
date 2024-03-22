import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { StaticImage } from 'gatsby-plugin-image';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  
    flex-direction: column;
    align-items: space-between;
    min-height: 100vh;
    height: 100vh;
     
     
  
  
  

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: "Cutive Mono", monospace;
    font-size: 20px;//clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;
    
    // padding:10% 0 5% 0; 
    

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }
  h2{
    text-align: center;
    font-size: 102px;
    font-family:  "Bebas Neue", sans-serif;
    font-optical-sizing: auto;
    font-weight:200;
    letter-spacing: 0.18em;
    
  }


  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
    font-size:45px;
    font-family:"Bebas Neue", sans-serif;
    letter-spacing: 0.11em;
    
    
  }

  p {
    margin: 20px 0 0;
    max-width: 100%;
    font-size:1.3em;
    // font-family:"Cutive Mono", monospace;
    // text-align:justify;
    
    
  }
  


  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    font-size:14px;
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

  const one = <h1>¡Hello and Welcome!</h1>;
  const two = <h2 className="big-heading"> Firefl-y </h2>;
  const three = <h3 className="big-heading"> Lighting the path to visual clarity</h3>;
  const four = (
    <>
      <p>
      "We create exceptional digital experiences that blend functionality, aesthetics, and innovation"{'  '}
        <a href="#" target="_blank" rel="noreferrer">
          Firefl-y
        </a>
        .
      </p>

    </>
  );
  const five = (

    <a
      className="email-link"
      href="https://github.com/jefersonqui"
      target="_blank"
      rel="noreferrer">
      GitHub!
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
                <div className='items-div' key={i}>{item}</div>

              ))}
            </>

          ) : (

            <TransitionGroup component={null}>
              {isMounted &&
                items.map((item, i) => (
                  <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                    <div style={{ transitionDelay: `${i + 2}00ms` }}>{item}</div>
                  </CSSTransition>
                ))}
            </TransitionGroup>
          )}


    </StyledHeroSection>
  );
};

export default Hero;
