import { CompositeError } from "../CompositeError";

export type ErrorResult<E extends Error> = { err: E };
export type OkResult<T> = { val: T };
export type ResultData<T, E extends Error> = OkResult<T> | ErrorResult<E>;

export type CombinedResult<T extends any[]> = {
  result: T;
  __typename: "CombinedResult";
};

export type MergeCombinedResult<R, Ro> = R extends CombinedResult<infer R1>
  ? Ro extends CombinedResult<infer R2>
    ? CombinedResult<[...R1, ...R2]>
    : CombinedResult<[...R1, Ro]>
  : Ro extends CombinedResult<infer R2>
  ? CombinedResult<[R, ...R2]>
  : CombinedResult<[R, Ro]>;
export type MergeCompositeError<
  E extends Error,
  Eo extends Error
> = E extends CompositeError<infer E1>
  ? Eo extends CompositeError<infer E2>
    ? CompositeError<[...E1, ...E2]>
    : CompositeError<[...E1, Eo]>
  : Eo extends CompositeError<infer E2>
  ? CompositeError<[E, ...E2]>
  : CompositeError<[E, Eo]>;