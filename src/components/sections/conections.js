// import React, { useEffect, useRef } from 'react';
// import styled from 'styled-components';
// import { srConfig } from '@config';
// import sr from '@utils/sr';
// import { usePrefersReducedMotion } from '@hooks';
// import paper, { Point } from 'paper';

// const StyledBannerSection = styled.section`
//   max-width: 1200px;

//   .inner {
//     display: grid;
//     grid-template-columns: 2fr 2fr;
//     grid-gap: 30px;

//     @media (max-width: 768px) {
//       display: block;
//     }
//   }
// `;

// const StyledText = styled.div`
//   ul.skills-list {
//     display: grid;
//     grid-template-columns: repeat(2, minmax(140px, 200px));
//     grid-gap: 0 10px;
//     padding: 0;
//     margin: 20px 0 0 0;
//     overflow: hidden;
//     list-style: none;

//     li {
//       position: relative;
//       margin-bottom: 10px;
//       padding-left: 20px;
//       font-family: var(--font-mono);
//       font-size: var(--fz-xs);

//       &:before {
//         content: '▹';
//         position: absolute;
//         left: 0;
//         color: var(--green);
//         font-size: var(--fz-sm);
//         line-height: 12px;
//       }
//     }
//   }
// `;

// const StyledPic = styled.div`
//   position: relative;
//   max-width: 800px;

//   @media (max-width: 768px) {
//     margin: 50px auto 0;
//     width: 70%;
//   }
// `;

// const Connections = () => {
//     const prefersReducedMotion = usePrefersReducedMotion();
//     const revealContainer = useRef(null);

//     useEffect(() => {
//         if (!prefersReducedMotion) {
//             sr.reveal(revealContainer.current, srConfig());
//         }

//         // Initialize Paper.js
//         paper.setup('paper-canvas');

//         const ballPositions = [[255, 129], [610, 73], [486, 363],
//         [117, 459], [484, 726], [843, 306], [789, 615], [1049, 82],
//         [1292, 428], [1117, 733], [1352, 86], [92, 798]];

//         const handle_len_rate = 2.4;
//         const circlePaths = [];
//         const radius = 50;
//         for (let i = 0, l = ballPositions.length; i < l; i++) {
//             const circlePath = new paper.Path.Circle({
//                 center: ballPositions[i],
//                 radius: 10
//             });
//             circlePaths.push(circlePath);
//         }

//         const largeCircle = new paper.Path.Circle({
//             center: [676, 433],
//             radius: 20
//         });
//         circlePaths.push(largeCircle);

//         const onMouseMove = (event) => {
//             largeCircle.position = event.point;
//             generateConnections(circlePaths);
//         };

//         const connections = new paper.Group();
//         const generateConnections = (paths) => {
//             // Remove the last connection paths:
//             connections.removeChildren();

//             for (let i = 0, l = paths.length; i < l; i++) {
//                 for (let j = i - 1; j >= 0; j--) {
//                     const path = metaball(paths[i], paths[j], 0.5, handle_len_rate, 300);
//                     if (path) {
//                         connections.addChild(path);
//                         path.removeOnMove();
//                     }
//                 }
//             }
//         };

//         generateConnections(circlePaths);

//         // ---------------------------------------------
//         paper.view.onMouseMove = onMouseMove;

//         // Cleanup
//         return () => {
//             paper.view.onMouseMove = null;
//             paper.project.clear();
//             // paper.remove(); // Not needed
//         };
//     }, [prefersReducedMotion]);

//     return (
//         <StyledBannerSection id="connections" ref={revealContainer}>
//             <h2 className="numbered-heading">Connections</h2>
//             <div className="inner">
//                 <StyledText>
//                     <div>
//                         <p>Toda la potencialidad de canvas-sketch para animaciones y otras herramientas</p>
//                         <p>Tecnologías usadas:</p>
//                     </div>
//                     <ul className="skills-list">
//                         <li>Three.js</li>
//                         <li>canvas-sketch</li>
//                         <li>d3.js</li>
//                         <li>p5.js</li>
//                     </ul>
//                 </StyledText>
//                 <StyledPic>
//                     <canvas id="paper-canvas" />
//                 </StyledPic>
//             </div>
//         </StyledBannerSection>
//     );
// };

// const metaball = (ball1, ball2, v, handle_len_rate, maxDistance) => {
//     const center1 = ball1.position;
//     const center2 = ball2.position;
//     const radius1 = ball1.bounds.width / 2;
//     const radius2 = ball2.bounds.width / 2;
//     const pi2 = Math.PI / 2;
//     var d = center1.getDistance(center2);
//     let u1, u2;

//     if (radius1 == 0 || radius2 == 0)
//         return;

//     if (d > maxDistance || d <= Math.abs(radius1 - radius2)) {
//         return;
//     } else if (d < radius1 + radius2) { // case circles are overlapping
//         u1 = Math.acos((radius1 * radius1 + d * d - radius2 * radius2) /
//             (2 * radius1 * d));
//         u2 = Math.acos((radius2 * radius2 + d * d - radius1 * radius1) /
//             (2 * radius2 * d));
//     } else {
//         u1 = 0;
//         u2 = 0;
//     }

//     const angle1 = (center2 - center1).getAngleInRadians();
//     const angle2 = Math.acos((radius1 - radius2) / d);
//     const angle1a = angle1 + u1 + (angle2 - u1) * v;
//     const angle1b = angle1 - u1 - (angle2 - u1) * v;
//     const angle2a = angle1 + Math.PI - u2 - (Math.PI - u2 - angle2) * v;
//     const angle2b = angle1 - Math.PI + u2 + (Math.PI - u2 - angle2) * v;
//     const p1a = center1 + getVector(angle1a, radius1);
//     const p1b = center1 + getVector(angle1b, radius1);
//     const p2a = center2 + getVector(angle2a, radius2);
//     const p2b = center2 + getVector(angle2b, radius2);

//     // define handle length by the distance between
//     // both ends of the curve to draw
//     const totalRadius = (radius1 + radius2);
//     let d2 = Math.min(v * handle_len_rate, (p1a - p2a).length / totalRadius);

//     // case circles are overlapping:
//     d2 *= Math.min(1, d * 2 / (radius1 + radius2));

//     radius1 *= d2;
//     radius2 *= d2;

//     const path = new paper.Path({
//         segments: [p1a, p2a, p2b, p1b],
//         style: ball1.style,
//         closed: true
//     });
//     const segments = path.segments;
//     segments[0].handleOut = getVector(angle1a - pi2, radius1);
//     segments[1].handleIn = getVector(angle2a + pi2, radius2);
//     segments[2].handleOut = getVector(angle2b - pi2, radius2);
//     segments[3].handleIn = getVector(angle1b + pi2, radius1);
//     return path;
// };

// // ------------------------------------------------
// const getVector = (radians, length) => {
//     return new Point({
//         // Convert radians to degrees:
//         angle: radians * 180 / Math.PI,
//         length: length
//     });
// };

// export default Connections;
