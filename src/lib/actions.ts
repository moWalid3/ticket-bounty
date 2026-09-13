export type ActionState<TData = void> =
  | { success: true; data?: TData }
  | {
      success: false;
      error?: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

export function actionSuccess<TData>(data?: TData): ActionState<TData> {
  return { success: true, data };
}

export function actionError(
  error?: string,
  fieldErrors?: Record<string, string[] | undefined>,
): ActionState {
  return { success: false, error, fieldErrors };
}
