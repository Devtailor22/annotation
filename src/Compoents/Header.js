import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "@mui/material";

function Header({ setSideBarToggler, sideBarToggler }) {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        height: "70px",
        alignItems: "center",
        fontSize: "18px",
        fontWeight: 600,
        background: " linear-gradient(to left, #553c9a, #b393d3)",
        backgroundColor: "#b393d3",
        boxShadow: " -2px 10px 10px gray",
        zIndex: 1,
      }}
    >
      <Box
        style={{
          position: "absolute",
          left: "10px",
        }}
      >
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => setSideBarToggler(!sideBarToggler)}
        />
      </Box>
      Header
    </Box>
  );
}
export default Header;
