"use client";
import CardTitle from "@/shared/components/text/CardTitle";
import { clipText } from "@/shared/utils/clipText";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDeviceType } from "@/shared/hooks/useDeviceType";
import { useUpdateUrlParams } from "@/shared/hooks/useUpdateUrlParams";
import { VIEW_DISH } from "@/features/store/utils/modalUrlKeys";

export default function MenuCard({ id }: { id: number }) {
  const router = useRouter();
  const { isMobile } = useDeviceType();
  const updateParams = useUpdateUrlParams();

  const openModal = () => {
    if (isMobile) {
      router.push(`storeName/dish-details`);
      return;
    }
    updateParams(VIEW_DISH, id.toString() + "testMenu");
  };

  return (
    <>
      {" "}
      <div onClick={openModal}>
        <div
          className="flex h-[10rem] w-full cursor-pointer space-x-1 overflow-hidden border-solid border-backgroundBorder py-4 lg:h-[10rem] lg:rounded-lg lg:border-[1px] lg:py-0"
          //onClick={() => setOpen(true)}
        >
          <div className="flex w-[60%] flex-col justify-center space-y-1 lg:w-[70%] lg:flex-none lg:p-4">
            <CardTitle
              text={clipText(`Chilli sunny side up  `, 40)}
              className="capitalize"
            />
            <p className="">£13.00</p>
            <p className="text-storeTextColorTint lg:hidden">
              {clipText(
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vero laboriosam deleniti ex sit voluptatibus",
                53, //the number of characters should depend on the length of the title, if the title is too short allow more charcters here, do this when real data from the api comes
              )}
            </p>
            <p className="hidden text-storeTextColorTint lg:block">
              {clipText(
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vero laboriosam deleniti ex sit voluptatibus Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vero laboriosam deleniti ex sit voluptatibusLorem ipsum dolor sit amet consectetur adipisicing elit. Similique vero laboriosam deleniti ex sit voluptatibus",
                240, //the number of characters should depend on the length of the title, if the title is too short allow more charcters here, do this when real data from the api comes
              )}
            </p>
          </div>

          <div className="relative h-full w-[40%] overflow-hidden rounded-lg lg:w-[30.1%] lg:rounded-none">
            <Image
              src={"/devImages/food1.webp"}
              alt="picture of dish"
              fill
              quality={100}
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
