import { styled } from "@material-ui/core";

export const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
});

export const Main = styled("div")({
  display: "flex",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
});

export const Footer = styled("div")({
  textAlign: "left",
});

export const Copyright = styled("div")(({ theme }) => ({
  color: `${theme.palette.text.disabled}`,
  fontSize: "0.7rem",
  padding: theme.spacing(1),
}));