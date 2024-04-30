import { saveToFile } from "../../utils/request-utils";
import type { IEditorButton } from "../types";

export const SHOW_EDITOR = "Code Editor";
export const HIDE_EDITOR = "Visual Editor";
export const SAVE_BUTTON = "Save";
import React from "react";
export const MarkDownButtonGroup: React.FC<IEditorButton> = ({
  markdown,
  filePath,
  onEdit,
  editButtonText,
}) => {
  const isEditable = !!filePath;

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", zIndex: "1" }}>
      <button onClick={onEdit} style={{ marginRight: "8px" }}>
        {editButtonText}
      </button>
      {isEditable && (
        <button
          onClick={
            () => {
              void (async () => {
                await saveToFile({
                  filePath,
                  markdown,
                  directory: "src",
                })
              })();
            }
          }
        >
          {SAVE_BUTTON}
        </button>
      )}
    </div>
  );
};
