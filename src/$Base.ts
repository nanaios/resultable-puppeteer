import { fromPromise, type ResultAsync } from "neverthrow";
import type { ElementHandle, EvaluateFuncWith, NodeFor, Page, QueryOptions } from "puppeteer";
import { IResultableElementHandle } from "./ResultableElementHandle";
import { ThrowError, NotFalsy } from "./utility";
import { createResultableElementHandle } from "./factory";

export interface I$Base {
	$<Selector extends string>(selector: Selector): ResultAsync<IResultableElementHandle<NodeFor<Selector>>, Error>
	$$<Selector extends string>(selector: Selector, options?: QueryOptions): ResultAsync<ElementHandle<NodeFor<Selector>>[], Error>
	$eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params): ResultAsync<Awaited<ReturnType<Func>>, Error>
	$$eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>[], Params> = EvaluateFuncWith<NodeFor<Selector>[], Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params): ResultAsync<Awaited<ReturnType<Func>>, Error>

}

export class $Base {
	private base: Page | ElementHandle<Node>
	constructor(base: Page | ElementHandle<Node>) {
		this.base = base
	}

	$<Selector extends string>(selector: Selector) {
		return fromPromise(this.base.$(selector), ThrowError)
			.map(element => NotFalsy(element))
			.map(element => createResultableElementHandle(element))
	}
	$$<Selector extends string>(selector: Selector, options?: QueryOptions) {
		return fromPromise(
			this.base.$$(selector, options),
			ThrowError
		)
	}
	$eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) {
		return fromPromise(
			this.base.$eval(selector, pageFunction, ...args),
			ThrowError
		)
	}
	$$eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>[], Params> = EvaluateFuncWith<NodeFor<Selector>[], Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) {
		return fromPromise(
			this.base.$$eval(selector, pageFunction, ...args),
			ThrowError
		)
	}
}