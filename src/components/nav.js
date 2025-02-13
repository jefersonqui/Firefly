import React, { useState, useEffect,useRef } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { navLinks, navLinksComplement } from '@config';
import { loaderDelay } from '@utils';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';
import { Menu } from '@components';
import { IconLogo, IconHex } from '@components/icons';



const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 10px;
  width: 100%;
  height: 50px;
  background-image: ${({ backgroundImage }) => (backgroundImage ? `url(${backgroundImage})` : 'none')};

  background-color: var(--header);
  opacity: 0.8;
  
  
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  backdrop-filter: blur(20px);
  transition: var(--transition);

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${props =>
    props.scrollDirection === 'up' &&
    !props.scrolledToTop &&
    css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: var(--header);
        opacity: 0.5;
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};

    ${props =>
    props.scrollDirection === 'down' &&
    !props.scrolledToTop &&
    css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: #040303;//var(--lightest-slate);
  font-family: var(--font-mono);
  // counter-reset: item 0;
  z-index: 12;

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};

    a {
      color: var(--green);
      width: 48px;
      height: 48px;
      position: relative;
      z-index: 1;
      

      .hex-container {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        @media (prefers-reduced-motion: no-preference) {
          transition: var(--transition);
        }
      }

      .logo-container {
        position: relative;
        z-index: 1;
        svg {
          fill: none;
          user-select: none;
          @media (prefers-reduced-motion: no-preference) {
            transition: var(--transition);
          }
          circle {
            fill: var(--navy);
          }
        }
        svg path{
          fill: currentColor;
        }
      }

      &:hover,
      &:focus {
        outline: 0;
        transform: translate(-4px, -4px);
        .hex-container {
          transform: translate(3px, 3px);
        }
      }
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
  .olLink{
   
    margin-left:150px;
    @media (max-width: 1080px) {
      margin-left:50px;
    }
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      // counter-increment: item 1;
      font-size: var(--fz-xs);

      a {
        padding: 10px;
        &:before {
          // content: '0' counter(item) '.';
          margin-right: 5px;
          color: var(--green);
          font-size: var(--fz-xxs);
          text-align: right;
        }
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-xs);
  }
`;

const Nav = ({ isHome}) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();


  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timeout = isHome ? loaderDelay : 0;
  const fadeClass = isHome ? 'fade' : '';
  const fadeDownClass = isHome ? 'fadedown' : '';

  const Logo = (
    <div className="logo" tabIndex="-1">
      {isHome ? (
        <a href="/" aria-label="home">
          <div className="hex-container">
            <IconHex />
          </div>
          <div className="logo-container">
            <IconLogo />
          </div>
        </a>
      ) : (
        <Link to="/" aria-label="home">
          <div className="hex-container">
            <IconHex />
          </div>
          <div className="logo-container">
            <IconLogo />
          </div>
        </Link>
      )}
    </div>
  );

  const ResumeLink = (
    <a className="resume-button" href="#" target="_blank" rel="noopener noreferrer">
      Login
    </a>
  );

  return (
    <StyledHeader 
    scrollDirection={scrollDirection} 
    scrolledToTop={scrolledToTop}
    
   >
  
      <StyledNav>
     
        {prefersReducedMotion ? (
          <>
            {Logo}

            <StyledLinks>
              <div className='olLink'>
                <ol>
                  {navLinks &&
                    navLinks.map(({ url, name }, i) => (
                      <li key={i}>
                        <Link to={url}>{name}</Link>
                      </li>
                    ))}
                </ol>
              </div>
              <div className='olLink'>
                <ol>
                  {navLinksComplement &&
                    navLinksComplement.map(({ url, name }, i) => (
                      <li key={i}>
                        <Link to={url}>{name}</Link>
                      </li>
                    ))}
                </ol>
              </div>
              <div>{ResumeLink}</div>
              
            </StyledLinks>

            <Menu />
          </>
        ) : (
          <>
            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeClass} timeout={timeout}>
                  <>{Logo}</>
                </CSSTransition>
              )}
            </TransitionGroup>

            <StyledLinks>
              <div className='olLink'>
                <ol>
                  <TransitionGroup component={null}>
                    {isMounted &&
                      navLinks &&
                      navLinks.map(({ url, name }, i) => (
                        <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                          <li key={i} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                            <Link to={url}>{name}</Link>
                          </li>
                        </CSSTransition>
                      ))}
                  </TransitionGroup>
                </ol>
              </div>
            </StyledLinks>

            <StyledLinks>
              
                <ol>
                  <TransitionGroup component={null}>
                    {isMounted &&
                      navLinksComplement &&
                      navLinksComplement.map(({ url, name }, i) => (
                        <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                          <li key={i} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                            <Link to={url}>{name}</Link>
                          </li>
                        </CSSTransition>
                      ))}
                  </TransitionGroup>
                </ol>
              
              <TransitionGroup component={null}>
                {isMounted && (
                  <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                    <div style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                      {ResumeLink}
                    </div>
                  </CSSTransition>
                )}
              </TransitionGroup>
            </StyledLinks>
            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeClass} timeout={timeout}>
                  <Menu />
                </CSSTransition>
              )}
            </TransitionGroup>
          </>
        )}
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
