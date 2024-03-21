import React, { useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';
import { IconLoader } from '@components/icons';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--navy);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 400px;
    transition: var(--transition);
    opacity: ${props => (props.isMounted ? 1 : 0)};
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;
      opacity: 1;
      
      }
      svg path{
        fill: var(--navy);        
      }
      svg .st1{
        fill: var(--navy);
      }
      svg .st0{
        fill: var(--green);
      }
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);
 

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader
      .add({
        targets: '#fondo',
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeInOutQuad',
        delay: (d, i) => 150 * i + 500,
        
        // strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: '#alaIzquierda path',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInOutQuad',
        delay: anime.stagger(100)
      })
      .add({
        targets: '#alaDerecha path',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInOutQuad',
        delay: anime.stagger(100)
      })
      .add({
        targets: '#abdomenIzquierdo',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInOutQuad',
        delay: anime.stagger(100)
      })
      .add({
        targets: '#abdomenDerecho',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInOutQuad',
        delay: anime.stagger(100)
      })
      .add({
        targets: '#espiraculo circle',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeInOutQuad',
        delay: anime.stagger(100)
      })
      .add({
        targets: ['#fondo', '#alaIzquierda path', '#alaDerecha path', '#abdomenIzquierdo', '#abdomenDerecho', '#espiraculo circle'],
        opacity: 0,
        duration: 400,
        easing: 'easeInOutQuad',
        delay: 500 // Ajusta este retraso según tu preferencia
      });
  };

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10);
    animate();
 
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledLoader className="loader" isMounted={isMounted} >
      <Helmet bodyAttributes={{ class: `hidden` }} />
  
      <div className="logo-wrapper">
        <IconLoader />
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
