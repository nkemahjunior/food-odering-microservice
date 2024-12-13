"use client";
import Heading from "@/shared/components/text/Heading";
import { truncateSync } from "fs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BiMenu, BiSearch } from "react-icons/bi";

export default function MenuHead() {
  const [focus, setFocus] = useState(false);
  // const menuTitleRefs = useRef<Record<number, HTMLSpanElement | null>>({});
  const [menuTitleDimension, setmenuTitleDimension] = useState({
    left: 0,
    width: 0,
  });
  const [manualScroll, setManualScroll] = useState(false);
  const [scrollContainerWidth, setScrollContainerWidth] = useState(0)
  const [scrolleft, setScrolLeft] = useState(0)

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const menuTitleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const menuRefs = useRef<(HTMLSpanElement | null)[]>([]);

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
    // const curMenuTitle = menuTitleRefs.current[0]?.getBoundingClientRect();
    // setmenuTitleDimension({
    //   left: curMenuTitle?.left!,
    //   width: curMenuTitle?.width!,
    // });
    const curMenuTitle = menuTitleRefs.current[0]?.getBoundingClientRect();
    setmenuTitleDimension({
      left: menuTitleRefs.current[0]!.offsetLeft,
      width: curMenuTitle?.width!,
    });
    // setScrollContainerWidth(menuTitleRefs.current[titles.length - 1]!.getBoundingClientRect().right);
    setScrollContainerWidth(scrollAreaRef.current!.scrollWidth);
  }, []);

  useEffect(()=>{ setScrolLeft(scrollAreaRef.current!.scrollLeft)},[scrolleft])

  useEffect(() => {
    function observerCallback(entries: IntersectionObserverEntry[]) {

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const value = Number((entry.target as HTMLDivElement).dataset.value);
          //console.log("intersecting element ", entry.target);
          const curMenuTitle =
            menuTitleRefs.current[value]?.getBoundingClientRect();
          const scrollAreaRect = scrollAreaRef.current!.getBoundingClientRect();

          if (
            //60% of scroll box
            curMenuTitle!.right >= 0.6 * scrollAreaRect.right &&
            !manualScroll
          ) {
            // console.log(
            //   "bringing into view ",
            //   menuTitleRefs.current[value + 2],
            // );
            menuTitleRefs.current[value + 2]?.scrollIntoView({
              behavior: "auto",
              block: "nearest",
              inline: "nearest",
            });
          }

          if (
            //40% of scroll box
            curMenuTitle!.right <= 0.4 * scrollAreaRect.right &&
            !manualScroll
          ) {
            // console.log(
            //   "bringing into view backward ",
            //   menuTitleRefs.current[value - 2],
            // );
            menuTitleRefs.current[value - 2]?.scrollIntoView({
              behavior: "auto",
              block: "nearest",
              inline: "start",
            });
          }

          const newLeft =
            menuTitleRefs.current[value]?.offsetLeft!

          setmenuTitleDimension({
            left:
              newLeft,

            width:
              menuTitleRefs.current[value]?.getBoundingClientRect()?.width!,
          });

          //        const newLeft =
         // menuTitleRefs.current[value]?.getBoundingClientRect()?.left!;
          // setmenuTitleDimension({
          //   left:
          //     newLeft < scrollAreaRect.left
          //       ? scrollAreaRect.left
          //       : newLeft > scrollAreaRect.right
          //         ? scrollAreaRect.right
          //         : newLeft,

          //   width:
          //     menuTitleRefs.current[value]?.getBoundingClientRect()?.width!,
          // });
        }
      });
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px 0px 0px 0px",
      threshold: 1,
    });

    menuRefs.current.forEach((el, index) => {
      if (el) observer.observe(el);
    });

    return () => {
      menuRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [menuTitleRefs, scrollAreaRef, manualScroll]);

  // useEffect(
  //   () => {
  //     function observerCallback(entries: IntersectionObserverEntry[]) {
  //       const [entry] = entries;

  //       if (entry.isIntersecting) {
  //         const value = Number((entry.target as HTMLDivElement).dataset.value);
  //         console.log("intersecting element ", entry.target);
  //         const curMenuTitle =
  //           menuTitleRefs.current[value]?.getBoundingClientRect();
  //         const scrollAreaRect = scrollAreaRef.current!.getBoundingClientRect();

  //         if (
  //           //60% of scroll box
  //           curMenuTitle!.right >=
  //           0.6 * scrollAreaRect.right
  //         ) {
  //           console.log(
  //             "bringing into view ",
  //             menuTitleRefs.current[value + 2],
  //           );
  //           menuTitleRefs.current[value + 2]?.scrollIntoView({
  //             behavior: "auto",
  //             block: "nearest",
  //             inline: "nearest",
  //           });
  //         }
  //         // console.log(
  //         //   "test test ",
  //         //   curMenuTitle!.left <= 0.4 * scrollAreaRect.left
  //         // ,"left ", curMenuTitle!.left, "percentage ", 0.4 * scrollAreaRect.left );

  //         if (
  //           //40% of scroll box
  //           curMenuTitle!.right <=
  //           0.4 * scrollAreaRect.right
  //         ) {
  //           console.log(
  //             "bringing into view backward ",
  //             menuTitleRefs.current[value - 2],
  //           );
  //           menuTitleRefs.current[value - 2]?.scrollIntoView({
  //             behavior: "auto",
  //             block: "nearest",
  //             inline: "start",
  //           });
  //         }

  //         const newLeft =
  //           menuTitleRefs.current[value]?.getBoundingClientRect()?.left!;

  //         setmenuTitleDimension({
  //           left:
  //             newLeft < scrollAreaRect.left
  //               ? scrollAreaRect.left
  //               : newLeft > scrollAreaRect.right
  //                 ? scrollAreaRect.right
  //                 : newLeft,

  //           width:
  //             menuTitleRefs.current[value]?.getBoundingClientRect()?.width!,
  //         });
  //       }
  //     }

  //     const observer = new IntersectionObserver(observerCallback, {
  //       root: null,
  //       rootMargin: "0px 0px 0px 0px",
  //       threshold: 1,
  //     });

  //     menuRefs.current.forEach((el, index) => {
  //       if (el) observer.observe(el);
  //     });

  //     return () => {
  //       menuRefs.current.forEach((el) => {
  //         if (el) observer.unobserve(el);
  //       });
  //     };
  //   },
  //   [
  //     /*menuTitleRefs, scrollAreaRef*/
  //   ],
  // );

  // useEffect(() => {
  //   let timeout: any;
  //   function observerCallback(entries: IntersectionObserverEntry[]) {
  //     const [entry] = entries;

  //     if (entry.isIntersecting) {
  //       const value = Number((entry.target as HTMLDivElement).dataset.value);
  //       console.log("intersecting element ", entry.target);
  //       const curMenuTitle =
  //         menuTitleRefs.current[value]?.getBoundingClientRect();
  //       const scrollAreaRect = scrollAreaRef.current!.getBoundingClientRect();

  //       if (
  //         curMenuTitle!.right > scrollAreaRect.right ||
  //         curMenuTitle!.left < scrollAreaRect.left
  //       ) {
  //         console.log("executed a motherfucker");
  //         menuTitleRefs.current[value]?.scrollIntoView({
  //           behavior: "auto",
  //           block: "nearest",
  //           inline: "start",
  //         });

  //         timeout = setTimeout(() => {
  //           setmenuTitleDimension({
  //             left: curMenuTitle?.left!,
  //             width: curMenuTitle?.width!,
  //           });
  //         }, 1000);

  //         return;
  //       }

  //       setmenuTitleDimension({
  //         left: curMenuTitle?.left!,
  //         width: curMenuTitle?.width!,
  //       });
  //     }
  //   }

  //   const observer = new IntersectionObserver(observerCallback, {
  //     root: null,
  //     rootMargin: "205px 0px 0px 0px",
  //     threshold: 1,
  //   });

  //   menuRefs.current.forEach((el, index) => {
  //     if (el) observer.observe(el);
  //   });

  //   // return () => {
  //   //   clearTimeout(timeout);
  //   //   menuRefs.current.forEach((el) => {
  //   //     if (el) observer.unobserve(el);
  //   //   });
  //   // };
  // }, [/*menuTitleRefs, scrollAreaRef*/]);

  function scrollToMenu(index: number) {
    setManualScroll(true);
    //console.log("index ", index);
    //console.log("clicked index ", menuTitleRefs.current[index]);
    console.log(
      "offsetleft ------------ ",
      menuTitleRefs.current[index]?.offsetLeft,
    );
    console.log(
      "child scroll left ------------ ",
      menuTitleRefs.current[index]?.scrollLeft,
    );
    console.log("parent scroll width ", scrollAreaRef.current?.scrollWidth);
    console.log("parent scroll left ", scrollAreaRef.current?.scrollLeft);
    console.log("width --------- ", menuTitleRefs.current[index]?.getBoundingClientRect());
    menuRefs.current[index]?.scrollIntoView(/*{
      behavior: "smooth",
      block: "center",
    }*/);




    setTimeout(() => {
      setManualScroll(false);
    }, 1000);
  }

  return (
    <>
      <div className="sticky top-[12.5rem] w-full border-2 border-solid border-green-600">
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

          <div className="overflow-x-hiddenw w-[97%] border-4 border-solid border-red-700">
            <div
              ref={scrollAreaRef}
              //ofset parent
              className="scrollbar-hidden relative flex w-full flex-col space-y-4 overflow-x-auto border-2 border-solid border-yellow-400"
            >
              <div className="flex w-full items-center space-x-8 ">
                {" "}
                {titles.map((el, i) => (
                  <span
                    onClick={() => scrollToMenu(i)}
                    data-value={i}
                    key={i}
                    ref={(elementNode) => {
                      if (!menuTitleRefs.current[i]) {
                        //use element id when real data comes
                        menuTitleRefs.current[i] = elementNode;
                      }
                    }}
                    className="block w-fit cursor-pointer text-nowrap border-2 border-solid border-red-600 font-medium"
                  >
                    {el}
                    {/* <Link
                    href={`#${el.replaceAll(/\s+/g, "")}`}
                    className="block h-full w-full"
                  ></Link> */}
                  </span>
                ))}
              </div>

              <div className={`h-4 w-[2504pppx] bg-backgroundShade1`}
                style={{ width: `${scrollContainerWidth}px` }}
              onClick={(e:any)=>{console.log("the main bar -- ", e.currentTarget);}}
              >
                <div
                  style={{
                    width: `${menuTitleDimension.width}px`,
                    //marginLeft: ` -2pxh`,
                    // transform: `translateX(${(menuTitleDimension.left - 224 - 32 - 16)}px)`,
                    transform: `translateX(${menuTitleDimension.left }px)`,
                  }}
                  className={`h-full bg-secondary`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {titles.map((el, i) => (
          <div
            id={`${el.replaceAll(/\s+/g, "")}`}
            data-value={i}
            key={i}
            ref={(elementNode) => {
              if (!menuRefs.current[i]) {
                //use element id when real data comes
                menuRefs.current[i] = elementNode;
              }
            }}
            className="h-[30rem] scroll-mt-[16rem] border-2 border-solid border-pink-700"
          >
            <Heading text={el} />1 body
          </div>
        ))}
      </div>
    </>
  );
}


