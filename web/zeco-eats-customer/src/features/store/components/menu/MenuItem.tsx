import Heading from "@/shared/components/text/Heading";

 interface fnProps {
   menuIndex: number;
   menuRefs: Record<"current", (HTMLDivElement | null)[]>;
   testEl: string;
 }

 
export default function MenuItem({menuIndex, menuRefs, testEl}:fnProps) {
    return (
      <div
        data-value={menuIndex}
        key={menuIndex}
        ref={(elementNode) => {
          if (!menuRefs.current[menuIndex]) {
            //use element id when real data comes
            menuRefs.current[menuIndex] = elementNode;
          }
        }}
        className="h-[30rem] scroll-mt-[16rem] border-2 border-solid border-pink-700"
      >
        <Heading text={testEl} />1 body
      </div>
    );
}