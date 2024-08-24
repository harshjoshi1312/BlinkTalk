import { Server } from "socket.io"

const ConnectToSocket = (server) => {
    const io = new Server(server);

    return io;
}

export default ConnectToSocket;