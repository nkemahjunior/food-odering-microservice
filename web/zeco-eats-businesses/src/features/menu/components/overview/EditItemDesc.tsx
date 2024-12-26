"use client";
import { ChangeEvent, useState } from "react";
import EditOptionParent from "./EditOptionParent";

export default function EditItemDesc() {
  const [desc, setDesc] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam veritatis accusamus quaerat enim provident sint inventore, vel voluptates molestias expedita.`,
  );
  return (
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
  );
}
