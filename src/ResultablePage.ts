import { type ResultAsync } from "neverthrow";
import type { EvaluateFunc, GoToOptions, Page } from "puppeteer";
import type { ClickOptions, KeyboardTypeOptions } from "puppeteer"
import { bindResult, NotFalsy, ThrowError } from "./utility";
import { $Base, type I$Base } from "./$Base";

export interface IResultablePage extends I$Base {
	title(): ResultAsync<string, Error>
	close(options?: {
		runBeforeUnload?: boolean;
	}): ResultAsync<void, Error>
	type(selector: string, text: string, options?: Readonly<KeyboardTypeOptions>): ResultAsync<void, Error>
	click(selector: string, options?: Readonly<ClickOptions>): ResultAsync<void, Error>
	evaluate<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params): ResultAsync<Awaited<ReturnType<Func>>, Error>
}

export class ResultablePage extends $Base implements IResultablePage {
	page: Page
	constructor(page: Page) {
		super(page)
		this.page = page
		page.goto
	}
	title() {
		return bindResult(this.page.title())
	}
	close(options?: { runBeforeUnload?: boolean }) {
		return bindResult(this.page.close(options))
	}
	type(selector: string, text: string, options?: Readonly<KeyboardTypeOptions>) {
		return bindResult(this.page.type(selector, text, options))
	}
	click(selector: string, options?: Readonly<ClickOptions>) {
		return bindResult(this.page.click(selector, options))
	}
	evaluate<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params) {
		return bindResult(this.page.evaluate(pageFunction, ...args))
	}
	goto(url: string, options?: GoToOptions) {
		return bindResult(this.page.goto(url, options))
			.map(res => NotFalsy(res))
	}

}