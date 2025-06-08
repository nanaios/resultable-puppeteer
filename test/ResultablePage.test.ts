import type { ElementHandle, Page } from "puppeteer";
import { describe, expect, test, vi } from "vitest";
import { ResultablePage } from "../src/ResultablePage";

describe("ResultablePageのテスト", () => {
	test("prototypeの継承の検証", async () => {
		//pageをmockする
		const page = {
			async title() { return "test title" }
		} as unknown as Page
		const resultablePage = new ResultablePage(page)

		//prototypeからメソッドを参照できるかチェック
		expect(await resultablePage.title()).toBe("test title")
		expect(Object.getPrototypeOf(resultablePage)).toBe(page)
	})
	test("overrideした関数の検証", async () => {
		const mockElements = [{}, {}] as unknown as ElementHandle<HTMLElement>[]
		const mockInnerText = ["inner1", "inner2"]
		const $mock = vi.fn((selector: string) => mockElements[0])
		const $$mock = vi.fn((selector: string) => mockElements)
		const $evalMock = vi.fn((selector: string, fn: () => any) => mockInnerText[0])
		const $$evalMock = vi.fn((selector: string, fn: () => any) => mockInnerText)

		const page = {
			$: $mock,
			$$: $$mock,
			$eval: $evalMock,
			$$eval: $$evalMock
		} as unknown as Page

		const resultablePage = new ResultablePage(page)

		/**
		//overrideした関数を実行
		const result1 = await resultablePage.$("li.selector1")
		const result2 = await resultablePage.$$("li.selector2")
		const result3 = await resultablePage.$eval("li.selector3", li => li.innerText)
		const result4 = await resultablePage.$$eval("li.selector4", lis => lis.map(li => li.innerText))

		//resultの成否のチェック
		expect(result1.isOk()).toBe(true)
		expect(result2.isOk()).toBe(true)
		expect(result3.isOk()).toBe(true)
		expect(result4.isOk()).toBe(true)

		if (result1.isErr()) return;
		if (result2.isErr()) return;
		if (result3.isErr()) return;
		if (result4.isErr()) return;

		expect(result1.value)
		expect(result2.value)
		expect(result3.value)
		expect(result4.value) */
	})
})