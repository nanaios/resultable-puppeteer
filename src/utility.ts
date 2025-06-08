import { err, ok, type Err, type Result } from "neverthrow";

export class FailedEvalError extends Error { }
export class NullNodeError extends Error { }

export class FalsyValueError extends Error { }

type Falsy = null | undefined | false | 0 | 0n | ""

/**
 * 引数がnullやundefinedなどのFalsyな値の可能性がある時に、値とFalsyValueErrorをまとめたResult型として返してくれる関数
 * @param value - nullやundefinedの可能性がある値
 * @returns 
 */
export const NotFalsy = <T>(value: T | Falsy): Result<T, FalsyValueError> => value ? ok(value) : err(new FalsyValueError(""))