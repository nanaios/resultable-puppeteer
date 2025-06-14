import { err, ok, type Result } from "neverthrow";

type Falsy = null | undefined | false | 0 | 0n | ""

/**
 * 引数がnullやundefinedなどのFalsyな値の可能性がある時に、値とRangeErrorをまとめたResult型として返してくれる関数
 * @param value - nullやundefinedの可能性がある値
 * @returns 
 */
export const NotFalsy = <T>(value: T | Falsy): Result<T, RangeError> => value ? ok(value) : err(new RangeError("Value is falsy."))