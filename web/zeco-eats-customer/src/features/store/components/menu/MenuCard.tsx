"use client";
import ImageContainer from "@/shared/components/image/ImageContainer";
import ModalOverlayR from "@/shared/components/modal/ModalOverlayR";
import CardTitle from "@/shared/components/text/CardTitle";
import Heading from "@/shared/components/text/Heading";
import { clipText } from "@/shared/utils/clipText";
import Image from "next/image";
import { useEffect, useState } from "react";
import MenuCardModal from "./MenuCardModal";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ModalOverlayUrl from "@/shared/components/modal/ModalOverlayUrl";
import { useDeviceType } from "@/shared/hooks/useDeviceType";

export default function MenuCard({id}:{id:number}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const viewDish = "viewDish";

  const {isMobile} = useDeviceType()


  const openModal = () => {
    const params = new URLSearchParams(searchParams);
    params.set(viewDish, "true");
    //update this with real store name

    console.log(" is mobile ", isMobile);
    const modalLink = isMobile
      ? `storeName/dish-details`
      : `${"storeName"}?${params.toString()}${id}`;
     router.push(modalLink);
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
      <ModalOverlayUrl id={id}  /*open={open}*/  open={searchParams.get(viewDish)} router={router} rounded="rounded-2xl">
        <MenuCardModal isModal={true} />
      </ModalOverlayUrl>
    </>
  );
}
