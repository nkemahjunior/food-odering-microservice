"use client";
import Heading from "@/shared/components/text/Heading";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BiMenu, BiSearch } from "react-icons/bi";

export default function MenuHead() {
  const [focus, setFocus] = useState(false);
  // const menuTitleRefs = useRef<Record<number, HTMLSpanElement | null>>({});
  const menuTitleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const menuRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const menuTitlesAreaRef = useRef<HTMLDivElement | null>(null);
  const [visibleTitles, setVisibleTitles] = useState<Record<number, boolean>>({0:true});
  const [menuTitleDimension, setmenuTitleDimension] = useState({
    left: 0,
    width: 0,
  });

  const [curMenuVal, setCurMenuVal] = useState(0);
  const mainRef = useRef<HTMLDivElement | null>(null);

  //titleRefs.
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
  ];

  useEffect(() => {
    const curMenuTitle = menuTitleRefs.current[0]?.getBoundingClientRect();

    setmenuTitleDimension({
      left: curMenuTitle?.left!,
      width: curMenuTitle?.width!,
    });
  }, []);


  useEffect(() => {
    function observerCallback(entries: IntersectionObserverEntry[]) {
      const [entry] = entries;
      //setCurTitleVisible(entry.isIntersecting);
      // setVisibleTitles
      // setVisibleTitles(arr)
     
      console.log(
        " an entryyy ",
        (entry.target as HTMLDivElement).dataset.value," ", entry.isIntersecting
      );
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: mainRef.current,
      rootMargin: "0px 0px 0px 0px",
      threshold: 0.5,
    });

    

    menuTitleRefs.current.forEach((el, index) => {
      if (el) observer.observe(el);
    });

    return () => {
      menuTitleRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  useEffect(
    () => {
      let scrollTimeout: any;
      let scrollTimeout2: any;
      function observerCallback(entries: IntersectionObserverEntry[]) {
        const [entry] = entries;

        if (entry.isIntersecting) {
          const value = Number((entry.target as HTMLDivElement).dataset.value)
          if (!visibleTitles.at(value)) {
            scrollTimeout = setTimeout(() => {
              console.log("okkkkkkkkkkkkkkkkkkkkkkkkk");
              console.log("what are u ", value," ", visibleTitles.at(value));
              menuTitleRefs.current[value]?.scrollIntoView({
                behavior: "smooth", // smooth scrolling
                block: "nearest", // "nearest" prevents unnecessary vertical scrolling
                inline: "start", // align the element to the start of the scrollable area horizontally
              });
              console.log("yesssssssssssssss");
            }, 1000);
          }
          //console.log("entry ", entry);

          // console.log("valueMenu div ", value);
          scrollTimeout2 = setTimeout(() => {
            const curMenuTitle =
              menuTitleRefs.current[value]?.getBoundingClientRect();

            //setCurMenuVal(value);
            setmenuTitleDimension({
              left: curMenuTitle?.left!,
              width: curMenuTitle?.width!,
            });
          }, 1200);
        }
      }

      const observer = new IntersectionObserver(observerCallback, {
        root: null,
        rootMargin: "205px 0px 0px 0px",
        threshold: 0.2,
      });

      menuRefs.current.forEach((el, index) => {
        if (el) observer.observe(el);
      });

      return () => {
        clearTimeout(scrollTimeout);
        clearTimeout(scrollTimeout2);
        menuRefs.current.forEach((el) => {
          if (el) observer.unobserve(el);
        });
      };
    },
    [
      /*curMenuVal*/
    ],
  );

  return (
    <>
      {/* <button
        onClick={(el: React.MouseEvent) => {
          console.log("scrolling into view");
          console.log(
            "#########",
            menuTitleRefs.current[14]?.getBoundingClientRect(),
          );
          menuTitleRefs.current[14]?.scrollIntoView({
            behavior: "smooth", // smooth scrolling
            block: "nearest", // "nearest" prevents unnecessary vertical scrolling
            inline: "start", // align the element to the start of the scrollable area horizontally
          });
        }}
      >
        test
      </button> */}
      <div
        className="sticky top-[12.5rem] w-full border-2 border-solid border-green-600"
        ref={mainRef}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Menu</p>
            <p className="text-storeTextColorTint">9:00 AM - 5:30 PM</p>
          </div>

          <div
            className={`flex items-center space-x-3 overflow-hidden rounded-3xl border-2 border-solid ${focus ? "border-secondary bg-white" : "border-backgroundShade1 bg-backgroundShade1"} pl-4`}
          >
            <span className="flex h-full items-center">
              <BiSearch />
            </span>
            <input
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              type="text"
              className="w-[20rem] bg-inherit py-2 outline-none placeholder:text-storeTextColorTint"
              placeholder="Search in The Place Restaurant"
            />
          </div>
        </div>

        <div className="flex w-full items-center space-x-4">
          <div className="w-[2%] border-2 border-solid border-purple-800">
            <BiMenu size={20} />
          </div>

          <div className="w-[97%] border-2 border-solid border-red-700">
            <div
              className="scrollbar-hidden flex w-full items-center space-x-8 overflow-x-auto border-2 border-solid border-yellow-400"
              ref={menuTitlesAreaRef}
            >
              {" "}
              {titles.map((el, i) => (
                <span
                  data-value={i}
                  key={i}
                  ref={(elementNode) => {
                    if (!menuTitleRefs.current[i]) {
                      //use element id when real data comes
                      menuTitleRefs.current[i] = elementNode;
                    }
                  }}
                  className="block w-fit text-nowrap border-2 border-solid border-red-600 font-medium"
                  onClick={(el: React.MouseEvent) => {
                    console.log(
                      "clicked title",
                      el.currentTarget.getBoundingClientRect(),
                    );
                    console.log("clicked title", el.target);
                  }}
                >
                  {el}
                </span>
              ))}
            </div>
            <div
              className="h-4 w-full bg-backgroundShade1"
              onClick={(el: React.MouseEvent) => {
                console.log("111", el.currentTarget.getBoundingClientRect());
                console.log("111", el.target);
              }}
            >
              <div
                style={{
                  width: `${menuTitleDimension.width}px`,
                  //marginLeft: ` ${558.34375 - 224 - 32 - 16}px`,
                  transform: `translateX(${menuTitleDimension.left - 224 - 32 - 16}px)`,
                }}
                className={`h-full bg-secondary`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {titles.map((el, i) => (
          <div
            data-value={i}
            key={i}
            ref={(elementNode) => {
              if (!menuRefs.current[i]) {
                //use element id when real data comes
                menuRefs.current[i] = elementNode;
              }
            }}
            className="h-[30rem] border-2 border-solid border-pink-700"
          >
            <Heading text={el} />1 body
          </div>
        ))}
      </div>
    </>
  );
}
