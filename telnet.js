var net = require('net');
var BufferStream = require('./BufferStream')
module.exports = exports = class Telnet {
    constructor() {
        this.clients = [];
        this.server = net.createServer(socket => this.create(socket));
        this.server.listen(23);
    }

    create(socket){
        let bufStr = "IAC DO LINEMODE";
        var buf = new Buffer([255, 253, 1 ]);
        var stream = new BufferStream(buf);
        stream.pipe(socket);
        socket.write("hello");
        this.clients.push(socket);
        socket.on('data', data => this.data(data, socket));
        socket.on('end', () => this.end(socket))
    }
    data(data, socket){
        console.log(data);
    }
    end(socket){

    }
}