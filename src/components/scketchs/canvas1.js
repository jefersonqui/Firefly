import React, { useRef, useEffect } from 'react';
import canvasSketch from 'canvas-sketch';
import { noise2D } from 'canvas-sketch-util/random';
import { mapRange } from 'canvas-sketch-util/math';

const Canvas1 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const settings = {
      dimensions: [1080, 1080],
      animate: true
    };

    const sketch = () => {
      return ({ context, width, height, frame }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        const cols = 10;
        const rows = 10;
        const numCells = cols * rows;

        const gridw = width * 0.8;
        const gridh = height * 0.8;
        const cellw = gridw / cols;
        const cellh = gridh / rows;
        const margx = (width - gridw) * 0.5;
        const margy = (height - gridh) * 0.5;

        for (let i = 0; i < numCells; i++) {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = col * cellw;
          const y = row * cellh;
          const w = cellw * 0.8;
          const h = cellh * 0.8;

          const n = noise2D(x + frame * 20, y, 0.001);
          const angle = n * Math.PI * 0.2;
          const scale = mapRange(n, -1, 1, 1, 30);

          context.save();
          context.translate(x, y);
          context.translate(margx, margy);
          context.translate(cellw * 0.5, cellh * 0.5);
          context.rotate(angle);
          context.lineWidth = scale;

          context.beginPath();
          context.moveTo(w * -0.5, 0);
          context.lineTo(w * 0.5, 0);
          context.stroke();
          context.restore();
        }
      };
    };

    const { draw } = canvasSketch(sketch, settings);

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      draw();
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Canvas1;
