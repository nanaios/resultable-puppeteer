import { fromPromise, ResultAsync } from "neverthrow";
import type { EvaluateFuncWith, NodeFor, Page, QueryOptions } from "puppeteer";
import type { ClickOptions, KeyboardTypeOptions } from "puppeteer"
import { NotFalsy } from "./utility";

export class ResultablePage {
	page: Page
	constructor(page: Page) {
		this.page = page
	}
	$<Selector extends string>(selector: Selector) {
		return fromPromise(this.page.$(selector), e => e as Error)
			.andThen(element => NotFalsy(element))
			.mapErr(e => e as Error)
	}
	$$<Selector extends string>(selector: Selector, options?: QueryOptions) {
		return fromPromise(
			this.page.$$(selector, options),
			e => e as Error
		)
	}
	$eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) {
		return fromPromise(
			this.page.$eval(selector, pageFunction, ...args),
			e => e as Error
		)
	}
	$$eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>[], Params> = EvaluateFuncWith<NodeFor<Selector>[], Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) {
		return fromPromise(
			this.page.$$eval(selector, pageFunction, ...args),
			e => e as Error
		)
	}
	title() {
		return fromPromise(
			this.page.title(),
			e => e as Error
		)
	}
	close(options?: { runBeforeUnload?: boolean }) {
		return fromPromise(
			this.page.close(options),
			e => e as Error
		)
	}
	type(selector: string, text: string, options?: Readonly<KeyboardTypeOptions>) {
		return fromPromise(
			this.page.type(selector, text, options),
			e => e as Error
		)
	}
	click(selector: string, options?: Readonly<ClickOptions>) {
		fromPromise(
			this.page.click(selector, options),
			e => e as Error
		)
	}
}