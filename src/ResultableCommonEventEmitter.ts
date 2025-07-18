import type { CommonEventEmitter, EventType, Handler } from "puppeteer";
import { bindResult, bindResultPromise } from "./utility";

export class ResultableCommonEventEmitter<Events extends Record<EventType, unknown>> {
	base: CommonEventEmitter<Events>
	constructor(base: CommonEventEmitter<Events>) {
		this.base = base
	}
	on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>) {
		return bindResult(this.base.on)(type, handler)
	}
	off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>) { }
	emit<Key extends keyof Events>(type: Key, event: Events[Key]) { }
	once<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>) { }
	listenerCount(event: keyof Events) { }
	removeAllListeners(event?: keyof Events) { }
}