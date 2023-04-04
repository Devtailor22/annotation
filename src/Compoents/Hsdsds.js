import React, { useRef, useEffect, useState } from "react";

function Canvas(props) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startCoords, setStartCoords] = useState({ x: null, y: null });
  const [endCoords, setEndCoords] = useState({ x: null, y: null });
  const [rectangles, setRectangles] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
    };
  }, []);

  function startDrawing(event) {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const { offsetX, offsetY } = event.nativeEvent;

    setStartCoords({ x: offsetX, y: offsetY });
    setEndCoords({ x: offsetX, y: offsetY });
  }

  function draw(event) {
    if (!isDrawing) {
      return;
    }

    const canvas = canvasRef.current;
    const { offsetX, offsetY } = event.nativeEvent;

    setEndCoords({ x: offsetX, y: offsetY });
  }

  function stopDrawing(event) {
    setIsDrawing(false);
    setRectangles([...rectangles, { startCoords, endCoords }]);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rectangles.forEach(({ startCoords, endCoords }) => {
      ctx.strokeStyle = props.color;
      ctx.lineWidth = props.lineWidth;
      ctx.strokeRect(
        startCoords.x,
        startCoords.y,
        endCoords.x - startCoords.x,
        endCoords.y - startCoords.y
      );
    });
  }, [rectangles]);

  return (
    <canvas
      ref={canvasRef}
      width={props.width}
      height={props.height}
      style={{ border: "1px solid black" }}
    />
  );
}

export default Canvas;
