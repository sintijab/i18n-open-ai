import { defaultLanguage } from "./file-utils";
import { saveToFile, translateMarkdown } from "./request-utils";

export const translateComponent = async ({ localeTo }) => {
  try {
    const docContent: string = require(
      `../../public/locales/${defaultLanguage}/components.json`,
    );
    const savePath = `locales/${localeTo}/components.json`;
    if (typeof docContent === "object") {
      // Document loaded even with empty content
      if (Object.keys(docContent).length) {
        const res = await translateMarkdown({
          content: docContent,
          localeFrom: defaultLanguage,
          localeTo,
        }).then((res: Response) =>
          (res.json() as Promise<{ content: string }>).then((data) => JSON.parse(JSON.stringify(data.content)) as string),
        );
        // const res = {navigation:{items:{speakers:"Runātāji",schedule:"Programma",workshops:"Semināri",venue:"Vieta",awards:"OS Balvas",events:"Priekšpasākumi",sponsors:"Sponsori",faq:"Bieži uzdotie jautājumi"}}};
        await saveToFile({
          filePath: savePath,
          markdown: JSON.stringify(res, null, 2),
          directory: "public",
        });
        return true;
      }
    }
  } catch (e) {
    console.log(
      `Text content for the locales ${defaultLanguage} components is missing. Add content and try again`,
    );
    return true;
  }
};

export const isComponentTranslationsAvailable = async ({ localeTo }) => {
  try {
    const docContent = require(
      `../../public/locales/${localeTo}/components.json`,
    );
    if (typeof docContent === "object") {
      return false;
    }
  } catch (e) {
    await translateComponent({ localeTo });
    return true;
  }
};
