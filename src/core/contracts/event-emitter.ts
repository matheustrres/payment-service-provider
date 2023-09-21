type Event = string | symbol;
type OnOptions = {
	async?: boolean;
	promisify?: boolean;
	nextTick?: boolean;
	objectify?: boolean;
};

interface Listener {
	emitter: EventEmitter;
	event: Event | Event[];
	listener: ListenerFn<any>;
	off(): this;
}

interface ListenerFn<Value> {
	(...values: Value[]): void;
}

export abstract class EventEmitter {
	public abstract emit<T>(event: Event | Event[], ...values: T[]): boolean;
	public abstract on(
		event: Event | Event[],
		listener: ListenerFn<any>,
		options?: boolean | OnOptions,
	): this | Listener;
}
