import react from "react";
import { Image, Layer, Stage, Rect as Re } from "react-konva";
import { connect } from "react-redux";
import { addAnnotaion, setDragable, setUrl } from "../store/annotationSlice";
import { Canvas as Can } from "./Konva";

function Rect() {}

class Canvas extends react.Component {
  constructor(props) {
    super(props);
    this.reference = react.createRef();
    this.state = {
      rect: {},
      drag: false,
    };
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.drop = this.drop.bind(this);
    this.end = this.end.bind(this);
    this.onload = this.onload.bind(this);
  }
  onload(imageObj, ctx) {
    debugger;
    ctx.canvas.height = imageObj.height;
    ctx.canvas.width = imageObj.width;
    ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      debugger;
      let imageObj = new Image();
      let ctx = this.reference.current.getContext("2d");
      imageObj.src = this.props.url;
      imageObj.onload = this.onload(imageObj, ctx);
      this.setState({
        ...this.state,
        rect: this.props.outerDivRef.current.getBoundingClientRect(),
      });
      ctx.lineWidth = 4;
      ctx.strokeStyle = "red";

      ctx.stroke();
    }
  }

  //   componentDidUpdate(prevProps) {
  //
  //   }
  end(e) {
    e.preventDefault();
  }

  drop(e) {
    e.stopPropagation();
    e.preventDefault();
    let imgs = e.dataTransfer.getData("URL").split("///");
    this.props.setUrl(imgs[0]);
    this.props.setDragable(false);
  }

  mouseDown(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({
      ...this.state,
      drag: true,
      rect: {
        ...this.state.rect,
        startX: e.pageX - e.currentTarget.offsetLeft,
        startY: e.pageY - e.currentTarget.offsetTop,
      },
    });
  }
  mouseUp(e) {
    let stringOfCords = {
      startX: this.state.rect.startX,
      startY: this.state.rect.startY,
      w: this.state.rect.w,
      h: this.state.rect.h,
    };
    this.props.addAnnotaion({ ...stringOfCords });
    //dispatch(addAnnotaion({ ...stringOfCords }));
    e.stopPropagation();
    e.preventDefault();
    //prevData = [...prevData,];
    this.setState({
      ...this.state,
      rect: {
        ...this.state.rect,
        startX: 0,
        startY: 0,
        w: 0,
        h: 0,
      },
      drag: false,
    });
  }
  mouseMove(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.state.drag) {
      debugger;
      let ctx = this.reference.current.getContext("2d");
      this.setState({
        ...this.state,
        rect: {
          ...this.state.rect,
          w: e.pageX - e.currentTarget.offsetLeft - this.state.rect.startX,
          h: e.pageY - e.currentTarget.offsetTop - this.state.rect.startY,
        },
      });
      //console.log("ssadasd", count);
      ctx.clearRect(
        0,
        0,
        this.reference.current.width,
        this.reference.current.height
      );
      this.draw();
      this.drawPrivous();
    }
  }
  draw = () => {
    // console.log("conttttttsss", count);
    let ctx = this.reference.current.getContext("2d");
    ctx.fillStyle = "rgba(255,0,0,0.4)";
    ctx.strokeRect(
      this.state.rect.startX,
      this.state.rect.startY,
      this.state.rect.w,
      this.state.rect.h
    );
    ctx.fillRect(
      this.state.rect.startX,
      this.state.rect.startY,
      this.state.rect.w,
      this.state.rect.h
    );

    ctx.globalCompositeOperation = "destination-over";
  };

  drawPrivous = () => {
    debugger;
    ///console.log("contttttt", this.props.counter);
    // privousData.forEach(data=>)
    let a = this.reference.current.getContext("2d");
    this.props.value.map((data, index) => {
      a.fillStyle = "rgba(255,0,0,0.4)";
      a.strokeRect(data.startX, data.startY, data.w, data.h);
      a.fillRect(data.startX, data.startY, data.w, data.h);
      a.globalCompositeOperation = "destination-over";
    });
  };

  render() {
    return (
      <>
        <canvas
          ref={this.reference}
          id={"canvas"}
          key={1}
          draggable={this.props.dragable}
          position={"absolute"}
          //style={{ zIndex: 1 }}
          style={{
            position: "abosloute",
            top: "0px",
            left: "0px",
            zIndex: 1,
            background: `url(${this.props.url})`,
          }}
          onDrop={(e) => this.drop(e)}
          onDragOver={(e) => this.end(e)}
          onMouseDown={(e) => this.mouseDown(e)}
          onMouseUp={(e) => this.mouseUp(e)}
          onMouseMove={(e) => this.mouseMove(e)}
        />
        <Can />
      </>
    );
  }
}
function mapStateToProps(state) {
  const { value, dragable } = state.counter;
  return {
    value,
    dragable,
  };
}
export default connect(mapStateToProps, { addAnnotaion, setUrl, setDragable })(
  Canvas
);
