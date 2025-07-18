import type { ClickOptions, ElementHandle, EvaluateFuncWith, KeyboardTypeOptions } from "puppeteer";
import { $Base } from "./$Base";
import { bindResultPromise } from "./utility";

export class ResultableElementHandle<ElementType extends Element = Element> extends $Base {
	element: ElementHandle<ElementType>

	constructor(elementHandle: ElementHandle<ElementType>) {
		super(elementHandle)
		this.element = elementHandle

		elementHandle
	}
	click(options?: Readonly<ClickOptions>) {
		return bindResultPromise(this.element.click(options))
	}
	type(text: string, options?: Readonly<KeyboardTypeOptions>) {
		return bindResultPromise(this.element.type(text, options))
	}

	evaluate(pageFunction: string | EvaluateFuncWith<ElementType, []>) {
		return bindResultPromise(this.element.evaluate(pageFunction))
	}
}