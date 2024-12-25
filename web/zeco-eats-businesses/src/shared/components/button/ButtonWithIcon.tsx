interface fnProps {
  children: React.ReactNode;
  roundedCorners?: string;
  color?: string;
  hoverColor?: string;
  height?: string;
  width?: string;
  font?: string;
  gapX?: string;
  className?: string;
  events?: React.DOMAttributes<HTMLButtonElement>;
}
export default function ButtonWithIcon({
  children,
  roundedCorners = "rounded-lg",
  color = "bg-background",
  hoverColor = "hover:bg-backgroundShade1",
  height = "h-[2.5rem]",
  width = "w-full",
  font = "font-medium",
  className = " ",
  gapX = "gap-x-2",
  events,
}: fnProps) {
  return (
    <button
      {...events}
      className={`${className} ${roundedCorners} ${font} ${color} ${hoverColor} ${height} ${width} flex items-center justify-center ${gapX} text-black transition-colors duration-300`}
    >
      {children}
    </button>
  );
}
