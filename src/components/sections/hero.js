import React, { useState, useEffect ,useRef} from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled ,{keyframes} from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { StaticImage } from 'gatsby-plugin-image';
import PixelatedBackground from '../sections/pixelatedBackground';
const StyledHeroSection = styled.section`
  
  display: grid;
  grid-template-columns:1fr 4fr 1fr;
  margin:50px 0 0 0;
  padding:0;
  @media (max-width: 1080px) {
    grid-template-columns:1fr;
  }
  @media (max-width: 768px) {
    
  }
  .pixel-init{
    // background-color:red;
    // padding:20px 20px;
    display:flex;
    align-self: start;
    justify-content:start;   
  }
  .pixel-end{
    // background-color:red;
    
    display:flex;
    align-self: end; 
    justify-content:left; 
    transform: rotate(180deg); 
    // transform-origin: center;
  }
   .Center{
    ${({ theme }) => theme.mixins.flexCenter};
    flex-direction: column;
    // background-color:blue;
    align-items: space-between;
    min-height: 90vh;
    height: 90vh;
    
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
    @media (max-width: 480px) {
      font-size: 82px;      
    }    
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
    font-size:1.2em;
  
  }

  
  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
    font-size:14px;
  }
   }

`;

const PixelCont = styled.div`

position: relative;
// width: 100px;
// height: 300px;

`;


const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const pixelContRef = useRef(null);

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
      <div>GitHub!</div>
    </a>

  );
  const pixel = (
    <PixelCont ref={pixelContRef}>
      <PixelatedBackground 
      width={pixelContRef.current ? pixelContRef.current.offsetWidth : 0} 
      height={pixelContRef.current ? pixelContRef.current.offsetHeight : 0}
      hexColor="#050505" />
    </PixelCont>
  );



  const items = [one, two, three, four, five];

  return (

    <StyledHeroSection>
      <div className='pixel-init'>
        {prefersReducedMotion ? (
          <div>{pixel}</div>
        ) : (
          <TransitionGroup>
            {isMounted && (
              <CSSTransition classNames="fadeup" timeout={loaderDelay}>
                <div>{pixel}</div>
              </CSSTransition>
            )
            }
          </TransitionGroup>
        )}
      </div>
      <div className='Center'>

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

      </div>
      <div className='pixel-end'>
        {prefersReducedMotion ? (
          <>
            <div>{pixel}</div>
          </>

        ) : (

          <TransitionGroup component={null}>
            {isMounted && (
              <CSSTransition classNames="fadeup" timeout={loaderDelay}>
                <div>{pixel}</div>
              </CSSTransition>
            )
            }
          </TransitionGroup>
        )}
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
