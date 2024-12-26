"use client";
import Button from "@/shared/components/button/Button";
import ItemCategories from "./ItemCategories";
import { CiSearch } from "react-icons/ci";
import ButtonWithIcon from "@/shared/components/button/ButtonWithIcon";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BiPlus, BiX } from "react-icons/bi";

export default function EditItemCategories() {
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

        <Button
          events={{
            onClick: hideNewCategoryInput
              ? () => setHideNewCategoryInput(false)
              : hideAddNewCategory,
          }}
          px="px-3"
          py="py-2"
        >
          {hideNewCategoryInput ? <BiPlus size={20} /> : <BiX size={20} />}
        </Button>

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
  );
}
