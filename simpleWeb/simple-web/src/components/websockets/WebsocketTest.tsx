"use client";

import { auth } from "@/app/auth";
import { Client, Stomp } from "@stomp/stompjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";






export default function WebsocketTest () {
  let client: Client | null = null;

  //const socket = new SockJS()

   const [result, setResult] = useState('');
  const router = useRouter()
  const [oderId, setoderId] = useState("");
  const accessToken = useSession()
  if(!accessToken.data?.accessToken) router.push('/')

  useEffect(() => {
    // Create a WebSocket connection

    client = new Client();

    // Configure the WebSocket endpoint URL
    //const websocketUrl = "ws://localhost:8083/socket"; // Replace with your WebSocket endpoint URL
  
  
    //const sock = new SockJS("http://localhost:8084/socket/deliveries"); //pass through gateway -> delivery service
    const sock = new SockJS("http://zeco-eats-asg-loadbalancer-1871376648.us-east-1.elb.amazonaws.com/socket/deliveries"); //pass through alb-> gateway -> delivery service

    sock.onopen = () => {
        console.log('Transport used by SockJS:'); // Logs the transport mode (e.g., "websocket", "xhr-streaming", etc.)
      };

    // Connect to the WebSocket server
    client.configure({
      //brokerURL: websocketUrl, connect directly, if u are not using sock js
      debug: function (str: any) {
        console.log(str);
      },
      webSocketFactory: () => sock,
      // connectHeaders: {
      //   'authorization': `Bearer ${accessToken.data?.accessToken}` // authenicate at websocket channel interceptor
      // },


      onConnect: () => {
        // Perform actions after successful connection
        //the order id- 1 ,means this particular client is connected with the server on this unique path
        const destination = `/queue/oder/location/1`; // Specify the destination for the server-side message handler
        console.log("connectedddddddddddddddddd");

        client &&
          client.subscribe(destination, (message) => {
            console.log("Received message:");

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


  const fetchData = async () => {
    try {
      //http://localhost:8084/_p/api/deliveries/testPrivate
      const response = await fetch('http://zeco-eats-asg-loadbalancer-1871376648.us-east-1.elb.amazonaws.com/api/deliveries/actuator/health', {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${accessToken.data?.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.text();
      setResult(data); // Assuming the response is "working"
    } catch (error) {
      console.error('Error fetching data:', error);
      setResult('Error fetching data');
    }
  };






  return (
    <div className=" h-screen flex flex-col gap-y-8 justify-center items-center" >
      <p>
        {/* <input className=" border-2 border-red-600 border-solid"
          type="text"
          aria-label="ChatId"
          onChange={(event) => {
            console.log(event);
            setoderId(event.target.value);
          }}
        ></input> */}
        <button className=" px-4 py-3 rounded-lg bg-white text-black hover:bg-stone-200 cursor-pointer"
          onClick={() => {
            const destination = `/app/driver/location/`; // Specify the destination for the server-side message handler
            const message = {
              orderID: 1,
              latitude: 20.0,
              longitude: 30.44,
            };

            if (client != null) {
              client.publish({
                destination,
                body: JSON.stringify(message),
              });
            }
          }}
        >
          Send
        </button>
      </p>

       <div>
      <button  className=" px-4 py-3 rounded-lg bg-white text-black hover:bg-stone-200 cursor-pointer" onClick={fetchData}>Fetch Data</button>
      <p>{result}</p>
    </div>
    </div>
  );
}