import { injectable } from "inversify";
import { IErrorHandlerStore } from "./IErrorHandlerStore";

@injectable()
export class ErrorHandlerStore implements IErrorHandlerStore {

  constructor() {
    window.addEventListener("error", (event) => {
      this.handle(event.error);
    });
    window.addEventListener("unhandledrejection", (event) => {
      this.handle(event.reason);
    });
  }

  public handle = (error: Error | string): void => {
    let message = "Error occurred";
    if (error instanceof Error) {
      message = error.message;
    } else if (error) {
      message = error;
    }

    console.error("message", message);
  }

}
