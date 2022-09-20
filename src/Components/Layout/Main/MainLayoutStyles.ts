import { styled } from "@material-ui/core";

export const MainLayoutStyles = {
  Container: styled("div")({
    display: "flex",

    minHeight: "100vh",
    minWidth: "100vw",
  }),
  ContentSection: styled("section")({
    display: "flex",
    padding: "2rem",
  }),
  Aside: styled("div")(() => ({
    flex: "0 0 300px",
  })),
  PageContentSection: styled("section")({
    minHeight: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  }),
};
