"use client";
import Line from "@/shared/components/Line";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragBtn from "./DragBtn";
import CategoryTitle from "./CategoryTitle";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Item from "./Item";
import { useContext, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import {
  ModalContext,
  modalContextTypes,
} from "@/shared/context/modal/ModalProvider";

interface fnProps {
  el: string;
}

export default function SortableCategory({ el }: fnProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: el,
    });

  const [close, setClose] = useState(false);
  const { openModal, modalProps } = useContext(ModalContext) as modalContextTypes;

  const openModalAndSetContent = () => {
    openModal(
      <div className="bg-red-700 w-full h-full">
        {" "}
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis
        veritatis labore ipsa libero sed perferendis, exercitationem id iure
        facere eos debitis quis dicta itaque est non, odit quisquam accusamus
        culpa ratione vitae nesciunt, porro totam excepturi necessitatibus? Qui,
        omnis vitae ab voluptatibus fugit delectus, culpa aliquam ut
        reprehenderit dicta harum.
      </div>,
      {
        ...modalProps,
        centerChildVer: false,
        childPos: "justify-end",
        showCloseBtn:false,
        height: " h-full",
        width: "w-[40%]",
        
      },
    );
  };

  const [items, setItems] = useState(["1", "2", "3", "4", "5"]);

  const reorderItems = (e: DragEndEvent) => {
    if (!e.over) return;
    if (e.active.id !== e.over.id) {
      setItems((item) => {
        const oldIdx = item.indexOf(e.active.id.toString());
        const newIdx = item.indexOf(e.over!.id.toString());

        return arrayMove(item, oldIdx, newIdx);
      });
    }
  };

  return (
    <div
      className={`touch-none space-y-4 rounded-xl border-[1px] border-solid border-backgroundBorder p-8`}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      onClick={openModalAndSetContent}
    >
      <div className="flex items-center justify-between">
        <div className="flex w-full items-center space-x-4">
          <DragBtn attributes={attributes} listeners={listeners} />
          <CategoryTitle category="Special Dishes" itemsQty={3} i={el} />
        </div>

        <button
          className="rounded-lg bg-background p-4"
          onClick={() => setClose((v) => !v)}
        >
          {close ? (
            <span>
              <MdKeyboardArrowDown />
            </span>
          ) : (
            <span>
              <MdKeyboardArrowUp />
            </span>
          )}
        </button>
      </div>
      <Line />

      <div className={`${close ? "h-0" : "h-auto"} overflow-hidden`}>
        <DndContext onDragEnd={reorderItems}>
          <SortableContext items={items}>
            <div className="space-y-4">
              {items.map((ell, i) => (
                <Item key={i} el={ell} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
