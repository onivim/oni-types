import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/auditTime";
import "rxjs/add/operator/combineLatest";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/takeLast";
import "rxjs/add/operator/withLatestFrom";
import { IDisposable } from "./IDisposable";
export declare type EventCallback<T> = (value: T) => void;
export interface IEvent<T> {
    subscribe(callback: EventCallback<T>): IDisposable;
    asObservable(): Observable<T>;
}
export declare class Event<T> implements IEvent<T> {
    private _name;
    private _eventObject;
    private _subject;
    constructor(name?: string);
    subscribe(callback: EventCallback<T>): IDisposable;
    dispatch(val?: T): void;
    asObservable(): Observable<T>;
}
