import { OperationCancelError, OperationStateStore } from "@Infrastructure/Stores";
import { AsyncOperationWorkflowStoreOptions } from "./AsyncOperationWorkflowStoreOptions";

export class AsyncOperationWorkflowStore<TParams = void, TResult = void> {

  public readonly state = new OperationStateStore();

  private readonly _options: AsyncOperationWorkflowStoreOptions;

  private readonly _operation: (params: TParams) => Promise<TResult> | never;

  constructor(
    operation: (params: TParams) => Promise<TResult> | never,
    options: Partial<AsyncOperationWorkflowStoreOptions> = {},
  ) {
    this.execute = this.execute.bind(this);
    this.cancel = this.cancel.bind(this);

    this._operation = operation;
    this._options = options;
  }

  public async execute(params: TParams): Promise<TResult> {
    const {
      state,
    } = this;

    try {
      state.start();

      const result = await this._operation(params);

      state.success();

      return result;

    } catch (error) {
      if (error instanceof OperationCancelError) {
        state.cancel();
      } else {
        state.fail();
      }
      throw error;
    }
  }

  public async cancel(): Promise<void> {
    this._options.cancellationToken?.cancel();
  }

}
