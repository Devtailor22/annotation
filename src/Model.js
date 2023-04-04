import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

export default function Model({
  open,
  ModelHandler,
  useFor,
  dataObject,
  inputHandler,
  clickHandler,
}) {
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={ModelHandler}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            {useFor} Data
          </Typography>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "22px",
            }}
          >
            <TextField
              id="standard-basic"
              label="Firstname"
              variant="standard"
              name="firstName"
              value={dataObject.firstName}
              onChange={(e) => inputHandler(e)}
            />
            <TextField
              id="standard-basic"
              label="Lastname"
              variant="standard"
              name="lastName"
              value={dataObject.lastName}
              onChange={(e) => inputHandler(e)}
            />
            <input
              type={"file"}
              name="imageSrc"
              value={dataObject.imageSrc}
              onChange={(e) => inputHandler(e)}
            />
            <Button variant="contained" onClick={() => clickHandler()}>
              {useFor}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
