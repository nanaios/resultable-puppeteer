import type { ElementHandle, Page } from "puppeteer";
import { type IResultableElementHandle, ResultableElementHandle } from "./ResultableElementHandle";
import { ResultablePage, type IResultablePage } from "./ResultablePage";

export const createResultableElementHandle = <ElementType extends Element = Element>(elementHandle: ElementHandle<ElementType>): IResultableElementHandle<ElementType> => new ResultableElementHandle(elementHandle)
export const createResultablePage = (page: Page): IResultablePage => new ResultablePage(page)
