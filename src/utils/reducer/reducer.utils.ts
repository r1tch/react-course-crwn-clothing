import { AnyAction } from "redux";

type Matchable<ActionCreatorT extends () => AnyAction> = ActionCreatorT & {
  type: ReturnType<ActionCreatorT>["type"];
  match(action: AnyAction): action is ReturnType<ActionCreatorT>;
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

// we add "type" and the match() function to the actionCreator function:
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<TypeT, PayloadT> = {
  type: TypeT;
  payload: PayloadT;
};

export type Action<TypeT> = {
  type: TypeT;
};

export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
