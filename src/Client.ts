import { Address, MessageType, IMessage } from "./Interfaces";
import dgram = require('dgram');
import { rejects } from "node:assert";
import { Socket } from "dgram";

export default class Client {

    private id: number;
    private username: string;
    private socket: dgram.Socket;
    private server: Address;

    constructor(id: number, username: string) {
        this.id = id;
        this.username = username;
        this.socket = dgram.createSocket('udp4');
    }

    public connect(server?: Address): Promise<Address> {
        return new Promise<Address>((resolve, rejects) => {
            const msg: IMessage = {
                source: {
                    id: this.id,
                    username: this.username
                },
                type: MessageType.REGISTRATION,
            }
            this.server = server;

            if (!server) {
                this.server = { ip: 'localhost', port: 8000 };
            }
            const callback = (error: Error, bytes: number) => {
                if (error) {
                    rejects(error)
                }
                else {
                    resolve(this.server)
                }
            }
            this.socket.on('message', (msg,rinfo)=> {
                console.log(msg.toString('utf8'), this.id)
            })
            this.socket.send(JSON.stringify(msg), this.server.port, this.server.ip, callback)
        });
    }

    public disconnect(): Promise<void> {
        return new Promise((resolve) => {
            const msg: IMessage = {
                source: {
                    id: this.id,
                    username: this.username
                },
                type: MessageType.LEAVE,    
            }
            this.socket.send(JSON.stringify(msg), this.server.port, this.server.ip, () => {
                this.socket.close(resolve)
                this.socket = dgram.createSocket('udp4')
            })
        })
    }
    public send(message: string, to: number): Promise<void> {
        return new Promise((resolve, rejects) => {
            const callback = (error: Error, bytes: number) => {
                if (error) {
                    rejects(error)
                }
                else {
                    resolve()
                }
            }
            const msg: IMessage = {
                source: {
                    id: this.id,
                    username: this.username
                },
                type: MessageType.MESSAGE,
                payload: message,
                destination: to
            }
            this.socket.send(JSON.stringify(msg), this.server.port, this.server.ip, callback)

        })
    }
    public broadcast(message: string): Promise <void> {
        return new Promise ((resolve,rejects) => {
            const callback = (error: Error, bytes: number) => {
                if (error) {
                    rejects(error)
                }
                else {
                    resolve()
                }
            }
            const msg: IMessage = {
                source: {
                    id: this.id,
                    username: this.username
                },
                type: MessageType.BROADCAST,
                payload: message    
            }
            this.socket.send(JSON.stringify(msg), this.server.port, this.server.ip, callback)
            
        })
    }






}


