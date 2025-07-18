import type { EventEmitter, EventsWithWildcard, EventType } from "puppeteer";
import { ResultableCommonEventEmitter } from "./ResultableCommonEventEmitter";

export class ResultableEventEmitter<Events extends Record<EventType, unknown>> extends ResultableCommonEventEmitter<EventsWithWildcard<Events>> {
	constructor(base: EventEmitter<Events>) {
		super(base)
	}
}