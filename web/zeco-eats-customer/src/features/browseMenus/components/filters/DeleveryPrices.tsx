 
 
export default function DeliveryPrices() {
    return (
      <div className="relative h-4 border-0 border-solid border-purple-900 text-sm">
        <div className="absolute left-0">£1</div>
        <div className="absolute left-[6rem] lg:left-[6.5rem]">£2</div>
        <div className="absolute left-[12.5rem] lg:left-[13.8rem]">£3</div>
        <div className="absolute left-[19rem] top-0 lg:left-[21.5rem]">£4+</div>
      </div>
    );
}