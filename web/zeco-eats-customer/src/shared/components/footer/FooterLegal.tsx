import Link from "next/link";

 
 
export default function FooterLegal() {
    return (
      <div className="space-y-4">
        <h6 className="text-lg font-bold text-secondary">Legal Pages</h6>
        <div className="space-y-4 text-black">
          <Link href={""} className="block underline">
            Terms and conditions
          </Link>
          <Link href={""} className="block underline">
            Privacy
          </Link>
          <Link href={""} className="block underline">
            Cookies
          </Link>
          <Link href={""} className="block underline">
            Modern Slavery Statement
          </Link>
        </div>
      </div>
    );
}