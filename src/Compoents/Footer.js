import { Box } from "@mui/material";

function Footer() {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        height: "30px",
        alignItems: "center",
        fontSize: "14px",
        color: "white",
        background:
          "linear-gradient(to left, hsl(0deg 9.43% 14.39%), rgb(75 58 90)) rgb(0 0 0)",
        fontFamily: "monospace",
      }}
    >
      copyRight @ 2023 dev,Inc
    </Box>
  );
}
export default Footer;
