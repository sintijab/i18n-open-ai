export interface ISaveToFile {
  filePath: string;
  markdown: string;
  directory: string;
}

export interface IMarkdownInit {
  filePath: string;
  directory: string;
}

export interface ITranslateDocument {
  content: string;
  localeFrom: string;
  localeTo: string;
}
