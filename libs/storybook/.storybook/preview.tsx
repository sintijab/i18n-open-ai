import { StoryContext } from "@storybook/react";
import {
  defaultLanguage,
  isDocsAvailable,
} from "../src/utils/file-utils";
import { isComponentTranslationsAvailable } from "../src/utils/react-i18n-utils";
import { useTimeout } from "../src/utils/react-utils";
import { DualEditor } from "../src/MarkdownEditor/MarkdownDual";
import React, { Suspense, useEffect, useState } from "react";
import { Preview } from "@storybook/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/i18n";
import { ToastAlert } from "../src/components/Alert";

const withEditor = (Story, context: StoryContext) => {
  const [isAlertVisible, showAlert] = useState(false);
  const [isTranslated, translateDocument] = useState<boolean | null>(null);

  const storyPath = context.parameters.fileName.replace(/.*?src\/(.*?)/, "");
  const markdownDir = storyPath.substr(0, storyPath.lastIndexOf("/"));
  const markdownFilePath = `${markdownDir}/markdown/${context.globals.locale}/${context.name}.md`;
  const defaultPath = `${markdownDir}/markdown/${defaultLanguage}/${context.name}.md`;
  // Display editor only for markup content variants
  const isEditorVisible =
    markdownDir.includes("content") || markdownDir.includes("MarkdownEditor");

  const handleTranslations = async () => {
    const markdownFilePath = `${markdownDir}/markdown/${context.globals.locale}/${context.name}.md`;
    // Verify if the markdown files exist or translate from default
    return await isDocsAvailable({
      path: markdownFilePath, // new file path
      translatePath: defaultPath, // default translation file path
      localeTo: context.globals.locale, // new locale
      localeFrom: defaultLanguage, // default locale
    });
  };

  useEffect(() => {
    const translate = async () => {
      const hasDocs = await handleTranslations();
      if (hasDocs) {
        showAlert(true);
      }
      translateDocument(true);
    }
    translateDocument(false);
    isEditorVisible && translate();
  }, [context.globals.locale, isEditorVisible]);

  useTimeout(isAlertVisible, 7000, () => showAlert(false));

  const newContext = {
    ...context,
    args: {
      ...context.args,
      markdownPath: markdownFilePath,
      defaultPath,
      locale: context.globals.locale,
      defaultLocale: defaultLanguage,
    },
  };
  return (
    <Suspense fallback={<div>loading translations...</div>}>
      {!!isEditorVisible && (
        <ToastAlert
          message="Content is translated successfully"
          type="success"
          isDisplayed={isAlertVisible}
        />
      )}
      {!!isEditorVisible && (
        <ToastAlert
          message="Content is translating..."
          type="info"
          isDisplayed={isTranslated === false}
        />
      )}
      {!!isEditorVisible && isTranslated && (
        <DualEditor filePath={markdownFilePath} />
      )}
      <Story {...newContext} />
    </Suspense>
  );
};

i18n.on("languageChanged", (locale) => {
  const direction = i18n.dir(locale);
  document.dir = direction;
});

// Wrap your stories in the I18nextProvider component
const i18nextStoryDecorator = (Story, context) => {
  const [isAlertVisible, showAlert] = useState(false);
  const [isTranslated, translateDocument] = useState<boolean | null>(null);

  const { locale } = context.globals;
  const isComponent = context.title.includes("components");

  // When the locale global changes
  // Set the new locale in i18n
  useEffect(() => {
    i18n.changeLanguage(locale);
    const hasDocs = async () => {
      const docsCreated = await isComponentTranslationsAvailable({ localeTo: locale });
      if (docsCreated) {
        showAlert(true);
      }
      translateDocument(true);
    }
    isComponent && translateDocument(false);
    !!locale && isComponent && hasDocs();
  }, [locale]);

  useTimeout(isAlertVisible, 7000, () => showAlert(false));

  return (
    // here catches the suspense from components not yet ready (still loading translations)
    // alternative set useSuspense false on i18next.options.react when initializing i18next
    <>
      {!context.title.includes("Alert") && (
        <ToastAlert
          message="Content is translated successfully"
          type="success"
          isDisplayed={isAlertVisible}
        />
      )}
      {!context.title.includes("Alert") && (
        <ToastAlert
          message="Content is translating..."
          type="info"
          isDisplayed={isTranslated === false}
        />
      )}
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </>
  );
};

const preview: Preview = {
  decorators: [i18nextStoryDecorator, withEditor],
  parameters: {
    options: {
      panelPosition: "right",
    },
    readme: {
      codeTheme: "atom-dark",
    },
  },
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Internationalization locale",
      defaultValue: defaultLanguage,
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", title: "EN" },
          { value: "de", title: "DE" },
          { value: "lv", title: "LV" },
        ],
        showName: true,
      },
    },
  },
};

export default preview;
