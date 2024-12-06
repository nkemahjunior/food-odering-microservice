 
 
export default function CardTitle({text, textColor }:{text:string, textColor?:string}) {
    return (
        <p className={`text-lg font-medium ${textColor ? textColor : ' text-black'}`}>{text}</p>
    );
}