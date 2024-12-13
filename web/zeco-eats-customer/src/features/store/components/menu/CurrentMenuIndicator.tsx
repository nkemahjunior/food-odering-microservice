 
interface fnProps{
    scrollContainerWidth: number
    menuTitleDimension:Record<"width" | "left", number>
 }
 
export default function CurrentMenuIndicator({scrollContainerWidth, menuTitleDimension}:fnProps) {
    return (
      <div
        className={`h-4 bg-backgroundShade1`}
        style={{ width: `${scrollContainerWidth}px` }}
      >
        <div
          style={{
            width: `${menuTitleDimension.width}px`,
            transform: `translateX(${menuTitleDimension.left}px)`,
          }}
          className={`h-full bg-secondary`}
        ></div>
      </div>
    );
}