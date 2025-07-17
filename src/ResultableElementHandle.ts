import type { ClickOptions, ElementHandle, KeyboardTypeOptions } from "puppeteer";
import { $Base, type I$Base } from "./$Base";
import { fromPromise } from "neverthrow";
import { ThrowError } from "./utility";

export interface IResultableElementHandle<ElementType extends Element = Element> extends I$Base {
	element: ElementHandle<ElementType>
}

export class ResultableElementHandle<ElementType extends Element = Element> extends $Base implements IResultableElementHandle<ElementType> {
	element: ElementHandle<ElementType>

	constructor(elementHandle: ElementHandle<ElementType>) {
		super(elementHandle)
		this.element = elementHandle
	}
	click(options?: Readonly<ClickOptions>) {
		return fromPromise(
			this.element.click(options),
			ThrowError
		)
	}
	type(text: string, options?: Readonly<KeyboardTypeOptions>) {
		return fromPromise(
			this.element.type(text, options),
			ThrowError
		)
	}
}