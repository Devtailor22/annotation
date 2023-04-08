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
const URLImage = ({ image, stageZoom }) => {
  return (
    <Img
      style={{ zIndex: -1 }}
      image={image}
      scaleX={stageZoom.stageScale}
      scaleY={stageZoom.stageScale}
      x={stageZoom.stageX}
      y={stageZoom.stageY}

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
  const [stageZoom, setStageZoom] = React.useState({});
  const mouseDown = (e) => {
    debugger;
    a = true;
    let pos = getRelativePointerPosition(e);
    setRect({
      ...rect,
      x: pos.x,
      y: pos.y,
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
      width: rect.x - e.evt.pageX - e.evt.currentTarget.offsetLeft,
      height: rect.y - e.evt.pageY - e.evt.currentTarget.offsetTop,
    });
  };

  React.useEffect(() => {
    imageObj.src = url;
    imageObj.onload = () => {
      debugger;
    };
  }, [url]);

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const scaleBy = 1.2;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    debugger;
    const mousePointTo = {
      x: stage.pointerPos.x / oldScale - stage.x() / oldScale,
      y: stage.pointerPos.y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setStageZoom({
      stageScale: newScale,
      stageX: -(mousePointTo.x - stage.pointerPos.x / newScale) * newScale,
      stageY: -(mousePointTo.y - stage.pointerPos.y / newScale) * newScale,
    });
    stage.position({
      stageX: -(mousePointTo.x - stage.pointerPos.x / newScale) * newScale,
      stageY: -(mousePointTo.y - stage.pointerPos.y / newScale) * newScale,
    });
  };
  function getRelativePointerPosition(node) {
    debugger;
    // the function will return pointer position relative to the passed node
    var transform = node.target.getAbsoluteTransform().copy();
    // to detect relative position we need to invert transform
    transform.invert();

    // get pointer (say mouse or touch) position
    var pos = node.target.getStage().getPointerPosition();

    // now we find relative point
    return transform.point(pos);
  }
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
      onWheel={(e) => handleWheel(e)}
      scaleX={stageZoom.stageScale}
      scaleY={stageZoom.stageScale}
      x={stageZoom.stageX}
      y={stageZoom.stageY}
    >
      <Layer>
        <URLImage image={img} stageZoom={stageZoom} />
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
