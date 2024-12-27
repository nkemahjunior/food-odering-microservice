import Link from "next/link";

interface fnProps {
  children: React.ReactNode;
  href: string;
  roundedCorners?: string;
  color?: string;
  hoverColor?: string;
  py?: string;
    px?: string;
    width?:string
  font?: string;
  className?: string;
}
export default function LinkButton({
  children,
  href,
  roundedCorners = "rounded-lg",
  color = "bg-background",
  hoverColor = "hover:bg-backgroundShade1",
  py = "py-3",
    px = "px-4",
  width="w-fit",
  font = "font-medium",
  className = " ",
}: fnProps) {
  return (
    <Link
      href={href}
      className={`${className} ${roundedCorners} ${font} ${color} ${hoverColor} ${py} ${px} block ${width} text-black transition-colors duration-300`}
    >
      {children}
    </Link>
  );
}
