import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const SERVER_ADDR = "http://127.0.0.1:4001";

const SERVER_EMIT = "SOCKET EMIT";
const CLIENT_CONNECTION_REQUEST = "CLIENT CONNECTION REQUEST";
const CLIENT_REQUEST = "CLIENT REQUEST";

class ClientApp extends React.Component {
  constructor() {
    super();

    this.state = { id: "001", serverEmit: ""};
    this.client_socket = socketIOClient(SERVER_ADDR);
  }

  componentDidMount() {
    this.client_socket.emit(CLIENT_CONNECTION_REQUEST, this.state.id);
    this.client_socket.on(SERVER_EMIT, (res)=>{
      this.setState({serverEmit: res})
    })
  }

  handleFireEmit(message){
    this.client_socket.emit(CLIENT_REQUEST, message);
  }

  render() {
    return (
      <div>
        <h1>Test Client {this.state.id}</h1>
        <h1>Server Emit: {this.state.serverEmit}</h1>
        <button onClick={()=>{this.handleFireEmit("test1")}}>Fire a Emit to Server</button>
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <ClientApp></ClientApp>
    </div>
  );
}

export default App;
