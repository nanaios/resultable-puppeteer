import { type ResultAsync } from "neverthrow";
import type { Page } from "puppeteer";
import type { ClickOptions, KeyboardTypeOptions } from "puppeteer"
import { bindResult, ThrowError } from "./utility";
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
	}
	title() {
		return bindResult(this.page.title())
	}
	close(options?: { runBeforeUnload?: boolean }) {
		return bindResult(this.page.close(options))
	}
	type(selector: string, text: string, options?: Readonly<KeyboardTypeOptions>) {
		return bindResult(this.page.type(selector, text, options), () => new ReferenceError())
	}
	click(selector: string, options?: Readonly<ClickOptions>) {
		return bindResult(this.page.click(selector, options))
	}
}