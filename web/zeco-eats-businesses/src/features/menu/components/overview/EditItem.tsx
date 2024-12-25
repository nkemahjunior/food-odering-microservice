"use client";
import Button from "@/shared/components/button/Button";
import ImageContainer from "@/shared/components/image/ImageContainer";
import Line from "@/shared/components/Line";
import CloseBtn from "@/shared/components/modal/CloseBtn";
import Heading2 from "@/shared/components/text/Heading2";
import { ChangeEvent, useState } from "react";
import EditOptionParent from "./EditOptionParent";
import CheckBox from "@/shared/components/inputs/CheckBox";
import ItemCategories from "./ItemCategories";
import { BiPlus } from "react-icons/bi";

export default function EditItem() {
  const [name, setName] = useState(`Fried Rice`);
  const [desc, setDesc] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam veritatis accusamus quaerat enim provident sint inventore, vel voluptates molestias expedita.`,
  );

  const [ItemCategoriesArr, setItemCategoriesArr] = useState([
    "My Place Special",
    "Vegies",
    "Sauce",
    "Snacks",
  ]);

  const [newCategory, setNewCategory] = useState("");
  const [hideNewCategoryInput, setHideNewCategoryInput] = useState(true);

  return (
    <div className="h-full w-full space-y-4 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <CloseBtn />
          <Heading2 text="Edit Item" />
        </div>

        <button className="rounded-lg bg-background px-8 py-2 transition-colors duration-300 hover:bg-backgroundShade2">
          Save
        </button>
      </div>

      <Line />

      <div className="space-y-4">
        <EditOptionParent>
          <label htmlFor="itemName" className="font-medium">
            Name
          </label>
          <input
            id="itemName"
            type="text"
            className="focus:border-secondary w-full rounded-lg border-2 border-solid border-transparent bg-background px-2 py-2 focus:bg-white"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </EditOptionParent>

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

        <EditOptionParent>
          <label htmlFor="itemDesc" className="font-medium">
            Description
          </label>
          <textarea
            id="itemDesc"
            className="focus:border-secondary max-h-[15rem] min-h-[10rem] w-full resize-none rounded-lg border-2 border-solid border-transparent bg-background px-2 py-2 focus:bg-white"
            value={desc}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDesc(e.target.value)
            }
          />
        </EditOptionParent>

        <div className="flex items-center space-x-4">
          <CheckBox id="itemSoldOut" />
          <label htmlFor="itemSoldOut" className="font-medium">
            Sold Out
          </label>
        </div>

        <Line />

        <div>
          <p className=" font-medium">Categories</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
            {ItemCategoriesArr.map((el, i) => (
              <ItemCategories
                key={i}
                category={el}
                ItemCategoriesArr={ItemCategoriesArr}
                setItemCategories={setItemCategoriesArr}
              />
            ))}

            {hideNewCategoryInput && (
              <Button
                events={{
                  onClick: () => setHideNewCategoryInput(false),
                }}
                px="px-3"
                py="py-2"
              >
                <BiPlus size={20} />
              </Button>
            )}

            {!hideNewCategoryInput && (
              <div className="flex space-x-2">
                <input
                  id="itemName"
                  type="text"
                  className="focus:border-secondary w-full rounded-lg border-2 border-solid border-transparent bg-background px-2 py-2 focus:bg-white"
                  value={newCategory}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNewCategory(e.target.value)
                  }
                />

                <Button
                  events={{
                    onClick: () => {
                      const arr = [...ItemCategoriesArr, newCategory];
                      setItemCategoriesArr(arr);
                      setNewCategory("");
                      setHideNewCategoryInput(true);
                    },
                  }}
                  py="py-2"
                >
                  Add
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
