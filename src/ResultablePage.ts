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
	$$eval<
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>[], Params> = EvaluateFuncWith<NodeFor<Selector>[], Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params): ResultAsync<Awaited<ReturnType<Func>>, FailedEvalError>
}

interface ResultablePageConstructor {
	new(page: Page): ResultablePage
}

//@ts-ignore
export const ResultablePage: ResultablePageConstructor = function (page: Page) {

	//thisを固定することで、privateプロパティのアクセスエラー対策をする
	const $mock = page.$?.bind(page)
	const $$mock = page.$$?.bind(page)
	const $evalMock = page.$eval?.bind(page)
	const $$evalMock = page.$$eval?.bind(page)

	//@ts-ignore
	page.$ = <Selector extends string>(selector: Selector) => {
		return ResultAsync.fromPromise($mock(selector), (e) => new NullNodeError(`要素[selector: ${selector}]が見つかりません！`, { cause: e }))
		//elementがnullの可能性があるのでNotFalsy関数を通す
		//.andThen(element => NotFalsy(element))
		//.mapErr(() => new NullNodeError(`要素[selector: ${selector}]が見つかりません！`))
	}

	//@ts-ignore
	page.$$ = <Selector extends string>(selector: Selector, options?: QueryOptions) => {
		return ResultAsync.fromPromise($$mock(selector), () => new NullNodeError(`要素群[selector: ${selector}]が見つかりません！`))
	}

	//@ts-ignore
	page.$eval = <
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) => {
		return ResultAsync.fromPromise(
			$evalMock(selector, pageFunction, ...args),
			() => new FailedEvalError(`要素[selector: ${selector}]に対して操作を実行できませんでした！`)
		)
	}

	//@ts-ignore
	page.$$eval = <
		Selector extends string,
		Params extends unknown[],
		Func extends EvaluateFuncWith<NodeFor<Selector>[], Params> = EvaluateFuncWith<NodeFor<Selector>[], Params>
	>(selector: Selector, pageFunction: string | Func, ...args: Params) => {
		return ResultAsync.fromPromise(
			$$evalMock(selector, pageFunction, ...args),
			() => new FailedEvalError(`要素群[selector: ${selector}]に対して操作を実行できませんでした！`)
		)
	}
	return page
}