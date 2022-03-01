import Client from './Client';
import Server from './Server';

//export {Client, Server};

const server = new Server();
const port = 8000;
const callback = async (port) => {
    console.log('Server listening on port: ', port)
    const client = new Client(1, 'Lorenzo');
    const client2 = new Client (2, 'Luigi')
    const ip = 'localhost';
    await client.connect({ ip, port })
    await client2.connect({ip, port})
    await client.send('message', 2);
    await client.broadcast('ciao');
    setTimeout(async()=>{
        await client.disconnect();
        await client2.disconnect();
        setTimeout(() =>{
            server.shutdown();
        }, 1000)
    }, 1000)
}
server.listen(callback);
