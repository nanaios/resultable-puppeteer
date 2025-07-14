import type { ElementHandle } from "puppeteer";

export interface IResultableElementHandle<ElementType extends Node = Element> {

}

export class ResultableElementHandle<ElementType extends Node = Element> {
	element: ElementHandle<ElementType>

	constructor(elementHandle: ElementHandle<ElementType>) {
		this.element = elementHandle
	}
}