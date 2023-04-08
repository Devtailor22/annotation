import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Model from "../Model";
import { handleData } from "../store/crudTableSlice";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { addAnnotaion, setUrl } from "../store/annotationSlice";
import { useNavigate } from "react-router-dom";

const ObjectOfData = {
  id: null,
  firstName: "",
  lastName: "",
  imageSrc: "",
};
const TableComonent = ({ tableHeadCol_enum }) => {
  const navigate = useNavigate();
  const TableArray = useSelector((state) => state.tableCrud.allDataForTable);
  const dispatch = useDispatch();
  const [dataObject, setDataObject] = useState({ ...ObjectOfData });
  const [open, setOpen] = useState(false);
  const [useFor, setUseFor] = useState("Add");
  const ModelHandler = (edit) => {
    setOpen(!open);
    setUseFor(edit ? "Edit" : "Add");
    !edit && setDataObject(ObjectOfData);
  };
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setDataObject({
      ...dataObject,
      [name]: value,
    });
  };

  const clickHandler = () => {
    dispatch(
      handleData([
        ...TableArray,
        {
          ...dataObject,
          id: TableArray.length
            ? Math.max(...TableArray.map((o) => o.id)) + 1
            : 1,
        },
      ])
    );
    ModelHandler();
    setDataObject(ObjectOfData);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const opens = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteHandler = (id) => {
    const tempData = structuredClone(TableArray);
    let delDataIndex = tempData.findIndex((data) => data.id === id);
    tempData.splice(delDataIndex, 1);
    dispatch(handleData([...tempData]));
    handleClose();
  };
  const editDataHandler = (id) => {
    handleClose();
    const tempData = structuredClone(TableArray);
    let upDataIndex = tempData.findIndex((data) => data.id === id);
    setDataObject(tempData[upDataIndex]);
    ModelHandler(true);
  };
  const DrawHandler = (src) => {
    navigate("/Annotaion");
    dispatch(setUrl(src));
  };
  const options = ["delete", "update"];
  return (
    // <div
    //   style={{
    //     width: "67%",
    //     height: "221px",
    //     justifyContent: "center",
    //     display: "flex",
    //     alignItems: "center",
    //     background: "white",
    //   }}
    // >
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          width: "67%",
        }}
      >
        <Button variant="outlined" onClick={() => ModelHandler()}>
          Add Data
        </Button>
      </div>

      <table
        style={{
          height: "30%",
          width: "67%",
          backgroundColor: "white",
          boxShadow: "0px 3px 9px mediumpurple",
        }}
      >
        <thead
          style={{
            backgroundColor: "black",
            color: "white",
            height: "35px",
          }}
        >
          {tableHeadCol_enum.map((data) => {
            return <th>{data}</th>;
          })}
        </thead>
        <tbody>
          {TableArray.map((data, index) => {
            return (
              <tr className="TableBody">
                <td>{data?.id}</td>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.imageSrc}</td>
                <td>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={"long-menu"}
                    aria-expanded={"true"}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  </IconButton>

                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={opens}
                    PaperProps={{
                      style: {
                        height: "79px",
                        width: "auto",
                        overflow: "hidden",
                      },
                    }}
                    onClose={handleClose}
                  >
                    <MenuItem
                      key={"delete"}
                      onClick={() => deleteHandler(data.id)}
                      //selected={option === ""}
                    >
                      {"delete"}
                    </MenuItem>
                    <MenuItem
                      key={"update"}
                      onClick={() => editDataHandler(data.id)}
                      //selected={option === ""}
                      //onClick={handleClose}
                    >
                      {"update"}
                    </MenuItem>
                  </Menu>
                </td>
                <td>
                  <Button
                    variant="contained"
                    onClick={() => DrawHandler(data.imageSrc)}
                  >
                    Start
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Model
        open={open}
        useFor={useFor}
        dataObject={dataObject}
        ModelHandler={ModelHandler}
        inputHandler={inputHandler}
        clickHandler={clickHandler}
      />
      <ToastContainer />
    </>

    // </div>
  );
};

export default TableComonent;
