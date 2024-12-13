"use client";

interface fnProps {
  titleIindex: number;
  manualScroll: (arg: boolean) => void;
  menuRefs: Record<"current", (HTMLDivElement | null)[]>;
    menuTitleRefs: Record<"current", (HTMLSpanElement | null)[]>;
    testEl:string
}

export default function MenuTitle({
  manualScroll,
  menuRefs,
  menuTitleRefs,
    titleIindex,
  testEl
}: fnProps) {
  function scrollToMenu(index: number) {
    manualScroll(true);
    menuRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setTimeout(() => {
      manualScroll(false);
    }, 1000);
  }

  return (
    <span
      onClick={() => scrollToMenu(titleIindex)}
      data-value={titleIindex}
      key={titleIindex}
      ref={(elementNode) => {
        if (!menuTitleRefs.current[titleIindex]) {
          //use element id when real data comes
          menuTitleRefs.current[titleIindex] = elementNode;
        }
      }}
      className="block w-fit px-2 py-3  transition-colors duration-300 cursor-pointer hover:bg-backgroundShade1  text-nowrap  font-medium"
    >
      {testEl}
    </span>
  );
}
