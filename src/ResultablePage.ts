import { ResultAsync } from "neverthrow";
import { EvaluateFuncWith, NodeFor, Page, QueryOptions, type ElementHandle } from "puppeteer";
import { FailedEvalError, NotFalsy, NullNodeError } from "./utility";

//@ts-ignore
export interface ResultablePage extends Page {
	$<Selector extends string>(selector: Selector): ResultAsync<ElementHandle<NodeFor<Selector>>, NullNodeError>
	$$<Selector extends string>(selector: Selector, options?: QueryOptions): ResultAsync<ElementHandle<NodeFor<Selector>>[], NullNodeError>
	$eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params): ResultAsync<Awaited<ReturnType<Func>>, FailedEvalError>

}

interface ResultablePageConstructor {
	new(page: Page): ResultablePage
}

//@ts-ignore
export const ResultablePage: ResultablePageConstructor = function (page: Page) {
	const $ = async <Selector extends string>(selector: Selector) => {
		return ResultAsync.fromPromise(page.$(selector), () => new NullNodeError(`要素[selector: ${selector}]が見つかりません！`))
			//elementがnullの可能性があるのでNotFalsy関数を通す
			.andThen(element => NotFalsy(element))
			.mapErr(() => new NullNodeError(`要素[selector: ${selector}]が見つかりません！`))
	}
	const $$ = async <Selector extends string>(selector: Selector, options?: QueryOptions) => {
		return ResultAsync.fromPromise(page.$$(selector), () => new NullNodeError(`要素群[selector: ${selector}]が見つかりません！`))
	}
	const $eval = async <
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) => {
		return ResultAsync.fromPromise(
			page.$eval(selector, pageFunction, ...args),
			() => new FailedEvalError(`要素[selector: ${selector}]に対して操作を実行できませんでした！`)
		)
	}
	const $$eval = async <
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>[], Params> = EvaluateFuncWith<NodeFor<Selector>[], Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) => {
		return ResultAsync.fromPromise(
			page.$$eval(selector, pageFunction, ...args),
			() => new FailedEvalError(`要素群[selector: ${selector}]に対して操作を実行できませんでした！`)
		)
	}
	const overRides = { $, $$, $eval, $$eval }
	const obj = Object.assign(page, overRides)

	return obj
}