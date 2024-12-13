"use client";
import { useEffect, useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";
import MenuTimeAndSearch from "./MenuTimeAndSearch";
import MenuTitle from "./MenuTitle";
import CurrentMenuIndicator from "./CurrentMenuIndicator";
import MenuItem from "./MenuItem";

export default function Menu() {
  // const menuTitleRefs = useRef<Record<number, HTMLSpanElement | null>>({});
  const [menuTitleDimension, setmenuTitleDimension] = useState({
    left: 0,
    width: 0,
  });
  const [manualScroll, setManualScroll] = useState(false);
  const [scrollContainerWidth, setScrollContainerWidth] = useState(0);

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const menuTitleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

  const titles = [
    "Sides",
    "Sandwiches",
    "Burgers",
    "All Day Dine",
    "Toasts",
    "Desserts",
    "Saver Menu",
    "Soft Drinks",
    "Coffees",
    "Hot Teas",
    "Iced Teas",
    "Juices",
    "Beers and Ciders",
    "Wines",
    "Bubbles",
    "Smoothies",
    "Mocktails",
    "Cocktails",
    "Spirits",
    "Milkshakes",
    "Appetizers",
    "Soups",
    "Salads",
    "Main Course",
    "Kids Menu",
  ];

  useEffect(() => {
    const curMenuTitle = menuTitleRefs.current[0];
    setmenuTitleDimension({
      left: curMenuTitle!.offsetLeft,
      width: curMenuTitle?.getBoundingClientRect().width!,
    });
    setScrollContainerWidth(scrollAreaRef.current!.scrollWidth);
  }, []);


  useEffect(() => {
    function observerCallback(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const value = Number((entry.target as HTMLDivElement).dataset.value);
          const curMenuTitle =
            menuTitleRefs.current[value]?.getBoundingClientRect();
          const scrollAreaRect = scrollAreaRef.current!.getBoundingClientRect();

          if (
            //60% of visible part of the scroll box
            curMenuTitle!.right >= 0.6 * scrollAreaRect.right &&
            !manualScroll
          ) {
            menuTitleRefs.current[value + 2]?.scrollIntoView({
              behavior: "auto",
              block: "nearest",
              inline: "nearest",
            });
          }

          if (
            //40% of visible part of the scroll box
            curMenuTitle!.right <= 0.4 * scrollAreaRect.right &&
            !manualScroll
          ) {
            menuTitleRefs.current[value - 2]?.scrollIntoView({
              behavior: "auto",
              block: "nearest",
              inline: "start",
            });
          }

          //width and left changes when title scroll into view
          const newLeft = menuTitleRefs.current[value]?.offsetLeft!;
          const newWidth =
            menuTitleRefs.current[value]?.getBoundingClientRect()?.width!;
          setmenuTitleDimension({
            left: newLeft,
            width: newWidth,
          });
        }
      });
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    });

    menuRefs.current.forEach((el, index) => {
      if (el) observer.observe(el);
    });

    return () => {
      menuRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [menuTitleRefs,menuRefs, scrollAreaRef, manualScroll]);

  
  return (
    <>
      <div className="sticky top-[12.5rem] w-full border-2 border-solid border-green-600">
        <MenuTimeAndSearch />

        <div className="flex w-full items-center space-x-4">
          <div className="w-[2%] border-2 border-solid border-purple-800">
            <BiMenu size={20} />
          </div>

          <div className="w-[97%] border-4 border-solid border-red-700">
            <div
              ref={scrollAreaRef}
              //ofset parent
              className="scrollbar-hidden relative flex w-full flex-col space-y-4 overflow-x-auto border-2 border-solid border-yellow-400"
            >
              <div className="flex w-full items-center space-x-8">
                {" "}
                {titles.map((el, i) => (
                  <MenuTitle
                    key={i}
                    titleIindex={i}
                    manualScroll={setManualScroll}
                    menuRefs={menuRefs}
                    menuTitleRefs={menuTitleRefs}
                    testEl={el}
                  />
                ))}
              </div>

              <CurrentMenuIndicator scrollContainerWidth={scrollContainerWidth} menuTitleDimension={menuTitleDimension}/>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {titles.map((el, i) => (
          <MenuItem key={i} menuIndex={i} menuRefs={menuRefs} testEl={el} />
        ))}
      </div>
    </>
  );
}