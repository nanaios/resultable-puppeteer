import type { Browser, BrowserEvents } from "puppeteer";
import { bindResultPromise } from "./utility";
import { ResultableEventEmitter } from "./ResultableEventEmitter";

export class ResultableBrowser extends ResultableEventEmitter<BrowserEvents> {
	private browser: Browser
	constructor(browser: Browser) {
		super(browser)
		this.browser = browser
	}

	close() {
		return bindResultPromise(this.browser.close())
	}
	newPage() {
		return bindResultPromise(this.browser.newPage())
	}
	pages() {
		return bindResultPromise(this.browser.pages())
	}
}