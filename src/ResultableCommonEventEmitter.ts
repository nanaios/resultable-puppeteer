import type { EventType, Handler } from "puppeteer";
import type { Result } from "neverthrow";

export interface ResultableCommonEventEmitter<Events extends Record<EventType, unknown>> {
	on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): Result<this, Error>
	off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): Result<this, Error>
	emit<Key extends keyof Events>(type: Key, event: Events[Key]): Result<boolean, Error>
	once<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): Result<this, Error>
	listenerCount(event: keyof Events): Result<number, Error>
	removeAllListeners(event?: keyof Events): Result<this, Error>
}