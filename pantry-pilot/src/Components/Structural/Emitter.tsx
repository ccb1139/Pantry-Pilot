import React from 'react';

export enum Events {
    SET_TITLE = 'set_title'
    // use an enum to keep track of events similar to action types set as variables in redux
}

interface EventsMap {
    [key: string]: ((data: any) => any)[];
}

export const eventEmitter = {
    _events: {} as EventsMap,
    dispatch(event: string, data: any) : void{
        if (!this._events[event]) return;
        this._events[event].forEach(callback => callback(data))
    },
    subscribe(event: string, callback: (data: any) => any): void {
        if (!this._events[event]) this._events[event] = [];
        this._events[event].push(callback);
    },
    unsubscribe(event: string): void {
        if (!this._events[event]) return;
        delete this._events[event];
    }
}
