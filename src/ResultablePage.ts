import { ResultAsync } from "neverthrow";
import { EvaluateFuncWith, NodeFor, Page, QueryOptions } from "puppeteer";
import { FailedEvalError, NotFalsy, NullNodeError } from "./utility";

//@ts-ignore
export interface ResultablePage extends Page { }

export class ResultablePage {
	private page: Page
	constructor(page: Page) {
		this.page = page
		//prototypeを書き換えることで、pageのメソッドを使えるようにする
		//Object.setPrototypeOf(this, page)
	}
	async $<Selector extends string>(selector: Selector) {
		return ResultAsync.fromPromise(this.page.$(selector), () => new NullNodeError(`要素[selector: ${selector}]が見つかりません！`))
			//elementがnullの可能性があるのでNotFalsy関数を通す
			.andThen(element => NotFalsy(element))
			.mapErr(() => new NullNodeError(`要素[selector: ${selector}]が見つかりません！`))
	}
	async $$<Selector extends string>(selector: Selector, options?: QueryOptions) {
		return ResultAsync.fromPromise(this.page.$$(selector), () => new NullNodeError(`要素群[selector: ${selector}]が見つかりません！`))
	}
	async $eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) {

		return ResultAsync.fromPromise(
			this.page.$eval(selector, pageFunction, ...args),
			() => new FailedEvalError(`要素[selector: ${selector}]に対して操作を実行できませんでした！`)
		)
	}
	async $$eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>[], Params> = EvaluateFuncWith<NodeFor<Selector>[], Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) {

		return ResultAsync.fromPromise(
			this.page.$$eval(selector, pageFunction, ...args),
			() => new FailedEvalError(`要素群[selector: ${selector}]に対して操作を実行できませんでした！`)
		)
	}
}