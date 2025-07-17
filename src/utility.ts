import { fromPromise, type ResultAsync } from "neverthrow";

type Falsy = null | undefined | false | 0 | 0n | ""

/**
 * 引数がnullやundefinedなどのFalsyな値の可能性がある時に、NonNullableにしてくれる関数
 * @param value - nullやundefinedなどのFalsyの可能性がある値
 * @returns 
 */
export const NotFalsy = <T>(value: T | Falsy) => {
	if (value) return value;
	throw new Error("Falsy Value")
}

export const ThrowError = (e: unknown) => e as Error

export const bindResult = <T, E extends Error>(promise: PromiseLike<T>, errorFn?: (e: unknown) => E = ThrowError): ResultAsync<T, E> => fromPromise(promise, errorFn)