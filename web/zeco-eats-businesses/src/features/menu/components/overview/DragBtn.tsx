"use client";
import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { RiDraggable } from "react-icons/ri";

interface fnProps {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
  iconSize?: number;
}

export default function DragBtn({
  // attributes,
  listeners,
  iconSize = 40,
}: fnProps) {
  return (
    <button
      className="h-fit w-fit"
      {...listeners}
      //{...attributes} causing hydration errors
    >
      <RiDraggable size={iconSize} />
    </button>
  );
}
