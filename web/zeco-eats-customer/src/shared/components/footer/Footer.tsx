import FooterSubscribe from "./FooterSubscribe";
import FooterLegal from "./FooterLegal";
import FooterImportant from "./FooterImportant";


export default function Footer() {
    
  return (
    <>
      {" "}
      <div className="flex flex-col space-y-10 lg:flex-row lg:justify-around lg:space-y-0">
        <FooterSubscribe />
        <FooterLegal />
        <FooterImportant />
      </div>

    </>
  );
}