/**
 *   return (
    <>
      <div className="sticky top-[12.5rem] w-full border-2 border-solid border-green-600">
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

          <div className="overflow-x-hiddenw w-[97%] border-4 border-solid border-red-700">
            <div
              ref={scrollAreaRef}
              className="scrollbar-hidden flex w-full items-center space-x-8 overflow-x-auto border-2 border-solid border-yellow-400"
            >
              {titles.map((el, i) => (
                <span
                  onClick={() => scrollToMenu(i)}
                  data-value={i}
                  key={i}
                  ref={(elementNode) => {
                    if (!menuTitleRefs.current[i]) {
                      //use element id when real data comes
                      menuTitleRefs.current[i] = elementNode;
                    }
                  }}
                  className="block w-fit cursor-pointer text-nowrap border-2 border-solid border-red-600 font-medium"
                >
                  {el}

                </span>
              ))}
            </div>
            <div className="h-4 w-full bg-backgroundShade1">
              <div
                style={{
                  width: `${menuTitleDimension.width}px`,
                  marginLeft: ` -2px`,
                  transform: `translateX(${menuTitleDimension.left - 224 - 32 - 16}px)`,
                }}
                className={`h-full bg-secondary`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {titles.map((el, i) => (
          <div
            id={`${el.replaceAll(/\s+/g, "")}`}
            data-value={i}
            key={i}
            ref={(elementNode) => {
              if (!menuRefs.current[i]) {
                //use element id when real data comes
                menuRefs.current[i] = elementNode;
              }
            }}
            className="h-[30rem] scroll-mt-[16rem] border-2 border-solid border-pink-700"
          >
            <Heading text={el} />1 body
          </div>
        ))}
      </div>
    </>
  );
 */