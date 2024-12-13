 
 
export default function CardTitle({text, textColor, className }:{text:string, textColor?:string, className?:string}) {
    return (
        <p className={`text-lg font-medium ${textColor ? textColor : ' text-black'} ${className} `}>{text}</p>
    );
}