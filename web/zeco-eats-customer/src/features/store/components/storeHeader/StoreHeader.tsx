import Image from "next/image";
import StoreHeaderImage from "./StoreHeaderImage";
import StoreTitleAndDesc from "./StoreTitleAndDesc";
import StoreLocationAndInfo from "./StoreLocationAndInfo";

export default function StoreHeader() {
  return (
    <>
      <StoreHeaderImage />
      <StoreTitleAndDesc />
      <StoreLocationAndInfo />
    </>
  );
}
