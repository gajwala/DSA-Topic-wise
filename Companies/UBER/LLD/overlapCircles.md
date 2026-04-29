```js
import { useRef, useState, useEffect } from "react";

export default function App() {
  const canvasRef = useRef(null);

  // const [circles, setCircles] = useState([
  //   {
  //     id: "left",
  //     width: 0,
  //     height: 0,
  //     startX: 0,
  //     startY: 0,
  //     x: 0,
  //     y: 0,
  //     backgroundColor: "red",
  //   },
  //   {
  //     id: "right",
  //     width: 0,
  //     height: 0,
  //     startX: 0,
  //     startY: 0,
  //     x: 0,
  //     y: 0,
  //     backgroundColor: "red",
  //   },
  // ]);

  const [circles, setCircles] = useState([]);

  const [currentCircleId, setCurrentCircleId] = useState(null);

  function mouseDownHandler(e) {
    const newCircle = {
      id: Date.now(),
      startX: e.clientX,
      startY: e.clientY,
      x: e.clientX,
      y: e.clientY,
      width: 0,
      height: 0,
      backgroundColor: "red",
    };

    setCurrentCircleId(newCircle.id);
    setCircles((prev) => [...prev, newCircle]);
  }

  function mouseMoveHandler(e) {
    if (!currentCircleId) return;

    let updatedCircles = circles.map((circle) => {
      if (circle.id === currentCircleId) {
        const dx = e.clientX - circle.startX;
        const dy = e.clientY - circle.startY;

        const size = Math.max(Math.abs(dx), Math.abs(dy));

        return {
          ...circle,
          width: size,
          height: size,
          x: dx < 0 ? circle.startX - size : circle.startX,
          y: dy < 0 ? circle.startY - size : circle.startY,
        };
      }
      return circle;
    });

    const activeCircle = updatedCircles.find((c) => c.id === currentCircleId);

    // 🔥 check overlap with ALL other circles
    const isOverlapping = updatedCircles.some(
      (circle) =>
        circle.id !== currentCircleId && elementsOverlap(activeCircle, circle)
    );

    updatedCircles = updatedCircles.map((circle) =>
      circle.id === currentCircleId
        ? {
            ...circle,
            backgroundColor: isOverlapping ? "blue" : "red",
          }
        : circle
    );

    setCircles(updatedCircles);
  }

  function onMouseUpHandler() {
    setCurrentCircleId(null);
  }

  function elementsOverlap(a, b) {
    const r1 = a.width / 2;
    const r2 = b.width / 2;

    const dx = a.x + r1 - (b.x + r2);
    const dy = a.y + r1 - (b.y + r2);

    return Math.sqrt(dx * dx + dy * dy) < r1 + r2;
  }

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    circles.forEach((c) => {
      if (!c.width) return;

      const r = c.width / 2;
      ctx.beginPath();
      ctx.arc(c.x + r, c.y + r, r, 0, Math.PI * 2);
      ctx.fillStyle = c.backgroundColor;
      ctx.fill();
    });
  }, [circles]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={mouseDownHandler}
      onMouseMove={mouseMoveHandler}
      onMouseUp={onMouseUpHandler}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}


```
