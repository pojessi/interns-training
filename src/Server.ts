import dgram = require('dgram');
import {IClient} from '../src/Interfaces'
import {MessageType} from '../src/Interfaces';
import {Address} from '../src/Interfaces';
import {IMessage} from '../src/Interfaces';


export default class Server {

    private port: number;
    private socket: dgram.Socket;
    private clients: {[id: number] : IClient};

    constructor() {
        this.socket = dgram.createSocket('udp4');
        this.clients = {}; 

    }


    public listen(port?: number | ((port: number) => void), callback?:(port: number) => void) :void {
        if (typeof port === "function") {
            callback = port;
            port = undefined;
        }
        
        if (!port) {
            port = 8000;
        }
        
        this.port = port as number;
        this.socket.bind(port as number, () => {
        if (callback) {
            callback(port as number)}
        })

    }    

    public shutdown(callback?:() => void): void {
        this.socket.close(callback)
        this.socket = dgram.createSocket('udp4');
    }

   
    
   
    
  


}


    


