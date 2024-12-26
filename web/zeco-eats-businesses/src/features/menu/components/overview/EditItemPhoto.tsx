import Button from "@/shared/components/button/Button";
import ImageContainer from "@/shared/components/image/ImageContainer";

 
 
export default function EditItemPhoto() {
    return (
        <div className="w-full space-y-4">
          {" "}
          <ImageContainer
            src="/devImages/food1.webp"
            imageAlt=""
            height="h-[10rem]"
            width="w-full"
            quality={90}
            roundedCorners="rounded-md"
          />
          <Button>Change photo</Button>
        </div>
    );
}