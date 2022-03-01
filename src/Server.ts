import dgram = require('dgram');
import {IClient, MessageType, Address, IMessage} from './Interfaces'



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
        this.socket.on('message', (msg, rinfo) => {
            console.log(JSON.parse(msg.toString('utf8')), rinfo);
        const message = JSON.parse(msg.toString('utf8'))
            if (MessageType.REGISTRATION === message.type) {
                this.clients[message.source.id] = {
                    id: message.source.id,
                    username: message.source.username,
                    address: {
                        ip: rinfo.address,
                        port: rinfo.port
                    }
                }   
            }
            else if (MessageType.LEAVE === message.type){ 
                delete this.clients[message.source.id]
            }
            else if (MessageType.MESSAGE === message.type) {
               console.log('any') 
               if (this.clients[message.destination]){
                   console.log('if', this.clients[message.destination])
                    this.socket.send(message.payload, this.clients[message.destination].address.port, this.clients[message.destination].address.ip, (error)=> {
                      console.log('errore')  
                      if (error){
                            console.log(error)
                        }

                    })
                }
            }
            else if (MessageType.BROADCAST === message.type) {
                for (const client of Object.keys(this.clients)) {
                    this.socket.send(message.payload, this.clients[client].address.port, this.clients[client].address.ip)
                }
                
            }
    
        })
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


    


