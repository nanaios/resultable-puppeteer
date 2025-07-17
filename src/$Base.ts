import { type ResultAsync } from "neverthrow";
import type { ElementHandle, EvaluateFuncWith, NodeFor, Page, QueryOptions } from "puppeteer";
import { IResultableElementHandle } from "./ResultableElementHandle";
import { NotFalsy, bindResult } from "./utility";
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

		base.evaluate
	}

	$<Selector extends string>(selector: Selector) {
		return bindResult(this.base.$(selector))
			.map(element => NotFalsy(element))
			.map(element => createResultableElementHandle(element))
	}
	$$<Selector extends string>(selector: Selector, options?: QueryOptions) {
		return bindResult(this.base.$$(selector, options))
	}
	$eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) {
		return bindResult(this.base.$eval(selector, pageFunction, ...args))
	}
	$$eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>[], Params> = EvaluateFuncWith<NodeFor<Selector>[], Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) {
		return bindResult(this.base.$$eval(selector, pageFunction, ...args))
	}
}