import type { ElementHandle, Page } from "puppeteer";
import { describe, expect, test, vi } from "vitest";
import { createResultablePage } from "../src/ResultablePage";

describe("ResultablePageのテスト(only)", () => {
	test("overrideした関数の検証", async () => {
		//関数や戻り値のmock
		const mockElements = [{}, {}] as unknown as ElementHandle<HTMLElement>[]
		const mockInnerText = ["inner1", "inner2"]
		const $mock = vi.fn(async (selector: string) => mockElements[0])
		const $$mock = vi.fn(async (selector: string) => mockElements)
		const $evalMock = vi.fn(async (selector: string, fn: () => any) => mockInnerText[0])
		const $$evalMock = vi.fn(async (selector: string, fn: () => any) => mockInnerText)

		const page = {
			$: $mock,
			$$: $$mock,
			$eval: $evalMock,
			$$eval: $$evalMock
		} as unknown as Page

		const resultablePage = createResultablePage(page)

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

		//引数をチェック
		expect($mock).toHaveBeenCalledWith("li.selector1")
		expect($$mock).toHaveBeenCalledWith("li.selector2", undefined)
		expect($evalMock.mock.lastCall?.[0]).toBe("li.selector3")
		expect($$evalMock.mock.lastCall?.[0]).toBe("li.selector4")

		//戻り値が正常かチェック
		expect(result1.value.element).toBe(mockElements[0])
		expect(result2.value).toBe(mockElements)
		expect(result3.value).toBe(mockInnerText[0])
		expect(result4.value).toBe(mockInnerText)
	})
	test("overrideした関数の検証（異常系）", async () => {
		//関数をmockする
		const $mock = vi.fn(async (selector: string) => { throw new Error("mock error") })
		const $$mock = vi.fn(async (selector: string) => { throw new Error("mock error") })
		const $evalMock = vi.fn(async (selector: string, fn: () => any) => { throw new Error("mock error") })
		const $$evalMock = vi.fn(async (selector: string, fn: () => any) => { throw new Error("mock error") })

		const page = {
			$: $mock,
			$$: $$mock,
			$eval: $evalMock,
			$$eval: $$evalMock
		} as unknown as Page

		const resultablePage = createResultablePage(page)

		//overrideした関数を実行
		const result1 = await resultablePage.$("li.selector1")
		const result2 = await resultablePage.$$("li.selector2")
		const result3 = await resultablePage.$eval("li.selector3", li => li.innerText)
		const result4 = await resultablePage.$$eval("li.selector4", lis => lis.map(li => li.innerText))

		//resultの成否のチェック
		expect(result1.isErr()).toBe(true)
		expect(result2.isErr()).toBe(true)
		expect(result3.isErr()).toBe(true)
		expect(result4.isErr()).toBe(true)
	})
	test("returnがnullの時のテスト", async () => {
		const $mock = vi.fn(async (selector: string) => { throw new Error("mock error") })

		const page = {
			$: $mock
		} as unknown as Page

		const resultablePage = createResultablePage(page)

		//overrideした関数を実行
		const result1 = await resultablePage.$("li.selector1")

		//resultの成否のチェック
		expect(result1.isErr()).toBe(true)
	})
})