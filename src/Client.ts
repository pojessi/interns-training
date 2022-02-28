import { Address } from "../src/Interfaces";
import dgram = require ('dgram'); 

class Client {

    private id: number;
    private username: string;
    private socket: dgram.Socket;
    private server: Address;

    constructor(id:number,username:string){
        this.id= id;
        this.username = username;
        this.socket = dgram.createSocket('udp4');
    }

    public connect(server?: Address): Promise <Address> {
        return new Promise <Address> ((resolve, rejects) => {
        const msg = "stringa";
        this.server = server;
      
        if (!server){
           this.server = {ip: 'localhost', port:8000};
       }
       const callback = (error: Error, bytes: number) => {
            if (error) {
            rejects(error)
            }
            else {
            resolve(this.server)    
            }
       }
       this.socket.send(msg, this.server.port, this.server.ip, callback)
    }) ; 
    






}


