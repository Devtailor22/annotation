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
      strokeScaleEnabled={false}
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
    //let pos = e.target.getRelativePointerPosition();
    let pos = getRelativePointerPosition(e.target.getStage());
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
    let pos = getRelativePointerPosition(e.target.getStage());
    setRect({
      ...rect,
      width: pos.x - rect.x,
      height: pos.y - rect.y,
    });
  };

  React.useEffect(() => {
    imageObj.src = url;
    imageObj.onload = () => {
      debugger;
    };
  }, [url]);

  function getRelativePointerPosition(node) {
    // the function will return pointer position relative to the passed node
    const transform = node.getAbsoluteTransform().copy();
    // to detect relative position we need to invert transform
    transform.invert();

    // get pointer (say mouse or touch) position
    const pos = node.getStage().getPointerPosition();

    // now we find relative point
    debugger;
    return transform.point(pos);
  }

  function zoomStage(stage, scaleBy, event) {
    debugger;
    const oldScale = stage.scaleX();
    var pointer = stage.getPointerPosition();

    // const pos = {
    //   x: stage.width() / 2,
    //   y: stage.height() / 2,
    // };
    var mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = Math.max(
      0.05,
      event.evt.wheelDelta > 0 ? oldScale * scaleBy : oldScale / scaleBy
    );

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    const newAttrs = limitAttributes(stage, { ...newPos, scale: newScale });

    stage.to({
      x: newAttrs.x,
      y: newAttrs.y,
      scaleX: newAttrs.scale,
      scaleY: newAttrs.scale,
      duration: 0.1,
    });
  }
  function limitAttributes(stage, newAttrs) {
    const box = stage.findOne("Image").getClientRect();
    const minX = -box.width + stage.width() / 2;
    const maxX = stage.width() / 2;

    const x = Math.max(minX, Math.min(newAttrs.x, maxX));

    const minY = -box.height + stage.height() / 2;
    const maxY = stage.height() / 2;

    const y = Math.max(minY, Math.min(newAttrs.y, maxY));

    const scale = Math.max(0.05, newAttrs.scale);

    return { x, y, scale };
  }
  return (
    <Stage
      draggable={dragable}
      ref={stage}
      height={img?.height}
      width={img?.width}
      onMouseDown={(e) => mouseDown(e)}
      onMouseUp={(e) => mouseUp(e)}
      onMouseMove={(e) => mouseMove(e)}
      onWheel={(e) => zoomStage(stage.current, 2.0, e)}
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
          strokeScaleEnabled={false}
        />

        {value.map((data) => {
          return <ThemedRect data={data} />;
        })}
      </Layer>
    </Stage>
  );
};
