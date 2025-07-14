import type { ElementHandle } from "puppeteer";
import { $Base, type I$Base } from "./$Base";

export const createResultableElementHandle = <ElementType extends Node = Element>(elementHandle: ElementHandle<ElementType>): IResultableElementHandle<ElementType> => new ResultableElementHandle(elementHandle)

export interface IResultableElementHandle<ElementType extends Node = Element> extends I$Base { }

export class ResultableElementHandle<ElementType extends Node = Element> extends $Base implements IResultableElementHandle<ElementType> {
	element: ElementHandle<ElementType>

	constructor(elementHandle: ElementHandle<ElementType>) {
		super(elementHandle)
		this.element = elementHandle
	}

}