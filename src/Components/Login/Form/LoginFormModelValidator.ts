import { Validator } from "fluentvalidation-ts";
import { LoginFormModel } from "./LoginFormModel";

export class LoginFormModelValidator extends Validator<LoginFormModel> {

  constructor() {
    super();

    this.ruleFor("name")
      .notEmpty()
      .withMessage("Name is required")
    ;

    this.ruleFor("password")
      .notEmpty()
      .withMessage("Password is required")
    ;
  }

}