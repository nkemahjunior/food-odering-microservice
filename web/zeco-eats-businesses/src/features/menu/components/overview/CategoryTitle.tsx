 
 
export default function CategoryTitle({category, itemsQty, i}:{category:string, itemsQty:number, i:string}) {
    return (
      <div className="flex flex-col justify-center">
            <span className="font-medium">{ category + i}</span>
        <span className="text-textTint">{itemsQty} items</span>
      </div>
    );
}