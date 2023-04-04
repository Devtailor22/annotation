import React, { Component, useEffect, useState } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Image as Img } from "react-konva";
import logo from "../assets/logo512.png";
import useImage from "use-image";
import { useDispatch, useSelector } from "react-redux";
import { addAnnotaion, setDragable, setUrl } from "../store/annotationSlice";
import { useRef } from "react";
let a = false;

const ThemedRect = ({ data }) => {
  return (
    <Rect
      x={data.x}
      y={data.y}
      width={data.width}
      height={data.height}
      fill={"rgba(255,0,0,0.4)"}
      stroke={"red"}
      strokeWidth={4}
    />
  );
};
const URLImage = ({ image }) => {
  return (
    <Img
      style={{ zIndex: -1 }}
      image={image}

      // I will use offset to set origin to the center of the image
    />
  );
};
export const Canvas = ({ outerDivRef }) => {
  const { value, dragable, url } = useSelector((state) => state.counter);
  let imageObj = new Image();
  //const [image] = React.useState();
  const [img] = useImage(url);
  const stage = useRef();
  const dispatch = useDispatch();
  const [rect, setRect] = React.useState({ x: 0, y: 0, width: 0, height: 0 });
  const mouseDown = (e) => {
    a = true;
    setRect({
      ...rect,
      x: e.evt.pageX - e.evt.currentTarget.offsetLeft,
      y: e.evt.pageY - e.evt.currentTarget.offsetTop,
    });
  };
  const mouseUp = () => {
    a = false;

    dispatch(addAnnotaion({ ...rect }));
    setRect({ x: 0, y: 0, width: 0, height: 0 });
  };
  const mouseMove = (e) => {
    if (!a) return;
    setRect({
      ...rect,
      width: e.evt.pageX - e.evt.currentTarget.offsetLeft - rect.x,
      height: e.evt.pageY - e.evt.currentTarget.offsetTop - rect.y,
    });
  };

  React.useEffect(() => {
    imageObj.src = url;
    imageObj.onload = () => {
      debugger;
    };
  }, [url]);
  return (
    <Stage
      draggable={dragable}
      ref={stage}
      height={
        img?.height > outerDivRef.height ? outerDivRef.height : img?.height
      }
      width={img?.width > outerDivRef.width ? outerDivRef.width : img?.width}
      onMouseDown={(e) => mouseDown(e)}
      onMouseUp={(e) => mouseUp(e)}
      onMouseMove={(e) => mouseMove(e)}
    >
      <Layer>
        <URLImage image={img} />
        <Rect
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          fill={"rgba(255,0,0,0.4)"}
          stroke={"red"}
          strokeWidth={4}
        />

        {value.map((data) => {
          return <ThemedRect data={data} />;
        })}
      </Layer>
    </Stage>
  );
};
