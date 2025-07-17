import puppeteer from "puppeteer";
import { describe, expect, test, vi } from "vitest";
import { createResultablePage } from "../../src";

describe("実際のpuppeteer環境でテストする", { timeout: -1 }, () => {
	test("example.com環境でのテスト", async () => {
		const browser = await puppeteer.launch()
		const page = await browser.newPage()

		await Promise.all([
			page.goto("https://example.com"),
			page.waitForNavigation({ waitUntil: ["networkidle0", "domcontentloaded", "load"] })
		])

		const resultable = createResultablePage(page)

		const h1 = await resultable.$("h1")

		expect(h1.isOk()).toBe(true)
		if (h1.isErr()) return;
	})
})