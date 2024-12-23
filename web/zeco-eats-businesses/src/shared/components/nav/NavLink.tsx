"use client";
import Link from "next/link";
import { JSX, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface nestedLinks {
  icon: React.ReactNode;
  mainLink: string;
  childLink: (string | nestedLinks)[];
  initialPaddingLeft?: number;
  paddingIncrement?: number;
}

interface fnProps {
  icon?: React.ReactNode;
  text?: string;
  nestedLinks?: nestedLinks;
}

const textToLink = (text: string) => {
  return text.toLowerCase().replaceAll(" ", "-");
};

const RenderNestedLinks = (
  links: nestedLinks,
  padding: number,
  paddingIncrement: number,
): JSX.Element => {
  const [closeChildren, setCloseChildren] = useState(true);
  return (
    <div key={links.mainLink} className="text-base font-medium">
      <div
        className="flex cursor-pointer items-center space-x-2"
        style={{ paddingLeft: `${padding}rem` }}
        onClick={() => setCloseChildren((v) => !v)}
      >
        <span>{links.icon}</span>
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
              className="block rounded-lg py-2 hover:bg-background"
              href={textToLink(el)}
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

export default function NavLink({ icon, text, nestedLinks }: fnProps) {
  return nestedLinks ? (
    RenderNestedLinks(
      nestedLinks,
      nestedLinks.initialPaddingLeft!,
      nestedLinks.paddingIncrement!,
    )
  ) : (
    <Link
      href={textToLink(text!)}
      className="flex items-center space-x-2 text-base font-medium hover:bg-background rounded-lg  py-2"
    >
      <span>{icon}</span>
      <span> {text}</span>
    </Link>
  );
}
