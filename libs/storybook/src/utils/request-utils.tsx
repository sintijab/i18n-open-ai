import type { IMarkdownInit, ISaveToFile, ITranslateDocument } from "./types";

export const saveToFile = async ({
  filePath,
  markdown,
  directory,
}: ISaveToFile): Promise<Response | void | undefined> => {
  try {
    const formatted = markdown.replace(/(^"|"$)/g, '');
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: filePath,
        data: formatted,
        directory,
      }),
    };
    return await fetch(`${window.location.origin}/api/docs`, requestOptions)
      .then(() => console.log("File saved."))
      .catch((err) => {
        throw new Error(err as string);
      });
  } catch (e) {
    console.log(e);
  }
};

export const createFile = async ({
  filePath,
  directory,
}: IMarkdownInit): Promise<Response | void | undefined> => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: filePath,
        directory,
      }),
    };
    return await fetch(`${window.location.origin}/api/lookup`, requestOptions)
      .then((res) => {
        if (res.ok) {
          console.log("File created.");
        }
      })
      .catch((err) => {
        throw new Error(err as string);
      });
  } catch (e) {
    console.log(e);
  }
};

export const translateMarkdown = async ({
  content,
  localeFrom,
  localeTo,
}: ITranslateDocument): Promise<Response | void | undefined> => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        languageFrom: Locales[localeFrom],
        languageTo: Locales[localeTo],
      }),
    };
    return await fetch(
      `${window.location.origin}/api/translate`,
      requestOptions,
    )
      .then((res) => {
        if (res.ok) {
          console.log("Markdown translated.");
          return res;
        }
      })
      .catch((err) => {
        throw new Error(err as string);
      });
  } catch (e) {
    console.log(e);
  }
};

export const getFrontMatter = async ({
  filePath,
  directory,
}: IMarkdownInit): Promise<Response> => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: filePath,
        directory,
      }),
    };
    return await fetch(
      `${window.location.origin}/api/frontmatter`,
      requestOptions,
    )
      .then((res) => {
        if (res.ok) {
          console.log("File formatted.");
          return res;
        }
      })
      .catch((err) => {
        throw new Error(err as string);
      });
  } catch (e) {
    console.log(e);
  }
};

export enum Locales {
  en = "English",
  lv = "Latvian",
  de = "German",
}
