import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/system";
import { Children, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./Sidebar";
import TableComonent from "./TableComponent";
//import SwipeableTemporaryDrawer from "./Sidebar";
const tableHeadCol_enum = [
  "Id",
  "First Name",
  "Last Name",
  "Image",
  "Action",
  "WorkArea",
];
function Main({ children }) {
  const [sideBarToggler, setSideBarToggler] = useState(false);
  return (
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: " space-between",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Header
          sideBarToggler={sideBarToggler}
          setSideBarToggler={setSideBarToggler}
        />
        <Box
          style={{
            backgroundColor: "lightgray",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <SideBar sideBarToggler={sideBarToggler} />
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default Main;
