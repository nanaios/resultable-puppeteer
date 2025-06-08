import { err, ok, ResultAsync } from "neverthrow";
import { ElementHandle, EvaluateFuncWith, NodeFor, Page, QueryOptions } from "puppeteer";
import { FailedEvalError, NotFalsy, NullNodeError } from "./utility";

//@ts-ignore
export interface ResultablePage extends Page { }

export class ResultablePage {
	private $base: <Selector extends string>(selector: Selector) => ResultAsync<ElementHandle<NodeFor<Selector>> | null | null, unknown>
	private $$base: <Selector extends string>(selector: Selector, options?: QueryOptions) => ResultAsync<ElementHandle<NodeFor<Selector>>[], unknown>;
	private $evalBase: <Selector extends string, Params extends unknown[], Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>>(selector: Selector, pageFunction: string | Func, ...args: Params) => ResultAsync<Awaited<ReturnType<Func>>, unknown>;
	private $$evalBase: <Selector extends string, Params extends unknown[], Func extends EvaluateFuncWith<NodeFor<Selector>[], Params> = EvaluateFuncWith<NodeFor<Selector>[], Params>>(selector: Selector, pageFunction: string | Func, ...args: Params) => ResultAsync<Awaited<ReturnType<Func>>, unknown>;
	constructor(page: Page) {
		this.$base = ResultAsync.fromThrowable(page.$)
		this.$$base = ResultAsync.fromThrowable(page.$$)
		this.$evalBase = ResultAsync.fromThrowable(page.$eval)
		this.$$evalBase = ResultAsync.fromThrowable(page.$$eval)

		//prototypeを書き換えることで、pageのメソッドを使えるようにする
		Object.setPrototypeOf(this, page)
	}
	//@ts-ignore
	async $<Selector extends string>(selector: Selector): ResultAsync<ElementHandle<NodeFor<Selector>>, NullNodeError> {
		return this.$base(selector)
			//elementはnullの可能性があるのでNotFalsy関数を通す
			.andThen((element) => NotFalsy(element))
			.mapErr(() => new NullNodeError(`要素[selector: ${selector}]が見つかりません！`))
	}
	async $$<Selector extends string>(selector: Selector, options?: QueryOptions) {

		return this.$$base(selector, options)
			.mapErr(() => new NullNodeError(`要素群[selector: ${selector}]が見つかりません！`))
	}
	async $eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) {

		return this.$evalBase(selector, pageFunction, ...args)
			.mapErr(() => new FailedEvalError(`要素[selector: ${selector}]に対して操作を実行できませんでした！`))
	}
	async $$eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>[], Params> = EvaluateFuncWith<NodeFor<Selector>[], Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) {

		return this.$$evalBase(selector, pageFunction, ...args)
			.mapErr(() => new FailedEvalError(`要素群[selector: ${selector}]に対して操作を実行できませんでした！`))
	}
}