import { fromPromise, type ResultAsync } from "neverthrow";
import type { Page } from "puppeteer";
import type { ClickOptions, KeyboardTypeOptions } from "puppeteer"
import { ThrowError } from "./utility";
import { $Base, type I$Base } from "./$Base";

export interface IResultablePage extends I$Base {
	title(): ResultAsync<string, Error>
	close(options?: {
		runBeforeUnload?: boolean;
	}): ResultAsync<void, Error>
	type(selector: string, text: string, options?: Readonly<KeyboardTypeOptions>): ResultAsync<void, Error>
	click(selector: string, options?: Readonly<ClickOptions>): ResultAsync<void, Error>
}

export class ResultablePage extends $Base implements IResultablePage {
	page: Page
	constructor(page: Page) {
		super(page)
		this.page = page

		page.evaluate
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
	}
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