import { styled } from "@material-ui/core";

export const Container = styled("div")(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexWrap: "wrap",
  backgroundColor: `${theme.palette.white}`,
}));

export const LeftBlock = styled("div")({
  backgroundColor: "#19233c",
  flex: "1 1 50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

export const RightBlock = styled("div")({
  flex: "1 1 50%",
  backgroundColor: "white",
});

export const Logo = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: "center",
}));

