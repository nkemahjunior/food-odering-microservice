import Heading from "@/shared/components/text/Heading";
import MenuCard from "./MenuCard";

interface fnProps {
  menuIndex: number;
  menuRefs: Record<"current", (HTMLDivElement | null)[]>;
  testEl: string;
}

export default function MenuItem({ menuIndex, menuRefs, testEl }: fnProps) {

  const fakeArr = Array.from({ length: 12 }, (_, i) => i + 1);
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
      className={`h-fit scroll-mt-[55rem] py-4 lg:space-y-8 lg:py-0`}
    >
      <Heading text={testEl} />
      <div className="grid w-full grid-cols-1 lg:gap-y-4 divide-y-[1px] divide-backgroundBorder lg:grid-cols-2 lg:gap-x-3 lg:divide-y-0">
        {fakeArr.map((el, i) => (
          <MenuCard key={el} id={i} />
        ))}
      </div>
    </div>
  );
}
