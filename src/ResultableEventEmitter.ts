import type { EventEmitter, EventsWithWildcard, EventType, Handler } from "puppeteer";
import { ResultableCommonEventEmitter } from "./ResultableCommonEventEmitter";
import type { Result } from "neverthrow";
import { bindResult } from "./utility";

export class ResultableEventEmitter<Events extends Record<EventType, unknown>> implements ResultableCommonEventEmitter<EventsWithWildcard<Events>> {
	base: EventEmitter<Events>
	constructor(base: EventEmitter<Events>) {
		this.base = base

		//@ts-ignore
		this.on = bindResult(this.base.on)
		//@ts-ignore
		this.off = bindResult(this.base.off)
		//@ts-ignore
		this.emit = bindResult(this.base.emit)
		//@ts-ignore
		this.once = bindResult(this.base.once)
		//@ts-ignore
		this.listenerCount = bindResult(this.base.listenerCount)
		//@ts-ignore
		this.removeAllListeners = bindResult(this.base.removeAllListeners)

	}

	on<Key extends keyof EventsWithWildcard<Events>>(type: Key, handler: Handler<EventsWithWildcard<Events>[Key]>): Result<this, Error> {
		throw new Error("Method not implemented.");
	}
	off<Key extends keyof EventsWithWildcard<Events>>(type: Key, handler?: Handler<EventsWithWildcard<Events>[Key]> | undefined): Result<this, Error> {
		throw new Error("Method not implemented.");
	}
	emit<Key extends keyof EventsWithWildcard<Events>>(type: Key, event: EventsWithWildcard<Events>[Key]): Result<boolean, Error> {
		throw new Error("Method not implemented.");
	}
	once<Key extends keyof EventsWithWildcard<Events>>(type: Key, handler: Handler<EventsWithWildcard<Events>[Key]>): Result<this, Error> {
		throw new Error("Method not implemented.");
	}
	listenerCount(type: keyof EventsWithWildcard<Events>): Result<number, Error> {
		throw new Error("Method not implemented.");
	}
	removeAllListeners(type?: keyof EventsWithWildcard<Events>): Result<this, Error> {
		throw new Error("Method not implemented.");
	}
}