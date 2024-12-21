"use client";
import Link from "next/link";

import { JSX, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export interface nestedLinks {
  mainLink: string;
  childLink: (string | nestedLinks)[];
  initialPaddingLeft?: number;
  paddingIncrement?: number;
}

interface fnProps {
  icon?: React.ReactNode;
  text?: string;
  nested?: boolean;
  nestedLinks: nestedLinks;
}

const RenderNestedLinks = (
  links: nestedLinks,
  padding: number,
  paddingIncrement: number,
): JSX.Element => {
  const [closeChildren, setCloseChildren] = useState(false);
  return (
    <div key={links.mainLink}>
      <div
        className="flex items-center space-x-2"
        style={{ paddingLeft: `${padding}rem` }}
        onClick={() => setCloseChildren((v) => !v)}
      >
        <span> {links.mainLink}</span>
        <span>
          {closeChildren ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
        </span>
      </div>
      <div
        className="overflow-hidden"
        style={{ height: closeChildren ? "0rem" : "fit-content" }}
      >
        {links.childLink.map((el, i) =>
          typeof el === "string" ? (
            <Link
              key={i + el}
              className="block"
              href=""
              style={{ paddingLeft: `${padding + paddingIncrement}rem` }}
            >
              {el}
            </Link>
          ) : (
            RenderNestedLinks(el, padding + paddingIncrement, paddingIncrement)
          ),
        )}
      </div>
    </div>
  );
};

export default function NavLink({
  /*icon, text,*/ nested,
  nestedLinks,
}: fnProps) {
  return nested ? (
    <div>
      <span>{nestedLinks.mainLink}nes</span>
      {nestedLinks.childLink.map((el, i) =>
        typeof el == "string" ? (
          <span key={i}>{el}</span>
        ) : (
          <div key={i}>
            <span>{el.mainLink}</span>
          </div>
        ),
      )}
    </div>
  ) : (
    RenderNestedLinks(
      nestedLinks,
      nestedLinks.initialPaddingLeft!,
      nestedLinks.paddingIncrement!,
    )
  );
}
