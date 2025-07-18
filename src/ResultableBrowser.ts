import type { Browser } from "puppeteer";
import { bindResultPromise } from "./utility";

export class ResultableBrowser {
	private browser: Browser
	constructor(browser: Browser) {
		this.browser = browser

		browser.close()
		browser.on
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