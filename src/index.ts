/**
 * oni-types
 *
 * Common types used by Oni
 */

import { EventEmitter } from "events"

export interface IDisposable {
    dispose(): void
}

export type DisposeFunction = () => void

export type EventCallback<T> = (value: T) => void

export interface IEvent<T> {
    subscribe(callback: EventCallback<T>): IDisposable
}

const eventsCache = new Map<string, EventEmitter>()

export class Event<T> implements IEvent<T> {

    private _name: string
    private _eventObject: EventEmitter

    constructor(name: string) {
        this._name = name
        if (!eventsCache.has(name)) {
            let emitter = new EventEmitter()
            emitter.setMaxListeners(100)
            eventsCache.set(name, emitter)
        }
        this._eventObject = eventsCache.get(name)!
    }

    public subscribe(callback: EventCallback<T>): IDisposable {
        this._eventObject.addListener(this._name, callback)
        
        const dispose = () => {
            this._eventObject.removeListener(this._name, callback)
        }

        return { dispose }
    }

    public dispatch(val?: T): void {
        this._eventObject.emit(this._name, val)
    }
}
