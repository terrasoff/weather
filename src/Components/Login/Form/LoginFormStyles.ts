import { styled } from "@material-ui/core";
import { Button } from "@Components/Button";

export const LoginFormTitle = styled("div")({
  fontWeight: "bold",
  fontSize: "1.5rem",
});

export const LoginFormHint = styled("div")(({ theme }) => ({
  color: `${theme.palette.text.disabled}`,
  fontSize: "0.7rem",
  marginBottom: theme.spacing(4),
}));

export const ForgetPasswordHint = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: `${theme.palette.text.disabled}`,
  fontSize: "0.7rem",
}));

export const FormFieldWrapper = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const LoginButtonWrapper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export const LoginButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2),
}));

export const LoginContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  justifyContent: "center",
  width: "400px",
  backgroundColor: "white",
  borderRadius: "1rem",
}));

