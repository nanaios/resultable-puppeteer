import type { ElementHandle, Page } from "puppeteer";
import { ResultableElementHandle } from "./ResultableElementHandle";
import { ResultablePage } from "./ResultablePage";

export const createResultableElementHandle = <ElementType extends Element = Element>(elementHandle: ElementHandle<ElementType>) => new ResultableElementHandle(elementHandle)
export const createResultablePage = (page: Page) => new ResultablePage(page)