import { Box } from "@mui/system";
import { Link, Outlet } from "react-router-dom";

const sideBar_Enum = [
  { display: "Home", path: "/" },
  { display: "Annotaion", path: "/Annotaion" },
  { display: "About Me", path: "/About" },
  { display: "Side Project's", path: "/SidePro" },
];

const Items = ({ value, path }) => {
  return (
    <Box
      sx={{
        height: "35px",
        width: "158px",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        fontFamily: "monospace",
        fontSize: "16px",
      }}
    >
      <Link
        to={path}
        style={{
          color: "white",
          textDecoration: "none",
        }}
      >
        {value}
      </Link>
    </Box>
  );
};

function SideBar({ sideBarToggler }) {
  return (
    <>
      <div
        style={{
          backgroundColor: "black",
          height: "100%",
          position: "absolute",
          left: "0px",
          zIndex: 2,
          width: sideBarToggler ? "170px" : "0%",
          transition: "all .5s",
          overflow: "hidden",
          background:
            "linear-gradient(337deg, rgb(106, 13, 173), rgb(9, 31, 52))",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          /* font-style: unset; */
          fontFamily: "sans-serif",
          fontWeight: "100",
          flexDirection: "column",
          gap: "25px",
        }}
      >
          {sideBar_Enum.map((data) => {
            return <Items value={data.display} path={data.path} />;
          })}
      </div>
      <Outlet />
    </>
  );
}
export default SideBar;
