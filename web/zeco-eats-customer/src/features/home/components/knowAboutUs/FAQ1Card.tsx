import Image from "next/image";

interface fnProps{
  title: string
  imagePath: string
  desc:string
}

export default function FAQ1Card({title, imagePath, desc}:fnProps) {
  return (
    <div className="h-[15rem] w-[17rem] space-y-6 rounded-lg bg-background flex flex-col justify-center items-center">
      
      <p className="text-lg font-bold text-secondary">{title}</p>
        <Image
          alt=" image about food"
          src={imagePath}
          height={200}
          width={200}
          style={{ width: "5rem", height: "5rem" }}
        />
      <p className="text-black">{desc}</p>
      </div>
    
  );
}
