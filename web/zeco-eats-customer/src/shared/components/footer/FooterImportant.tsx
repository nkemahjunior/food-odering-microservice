import Link from "next/link";

 
 
export default function FooterImportant() {
    return (
      <div className="space-y-4">
        <h6 className="text-lg font-bold text-secondary">Important Links</h6>
        <div className="space-y-4 text-black">
          <Link href={""} className="block underline">
            Get help
          </Link>
          <Link href={""} className="block underline">
            Add your restaurant
          </Link>
          <Link href={""} className="block underline">
            Signup to deliver
          </Link>
          <Link href={""} className="block underline">
            Create a business account
          </Link>
        </div>
      </div>
    );
}