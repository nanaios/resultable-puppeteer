import puppeteer from "puppeteer";
import { describe, expect, test } from "vitest";
import { ResultablePage } from "../src/ResultablePage";

describe("実際のpuppeteer環境でテストする", () => {
	test("example.com環境でのテスト", async () => {
		//browserを立ち上げ
		const browser = await puppeteer.launch({ headless: true })
		const page = await browser.pages().then(page => page[0])

		const resultablePage = new ResultablePage(page)

		//テストサイトに移動
		await Promise.all([
			page.goto("https://example.com"),
			page.waitForNavigation({ waitUntil: ["domcontentloaded", "load", "networkidle2"] })
		])

		//各種関数をテスト
		const div = await resultablePage.$("div")
		const innerText = await resultablePage.$eval("h1", h1 => h1.innerText)

		//resultの成否をチェック
		expect(div.isOk()).toBe(true)
		expect(innerText.isOk()).toBe(true)

		if (div.isErr()) return;
		if (innerText.isErr()) return;

		//内容をチェック
		expect(innerText.value).toBe("Example Domain")
		await browser.close()
	})
})