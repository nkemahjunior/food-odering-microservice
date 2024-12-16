 
 
export default function SelectionStatus({status}:{status:string}) {
    return (
      <p className="rounded-full bg-background px-4 py-1 font-medium">
        {status}
      </p>
    );
}