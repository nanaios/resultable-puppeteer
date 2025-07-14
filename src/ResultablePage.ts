import { fromPromise, type ResultAsync } from "neverthrow";
import type { ElementHandle, EvaluateFuncWith, NodeFor, Page, QueryOptions } from "puppeteer";
import type { ClickOptions, KeyboardTypeOptions } from "puppeteer"
import { NotFalsy, ThrowError } from "./utility";
import { ResultableElementHandle } from "./ResultableElementHandle";

export const createResultablePage = (page: Page): IResultablePage => new ResultablePage(page)

export interface IResultablePage {
	$<Selector extends string>(selector: Selector): ResultAsync<ResultableElementHandle<NodeFor<Selector>>, Error>
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
	title(): ResultAsync<string, Error>
	close(options?: {
		runBeforeUnload?: boolean;
	}): ResultAsync<void, Error>
	type(selector: string, text: string, options?: Readonly<KeyboardTypeOptions>): ResultAsync<void, Error>
	click(selector: string, options?: Readonly<ClickOptions>): ResultAsync<void, Error>
}

class ResultablePage {
	page: Page
	constructor(page: Page) {
		this.page = page
	}
	$<Selector extends string>(selector: Selector) {
		return fromPromise(this.page.$(selector), ThrowError)
			.map(element => NotFalsy(element))
			.map(element => new ResultableElementHandle(element))
	}
	$$<Selector extends string>(selector: Selector, options?: QueryOptions) {
		return fromPromise(
			this.page.$$(selector, options),
			ThrowError
		)
	}
	$eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) {
		return fromPromise(
			this.page.$eval(selector, pageFunction, ...args),
			ThrowError
		)
	}
	$$eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>[], Params> = EvaluateFuncWith<NodeFor<Selector>[], Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) {
		return fromPromise(
			this.page.$$eval(selector, pageFunction, ...args),
			ThrowError
		)
	}
	title() {
		return fromPromise(
			this.page.title(),
			ThrowError
		)
	}
	close(options?: { runBeforeUnload?: boolean }) {
		return fromPromise(
			this.page.close(options),
			ThrowError
		)
	} t
	type(selector: string, text: string, options?: Readonly<KeyboardTypeOptions>) {
		return fromPromise(
			this.page.type(selector, text, options),
			ThrowError
		)
	}
	click(selector: string, options?: Readonly<ClickOptions>) {
		return fromPromise(
			this.page.click(selector, options),
			ThrowError
		)
	}
}