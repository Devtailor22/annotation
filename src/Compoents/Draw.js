import styled from "@emotion/styled";
import { Button, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { Layer, Stage } from "react-konva";
import { Canvas } from "../Compoents/Konva";
import { setDragable, setUrl } from "../store/annotationSlice";
import { useDispatch } from "react-redux";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#031927",
  padding: "2px",
  textAlign: "center",
  color: "White",
  height: "99vh",
  borderRadius: "0px",
  //boxShadow: "rgb(0 0 0) 0px 7px 29px 0px",
}));

function Draw({ outerDivRef, Url }) {
  const dispatch = useDispatch();
  const end = (e) => {
    e.preventDefault();
  };

  const drop = (e) => {
    e.stopPropagation();
    e.preventDefault();
    let imgs = e.dataTransfer.getData("URL").split("///");
    dispatch(setUrl(imgs[0]));
    dispatch(setDragable(false));
  };
  return (
    <Grid container>
      <Grid item xs={1} md={1}>
        <Item>
          <Box
            sx={{
              position: "relative",
              top: "50%",
            }}
          >
            toolBar
          </Box>
        </Item>
      </Grid>
      <Grid item xs={9} md={9}>
        <Item
          ref={outerDivRef}
          style={{
            backgroundColor: "lightgray",
            color: "Black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onDrop={(e) => drop(e)}
          onDragOver={(e) => end(e)}
        >
          <Canvas outerDivRef={outerDivRef} />
        </Item>
      </Grid>
      <Grid item xs={2} md={2}>
        <Item>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <Box
              sx={{
                // width: "50%",
                height: "20%",
                border: "2px solid blue ",
                position: "relative",
                //borderRadius: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={Url}
                alt="preview image"
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "row",
                gap: "0px",
              }}
            >
              <Box>
                <Button variant="contained">Cancel</Button>
              </Box>
              <Box>
                <Button variant="contained">Save</Button>
              </Box>
            </Box>
          </Box>
        </Item>
      </Grid>
    </Grid>
  );
}
export default Draw;
