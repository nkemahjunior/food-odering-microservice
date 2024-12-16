import Heading from "@/shared/components/text/Heading";

 
 
export default function DishDescModal() {
    return (
      <div className="space-y-2 border-b-[1px] border-solid border-backgroundBorder pb-6">
        <Heading text="Pesto Mozzarella" />
        <p className="text-lg text-storeTextColorTint lg:text-xl">£99.99</p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
          velit id quam asperiores officiis illum at veniam deleniti! Tenetur
          minima enim harum placeat fuga eaque?
        </p>
      </div>
    );
}