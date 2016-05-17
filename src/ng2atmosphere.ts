/// <reference path="../typings/index.d.ts" />

import {Injectable} from 'angular2/core';
import * as Rx from 'rxjs';
import * as atmosphere from 'atmosphere.js';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SocketService {
    public eventsSubject: Rx.Subject<any> = new Rx.Subject<any>();

    private socket: Atmosphere.Atmosphere;
    private subSocket: any;
    private request: Atmosphere.Request;

    public dataStream: Subject<any> = new Subject<any>();

    constructor(private url: string, private config?: Atmosphere.Request) {
        this.request = config || <Atmosphere.Request>{
            url: this.url,
            contentType: 'application/json',
            logLevel: 'debug',
            transport: 'websocket',
            fallbackTransport: 'long-polling',
            onOpen: (response: Atmosphere.Response) => {
                console.log('Atmosphere connected using ' + response.transport);
            },
            onMessage: (response: Atmosphere.Response) => {
                this.dataStream.next(response);
            },
            onClose: (response: Atmosphere.Response) => {
                this.dataStream.complete();
            },
            onError: (response: Atmosphere.Response) => {
                this.dataStream.error(response);
            }
        };

        this.subSocket = this.socket.subscribe(this.request);
    }

    public send(data: any) {
        this.subSocket.push(data);
    }
}
