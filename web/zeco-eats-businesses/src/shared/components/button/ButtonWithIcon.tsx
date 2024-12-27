interface fnProps {
  children: React.ReactNode;
  roundedCorners?: string;
  color?: string;
  hoverColor?: string;
  justify?:string
  height?: string;
  width?: string;
  font?: string;
  gapX?: string;
  className?: string;
  events?: React.DOMAttributes<HTMLButtonElement>;
  ariaAttributes?: React.HtmlHTMLAttributes<HTMLButtonElement>
}
export default function ButtonWithIcon({
  children,
  roundedCorners = "rounded-lg",
  color = "bg-background",
  hoverColor = "hover:bg-backgroundShade1",
  justify="justify-center",
  height = "h-[2.5rem]",
  width = "w-full",
  font = "font-medium",
  className = " ",
  gapX = "gap-x-2",
  events,
  ariaAttributes
}: fnProps) {
  return (
    <button
    role=""
    {...ariaAttributes}
      {...events}
      className={`${className} ${roundedCorners} ${font} ${color} ${hoverColor} ${height} ${width} flex items-center ${justify} ${gapX} text-black transition-colors duration-300`}
    >
      {children}
    </button>
  );
}
