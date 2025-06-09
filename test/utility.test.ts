import { describe, expect, test } from "vitest"
import { NotFalsy } from "../src/utility"

describe("utility.tsのテスト", () => {
	test("関数のテスト", () => {
		expect(NotFalsy(0).isErr()).toBe(true)
		expect(NotFalsy(-0).isErr()).toBe(true)
		expect(NotFalsy(0n).isErr()).toBe(true)
		expect(NotFalsy(undefined).isErr()).toBe(true)
		expect(NotFalsy(false).isErr()).toBe(true)
		expect(NotFalsy("").isErr()).toBe(true)
		expect(NotFalsy(null).isErr()).toBe(true)
	})
	test("メソッドのテスト", () => {
	})
})