import { ReactNode } from "react";
import { LoginFormStore } from "@Components/Login/Form/LoginFormStore";

export type LoginFormProps = {

  store: LoginFormStore;

  error?: ReactNode;

}
