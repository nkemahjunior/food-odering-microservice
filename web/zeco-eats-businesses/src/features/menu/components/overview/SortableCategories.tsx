"use client";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import SortableCategory from "./SortableCategory";

export default function SortableCategories() {
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
    <DndContext onDragEnd={reorderItems}>
      <SortableContext items={items}>
        <div className="space-y-4">
          {items.map((el, i) => (
            <SortableCategory key={i} el={el}  />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
