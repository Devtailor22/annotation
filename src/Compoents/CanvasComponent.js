import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAnnotaion } from "../annotationSlice";

export const Canvas = ({
  reference,
  Url,
  setUrl,
  dragable,
  setDragable,
  canvas,
  setCanvas,
  count,
  outerDivRef,
  //   rect,
  //   setRect,
}) => {
  console.log("cont", count);
  let imageObj;
  let ctx;
  let drag;
  var rect;
  const dispatch = useDispatch();

  useEffect(() => {
    //ref.current.getctx("2d");
    setCanvas(reference.current);
    rect = outerDivRef.current.getBoundingClientRect();

    init();
  }, [Url]);
  function init() {
    imageObj = new Image();
    let ctx = reference.current.getContext("2d");
    imageObj.onload = function () {
      ctx.canvas.height = this.height >= 618 ? ctx.canvas.height : this.height;
      ctx.canvas.width = this.width >= 1020 ? ctx.canvas.width : this.width;
      ctx.drawImage(
        imageObj,
        0,
        0,
        this.width >= 1020 ? ctx.canvas.width : this.width,
        this.height >= 618 ? ctx.canvas.height : this.height
      );
      ctx.lineWidth = 4;
      ctx.strokeStyle = "red";

      ctx.stroke();
    };
    imageObj.src = Url;
    if (canvas) {
      reference.current.addEventListener("mousedown", mouseDown, false);
      reference.current.addEventListener("mouseup", mouseUp, false);
      reference.current.addEventListener("mousemove", mouseMove, false);
    }
  }
  function end(e) {
    e.preventDefault();
  }

  function drop(e) {
    e.stopPropagation();
    e.preventDefault();
    let imgs = e.dataTransfer.getData("URL").split("///");
    setUrl(imgs[0]);
    setDragable(false);
  }
  function mouseDown(e) {
    e.stopPropagation();
    e.preventDefault();
    rect.startX = e.pageX - this.offsetLeft;
    rect.startY = e.pageY - this.offsetTop;
    drag = true;
  }
  function mouseUp(e) {
    let stringOfCords = {
      startX: rect.startX,
      startY: rect.startY,
      w: rect.w,
      h: rect.h,
    };
    drag = false;
    dispatch(addAnnotaion({ ...stringOfCords }));
    e.stopPropagation();
    e.preventDefault();
    //prevData = [...prevData,];
    rect.w = 0;
    rect.h = 0;
    rect.startX = 0;
    rect.startY = 0;
  }
  function mouseMove(e) {
    e.stopPropagation();
    e.preventDefault();
    if (drag) {
      let ctx = reference.current.getContext("2d");

      rect.w = e.pageX - this.offsetLeft - rect.startX;
      rect.h = e.pageY - this.offsetTop - rect.startY;
      console.log("ssadasd", count);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawPrivous();
      draw();
    }
  }
  function draw() {
    console.log("conttttttsss", count);
    let ctx = reference.current.getContext("2d");
    ctx.fillStyle = "rgba(255,0,0,0.4)";
    ctx.strokeRect(rect.startX, rect.startY, rect.w, rect.h);
    ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
  }

  function drawPrivous() {
    console.log("contttttt", count);
    // privousData.forEach(data=>)
    let a = reference.current.getContext("2d");
    count.map((data, index) => {
      a.fillStyle = "rgba(255,0,0,0.4)";
      a.strokeRect(data.startX, data.startY, data.w, data.h);
      a.fillRect(data.startX, data.startY, data.w, data.h);
      a.key = index;
    });
  }

  return (
    <canvas
      ref={reference}
      key={1}
      id={"canvas"}
      draggable={dragable}
      position={"absolute"}
      //style={{ zIndex: 1 }}
      style={{
        position: "abosloute",
        top: "0px",
        left: "0px",
        zIndex: 1,
        background: `url(${Url})`,
      }}
      onDrop={(e) => drop(e)}
      onDragOver={(e) => end(e)}
    />
  );
};
