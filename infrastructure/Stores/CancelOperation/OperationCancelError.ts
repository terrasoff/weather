export class OperationCancelError<TResult> extends Error {

  private readonly _result: TResult;

  constructor(result: TResult) {
     super("Opperation was cancelled");

     this._result = result;
  }

  public get result(): TResult {
    return this._result;
  }

}
