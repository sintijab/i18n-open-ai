export interface IMarkdownEditor {
  filePath?: string;
}
export interface IMarkdownBasic extends IMarkdownEditor {
  toggleEdit: () => void;
  isEditorVisible?: boolean;
  editButtonText: string;
  filePath?: string;
}

export interface ISaveButtonGroup {
  filePath: string;
  markdown: string;
  directory: string;
}

export interface IEditorButton {
  markdown?: string;
  filePath?: string;
  onEdit: () => void;
  editButtonText: string;
}
