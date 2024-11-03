import OrderProcess from "./OrderProcess";

 
 
export default function HeroOrderProcesses() {
  return (
    <div className="z-10 -ml-4 mt-12 w-full space-y-10 2xl:mt-24">
      <OrderProcess
        processNum={1}
        processDetail1="We've Received your order!"
        processDetail2="Awaiting Restaurant acceptance"
      />

      <div className="ml-24">
        <OrderProcess
          processNum={2}
          processDetail1="Order Accepted!  ✅"
          processDetail2="Your order will be delivered shortly"
        />
      </div>

      <div className="ml-10">
        <OrderProcess
          processNum={3}
          processDetail1="Your rider is nearby  🎉"
          processDetail2="They're are almost there, get ready!"
        />
      </div>
    </div>
  );
}