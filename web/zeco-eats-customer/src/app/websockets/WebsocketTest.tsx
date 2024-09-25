 "use client"

import { Client, Stomp } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";



 
export default function () {



    let client: Client | null = null;
    

    //const socket = new SockJS()

  const [oderId, setoderId] = useState("")

  useEffect(() => {
    // Create a WebSocket connection

    client = new Client();

    // Configure the WebSocket endpoint URL
    const websocketUrl = 'ws://localhost:8083/socket'; // Replace with your WebSocket endpoint URL
     const sock = new SockJS('http://localhost:8083/socket');

    // sock.onopen = () => {
    //     console.log('Transport used by SockJS:'); // Logs the transport mode (e.g., "websocket", "xhr-streaming", etc.)
    //   };

    // Connect to the WebSocket server
    client.configure({
      //brokerURL: websocketUrl,
      debug: function (str) {
        console.log(str);
      },

     webSocketFactory: () => sock,

      onConnect: () => {
        // Perform actions after successful connection
        const destination = `/queue/oder/location/1`; // Specify the destination for the server-side message handler
        console.log("connectedddddddddddddddddd");

    
       
            client && client.subscribe(destination, (message) => {
                console.log('Received message:');
                
                console.log(message.body);
                // Process the received message as needed
              });
        
      },
      // You can add more event handlers and configuration options as needed
    });



    // Connect to the WebSocket server
    client.activate();


    // Clean up the connection on component unmount
    return () => {
      client && client.deactivate();
    };
  }, [oderId]);

//   long orderID,
//   double latitude,
//   double longitude


    return (
        <div>
            <p>
          <input type='text' aria-label='ChatId' onChange={(event) => {
            console.log(event)
            setoderId(event.target.value)
          }}></input>
          <button onClick={() => {
            const destination = `/app/driver/location/`; // Specify the destination for the server-side message handler
            const message = {
                orderID: 1,
                latitude: 20.00,
                longitude: 30.44
            }


            if (client != null) {

              client.publish({
                destination,
                body: JSON.stringify(
                    message
                ),
              });
            }


          }}>Send</button>
        </p>
            
        </div>
    );
}