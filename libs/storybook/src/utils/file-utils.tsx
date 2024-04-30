import { createFile, saveToFile, translateMarkdown } from "./request-utils";
// import mocks from './mockTranslations';

export const defaultLanguage = "en";

export const translateDefaultMarkdown = async ({
  translatePath,
  localeFrom,
  localeTo,
}: { translatePath: string; localeFrom: string; localeTo: string }): Promise<boolean> => {
  try {
    // Loading document default locale
    const docContent = require(`../${translatePath}`);
    const path = translatePath.replace(`/${localeFrom}/`, `/${localeTo}/`);
    if (typeof docContent === "string") {
      // Document loaded even with empty content
      if (docContent.length === 0) {
        throw Error(
          `Text content for the default locale ${defaultLanguage} is missing. Add content and try again`,
        );
      } else {
        // const res = JSON.parse(JSON.stringify(mocks.content)) as string;
        const res: string = await translateMarkdown({
          content: docContent,
          localeFrom,
          localeTo,
        }).then((res: Response) =>
          (res.json() as Promise<{ content: string }>).then((data) => JSON.parse(JSON.stringify(data.content)) as string),
        );
        await saveToFile({ filePath: path, markdown: res, directory: "src" });
        return true;
      }
    }
  } catch (e) {
    console.log(e);
    return true;
  }
};

export const isDocsAvailable = async ({
  path,
  translatePath,
  localeFrom,
  localeTo,
}) => {
  try {
    const docContent = require(`../${path}`);
    if (typeof docContent === "string") {
      // Document loaded even with empty content
      if (docContent.length === 0) {
        await translateDefaultMarkdown({ translatePath, localeFrom, localeTo });
        return true;
      }
      return false;
    }
  } catch (e) {
    await createFile({ filePath: path, directory: "src" });
    return false;
  }
};

export const getFileContent = (path) => {
  try {
    const docContent: string = require(`../${path}`);
    return docContent;
  } catch (e) {
    console.log(e);
    return false;
  }
};
