import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

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
  max-width: 800px; //////////estaba en 300
  
  

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
    // &:before,
    // &:after {
    //   content: '';
    //   display: block;
    //   position: absolute;
    //   width: 100%;
    //   height: 100%;
    //   border-radius: var(--border-radius);
    //   transition: var(--transition);
    // }

    // &:before {
    //   top: 0;
    //   left: 0;
    //   background-color: var(--navy);
    //   mix-blend-mode: screen;
    // }

    // &:after {
    //   border: 2px solid var(--green);
    //   top: 14px;
    //   left: 14px;
    //   z-index: -1;
    // }
  }
`;
  const Banner = () => {
    const revealContainer = useRef(null);
    const prefersReducedMotion = usePrefersReducedMotion();
    

    useEffect(() => {
        if (prefersReducedMotion) {
            return;
        }

        const width_ = window.innerWidth, height_ = window.innerHeight;
        
        const camera = new THREE.PerspectiveCamera(70, width_ / height_, 0.01, 10);
        camera.position.z = 1;
        camera.position.y = 1;
        camera.position.x = 1;
        camera.lookAt(0,0,0);

        const scene = new THREE.Scene();

        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshNormalMaterial();
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width_, height_);
        
        const animation = (time) => {
            mesh.rotation.x = time / 2000;
            mesh.rotation.y = time / 1000;
            renderer.render(scene, camera);
        };

        renderer.setAnimationLoop(animation);

        const wrapper = document.querySelector('.wrapper');
        

        const handleResize = () => {
            const width = wrapper.clientWidth;
            const height = wrapper.clientHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', handleResize);
        wrapper.appendChild(renderer.domElement);
        const controls = new OrbitControls(camera,renderer.domElement);
        
        controls.enableZoom = true;
        controls.enablePan = true;
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        setTimeout(handleResize, 100);

        return () => {
            scene.remove(mesh);
            renderer.dispose();
            window.removeEventListener('resize', handleResize);
            wrapper.removeChild(renderer.domElement);
            controls.dispose();
        };
    }, []);

    const skills = ['Three.js', 'React'];

    return (
        <StyledBannerSection id="about" ref={revealContainer}>
            <h2 className="numbered-heading">Animation</h2>
            <div className="inner">
                <StyledText>
                    <div>
                        <p>
                            Nos especializamos en el desarrollo web, manipulación
                            y visualización de datos, así como diseño y modelado 3D.
                        </p>
                        <p>Tecnologías usadas:</p>
                    </div>
                    <ul className="skills-list">
                        {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
                    </ul>
                </StyledText>
                <StyledPic>
                    <div className="wrapper"></div>
                </StyledPic>
            </div>
        </StyledBannerSection>
    );
};

export default Banner;
