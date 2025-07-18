import { type ResultAsync } from "neverthrow";
import type { ElementHandle, EvaluateFuncWith, NodeFor, Page, QueryOptions } from "puppeteer";
import { NotFalsy, bindResultPromise } from "./utility";
import { createResultableElementHandle } from "./factory";

export class $Base {
	private base: Page | ElementHandle<Node>
	constructor(base: Page | ElementHandle<Node>) {
		this.base = base

		base.evaluate
	}

	$<Selector extends string>(selector: Selector) {
		return bindResultPromise(this.base.$(selector))
			.map(element => NotFalsy(element))
			.map(element => createResultableElementHandle(element))
	}
	$$<Selector extends string>(selector: Selector, options?: QueryOptions) {
		return bindResultPromise(this.base.$$(selector, options))
	}
	$eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) {
		return bindResultPromise(this.base.$eval(selector, pageFunction, ...args))
	}
	$$eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>[], Params> = EvaluateFuncWith<NodeFor<Selector>[], Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) {
		return bindResultPromise(this.base.$$eval(selector, pageFunction, ...args))
	}
}