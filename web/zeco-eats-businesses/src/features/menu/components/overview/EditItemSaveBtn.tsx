import Button from "@/shared/components/button/Button";

interface fnProps {
  className?: string;
  hoverColor?:string
  px?: string;
}

export default function EditItemSaveBtn({
  px = "px-4",
  className,
  hoverColor = "hover:bg-backgroundShade1",
}: fnProps) {
  return (
    <div>
      <Button
        className={`${className}`}
        hoverColor={hoverColor}
        px={px}
      >
        Save
      </Button>
    </div>
  );
}

/**
 *         <button className="rounded-lg bg-background px-8 py-2 transition-colors duration-300 hover:bg-backgroundShade2">
          Save
        </button>
 */
