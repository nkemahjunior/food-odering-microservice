"use client";
import { useEffect, useRef, useState } from "react";
import { BiMenu } from "react-icons/bi";
import MenuTimeAndSearch from "./MenuTimeAndSearch";
import MenuTitle from "./MenuTitle";
import CurrentMenuIndicator from "./CurrentMenuIndicator";
import MenuItem from "./MenuItem";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useDeviceType } from "@/shared/hooks/useDeviceType";

export default function Menu() {
  // const menuTitleRefs = useRef<Record<number, HTMLSpanElement | null>>({});
    const { isMobile } = useDeviceType();
    
  const [menuTitleDimension, setmenuTitleDimension] = useState({
    left: 0,
    width: 0,
  });
  const [manualScroll, setManualScroll] = useState(false);
  const [scrollContainerWidth, setScrollContainerWidth] = useState(0);
  const [disableBtn, setDisableBtn] = useState({
    forward: true,
    backward: false,
  });

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
    // "Smoothies",
    // "Mocktails",
    // "Cocktails",
    // "Spirits",
    // "Milkshakes",
    // "Appetizers",
    // "Soups",
    // "Salads",
    // "Main Course",
    // "Kids Menu",
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
          setDisableBtn({
            forward: value == titles.length - 1,
            backward: value == 0,
          });

          const curMenuTitle =
            menuTitleRefs.current[value]?.getBoundingClientRect();
          const scrollAreaRect = scrollAreaRef.current!.getBoundingClientRect();

          if (
            //60% of visible part of the scroll box
            curMenuTitle!.right >= 0.6 * scrollAreaRect.right &&
            !manualScroll
          ) {
            const index =
              value + 2 > titles.length - 1 ? titles.length - 1 : value + 2;
            menuTitleRefs.current[index]?.scrollIntoView({
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
            const index = value - 2 < 0 ? 0 : value - 2;
            menuTitleRefs.current[index]?.scrollIntoView({
              behavior: "auto",
              block: "nearest",
              inline: "start",
            });
          }

          //width and left changes when title scroll into view
          const newLeft = menuTitleRefs.current[value]?.offsetLeft!;
          const newWidth =
            menuTitleRefs.current[value]?.getBoundingClientRect()?.width!;
          setTimeout(() => {
            setmenuTitleDimension({
              left: newLeft,
              width: newWidth,
            });
          }, 200);
        }
      });
    }

    
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px ",
      threshold: isMobile ? 0.2 : 0.5, //0.5
    });

    menuRefs.current.forEach((el, index) => {
      if (el) observer.observe(el);
    });

    return () => {
      menuRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [menuTitleRefs, menuRefs, scrollAreaRef, manualScroll, isMobile /*disableBtn*/]);

  const scrollMenuOnClick = (direction: "forward" | "backward") => {
    setManualScroll(true);
    const index = direction == "forward" ? titles.length - 1 : 0;
    menuRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setTimeout(() => {
      setManualScroll(false);
    }, 1000);
  };



  return (
    <>
      <div className="sticky top-16 z-10 w-full space-y-6 bg-white lg:top-24 2xl:top-[12.48rem]">
        <MenuTimeAndSearch />

        <div className="flex w-full items-center space-x-4">
          <div className="w-[2%]">
            <BiMenu size={20} />
          </div>

          <div className="w-[97%] lg:w-[88%]">
            <div
              ref={scrollAreaRef}
              onClick={() => {
                console.log(
                  "height ",
                  scrollAreaRef.current?.getBoundingClientRect(),
                );
                console.log("offset ", scrollAreaRef.current?.offsetHeight);
                console.log(
                  "scroll top ",
                  scrollAreaRef.current?.scrollHeight,
                  " scroll left ",
                  scrollAreaRef.current?.scrollLeft,
                );
              }}
              //ofset parent
              className="scrollbar-hidden relative flex w-full flex-col overflow-x-auto"
            >
              <div className="flex w-full items-center space-x-4 lg:space-x-8">
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

              <CurrentMenuIndicator
                scrollContainerWidth={scrollContainerWidth}
                menuTitleDimension={menuTitleDimension}
              />
            </div>
          </div>

          <div className="hidden w-[8%] lg:block">
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => scrollMenuOnClick("backward")}
                className={`flex items-center justify-center rounded-full ${disableBtn.backward ? "cursor-not-allowed bg-background text-stone-400" : "bg-backgroundShade1 hover:bg-backgroundShade2"} p-3`}
                disabled={disableBtn.backward}
              >
                <span>
                  <BsArrowLeft size={20} />
                </span>
              </button>
              <button
                onClick={() => scrollMenuOnClick("forward")}
                className={`flex items-center justify-center rounded-full ${disableBtn.forward ? "cursor-not-allowed bg-background text-stone-400" : "bg-backgroundShade1 hover:bg-backgroundShade2"} p-3`}
                disabled={disableBtn.forward}
              >
                <span>
                  <BsArrowRight size={20} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 divide-y-4 divide-backgroundBorder bg-white lg:space-y-8 lg:divide-y-0">
        {titles.map((el, i) => (
          <MenuItem key={i} menuIndex={i} menuRefs={menuRefs} testEl={el} />
        ))}
      </div>
    </>
  );
}
