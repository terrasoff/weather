import { OperationCancellationToken } from "@Infrastructure/Stores";

export type AsyncOperationWorkflowStoreOptions<TParams = unknown> = {

  cancellationToken?: OperationCancellationToken;

}
