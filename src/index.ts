//import Client from './Client'; 
import Server from './Server';

//export {Client, Server};

const server = new Server();
const port = 8000;
const callback = (port) => {console.log('Server listening on port: ', port)}
server.listen(callback); 