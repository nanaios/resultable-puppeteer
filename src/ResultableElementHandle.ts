import type { ClickOptions, ElementHandle, EvaluateFuncWith, KeyboardTypeOptions } from "puppeteer";
import { $Base, type I$Base } from "./$Base";
import { bindResult } from "./utility";

export interface IResultableElementHandle<ElementType extends Element = Element> extends I$Base {
	element: ElementHandle<ElementType>
}

export class ResultableElementHandle<ElementType extends Element = Element> extends $Base implements IResultableElementHandle<ElementType> {
	element: ElementHandle<ElementType>

	constructor(elementHandle: ElementHandle<ElementType>) {
		super(elementHandle)
		this.element = elementHandle

		elementHandle.evaluate(a => 0)
	}
	click(options?: Readonly<ClickOptions>) {
		return bindResult(this.element.click(options))
	}
	type(text: string, options?: Readonly<KeyboardTypeOptions>) {
		return bindResult(this.element.type(text, options))
	}

	evaluate(pageFunction: string | EvaluateFuncWith<ElementType, []>) {
		return bindResult(this.element.evaluate(pageFunction))
	}
}