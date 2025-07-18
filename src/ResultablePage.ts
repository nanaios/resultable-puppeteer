import type { EvaluateFunc, GoToOptions, Page, WaitForOptions } from "puppeteer";
import type { ClickOptions, KeyboardTypeOptions } from "puppeteer"
import { bindResultPromise } from "./utility";
import { $Base } from "./$Base";

export class ResultablePage extends $Base {
	page: Page
	constructor(page: Page) {
		super(page)
		this.page = page
	}
	title() {
		return bindResultPromise(this.page.title())
	}
	close(options?: { runBeforeUnload?: boolean }) {
		return bindResultPromise(this.page.close(options))
	}
	type(selector: string, text: string, options?: Readonly<KeyboardTypeOptions>) {
		return bindResultPromise(this.page.type(selector, text, options))
	}
	click(selector: string, options?: Readonly<ClickOptions>) {
		return bindResultPromise(this.page.click(selector, options))
	}
	evaluate<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params) {
		return bindResultPromise(this.page.evaluate(pageFunction, ...args))
	}
	goto(url: string, options?: GoToOptions) {
		return bindResultPromise(this.page.goto(url, options))
	}
	exposeFunction(name: string, pptrFunction: Function | { default: Function }) {
		return bindResultPromise(this.page.exposeFunction(name, pptrFunction))
	}
	reload(options?: WaitForOptions) {
		return bindResultPromise(this.page.reload(options))
	}
}