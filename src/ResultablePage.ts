import { fromPromise, type ResultAsync } from "neverthrow";
import type { ElementHandle, EvaluateFuncWith, NodeFor, Page, QueryOptions } from "puppeteer";
import type { ClickOptions, KeyboardTypeOptions } from "puppeteer"
import { NotFalsy, ThrowError } from "./utility";
import { $Base, type I$Base } from "./$Base";

export const createResultablePage = (page: Page): IResultablePage => new ResultablePage(page)

export interface IResultablePage extends I$Base {
	title(): ResultAsync<string, Error>
	close(options?: {
		runBeforeUnload?: boolean;
	}): ResultAsync<void, Error>
	type(selector: string, text: string, options?: Readonly<KeyboardTypeOptions>): ResultAsync<void, Error>
	click(selector: string, options?: Readonly<ClickOptions>): ResultAsync<void, Error>
}

class ResultablePage extends $Base implements IResultablePage {
	page: Page
	constructor(page: Page) {
		super(page)
		this.page = page
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