"use strict";
/**
 * oni-types
 *
 * Common types used by Oni
 */
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/auditTime");
require("rxjs/add/operator/combineLatest");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/do");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
require("rxjs/add/operator/merge");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/takeLast");
require("rxjs/add/operator/withLatestFrom");
class Event {
    constructor(name) {
        this._eventObject = new events_1.EventEmitter();
        this._subject = null;
        this._name = name || "default_event";
    }
    subscribe(callback) {
        this._eventObject.addListener(this._name, callback);
        const dispose = () => {
            this._eventObject.removeListener(this._name, callback);
        };
        return { dispose };
    }
    dispatch(val) {
        if (this._subject) {
            this._subject.next(val);
        }
        this._eventObject.emit(this._name, val);
    }
    asObservable() {
        if (!this._subject) {
            this._subject = new Subject_1.Subject();
        }
        return this._subject;
    }
}
exports.Event = Event;
