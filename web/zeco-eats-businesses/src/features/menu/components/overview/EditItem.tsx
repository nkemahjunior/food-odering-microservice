"use client";
import Button from "@/shared/components/button/Button";
import ImageContainer from "@/shared/components/image/ImageContainer";
import Line from "@/shared/components/Line";
import CloseBtn from "@/shared/components/modal/CloseBtn";
import Heading2 from "@/shared/components/text/Heading2";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import EditOptionParent from "./EditOptionParent";
import CheckBox from "@/shared/components/inputs/CheckBox";
import ItemCategories from "./ItemCategories";
import { BiPlus, BiX } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import ButtonWithIcon from "@/shared/components/button/ButtonWithIcon";

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

  const [searchCategories, setSearchCategories] = useState([
    ...ItemCategoriesArr,
  ]);

  const [hideNewCategoryInput, setHideNewCategoryInput] = useState(true);
  const [price, setPrice] = useState("£100");
  const [vat, setVat] = useState("£1");
  const [createNew, setCreateNew] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const categoryInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    //using effect because the motherfucking input does not autofocus when rendering it conditionally
    if (categoryInputRef.current) {
      categoryInputRef.current.focus();
    }
  }, [createNew, hideNewCategoryInput]);

  const searchForCategories = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("changing");
    if (e.target.value.length === 0) {
      setSearchCategories([...ItemCategoriesArr]);
      return;
    }
    const arr = searchCategories.filter((el) =>
      el.toLocaleLowerCase().includes(e.target.value.toLowerCase()),
    );
    setSearchCategories(arr);
  };

  const addItemToCategory = (newCategory: string) => {
    if (newCategory.length <= 0) return;
    const arr = [...ItemCategoriesArr, newCategory];
    setItemCategoriesArr(arr);
    setSearchCategories([...ItemCategoriesArr, newCategory]);
    setHideNewCategoryInput(true);
    if (createNew) setCreateNew(false);
  };

  const hideAddNewCategory = () => {
    setHideNewCategoryInput(true);
    setCreateNew(false);
  };

  const wantsToCreateNewCategory = () => {
    setCreateNew(true);
  };

  const setNewCategoryOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  return (
    <div className="w-full space-y-4 px-8 py-4">
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

      <div className="space-y-6">
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

        <div className="space-y-2">
          <p className="font-medium">Categories</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
            {ItemCategoriesArr.map((el, i) => (
              <ItemCategories
                key={i}
                category={el}
                ItemCategoriesArr={ItemCategoriesArr}
                setItemCategories={setItemCategoriesArr}
              />
            ))}

            {hideNewCategoryInput ? (
              <Button
                events={{
                  onClick: () => setHideNewCategoryInput(false),
                }}
                px="px-3"
                py="py-2"
              >
                <BiPlus size={20} />
              </Button>
            ) : (
              <Button
                events={{
                  onClick: hideAddNewCategory,
                }}
                px="px-3"
                py="py-2"
              >
                <BiX size={20} />
              </Button>
            )}

            {!hideNewCategoryInput && (
              <div className="w-full- relative">
                <div className="flex w-full items-center gap-x-2">
                  {" "}
                  <div className="has-[:focus]:border-secondary flex h-[2.5rem] w-full items-center space-x-2 rounded-lg border-2 border-solid border-transparent bg-background px-4 has-[:focus]:bg-white">
                    {!createNew && (
                      <label htmlFor="itemName">
                        <CiSearch />
                      </label>
                    )}

                    <input
                      ref={categoryInputRef}
                      autoFocus
                      id="itemName"
                      type="text"
                      placeholder={
                        createNew ? "Add new category" : "Search category"
                      }
                      className="w-full bg-inherit outline-none"
                      onChange={
                        createNew ? setNewCategoryOnChange : searchForCategories
                      }
                    />
                  </div>
                  {createNew && (
                    <Button
                      events={{ onClick: () => addItemToCategory(newCategory) }}
                    >
                      Add
                    </Button>
                  )}
                </div>

                {!createNew && (
                  <div className="shadow-secondary absolute inset-x-0 top-14 h-auto max-h-[11rem] overflow-y-auto rounded-lg bg-white px-4 pt-4 shadow-2xl">
                    <ul className="divide-y-2 divide-backgroundBorder rounded-lg px-2">
                      {searchCategories.map((el, i) => (
                        <li
                          className={`py-3 ${ItemCategoriesArr.includes(el) ? "pointer-events-none cursor-not-allowed text-stone-600" : "pointer-events-auto cursor-pointer"}`}
                          key={i}
                          onClick={() => addItemToCategory(el)}
                        >
                          {el}
                        </li>
                      ))}
                    </ul>
                    <div className="sticky bottom-0 bg-white py-2">
                      <ButtonWithIcon
                        events={{
                          onClick: wantsToCreateNewCategory,
                        }}
                      >
                        <span>
                          <BiPlus size={20} />{" "}
                        </span>
                        <span>Create new</span>
                      </ButtonWithIcon>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium">Price</p>
          <input
            id="itemName"
            type="text"
            className="focus:border-secondary w-[10rem] rounded-lg border-2 border-solid border-transparent bg-background px-2 py-2 focus:bg-white"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPrice(e.target.value)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium">VAT</p>
          <input
            id="itemName"
            type="text"
            className="focus:border-secondary w-[10rem] rounded-lg border-2 border-solid border-transparent bg-background px-2 py-2 focus:bg-white"
            value={vat}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setVat(e.target.value)
            }
          />
        </div>

        <div>
          <Button
            className="bg-secondary flex w-full items-center justify-center text-white"
            hoverColor="hover:bg-secondaryTint"
            px="px-0"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
