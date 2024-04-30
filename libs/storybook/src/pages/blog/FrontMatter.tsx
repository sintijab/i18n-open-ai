import React, { useEffect, useState } from "react";
import "remirror/styles/all.css";

import { Remirror, useRemirror } from "@remirror/react";

import { isDocsAvailable } from "../../utils/file-utils";
import { ToastAlert } from "../../components/Alert";
import { useTimeout } from "../../utils/react-utils";
import { getFrontMatter } from "../../utils/request-utils";
import { NavigationBar } from "../../components/Navigation";
import { IBlog } from "./types";
import { extensions } from "../../MarkdownEditor/MarkdownDual";
import "./styles.css";

export const FrontMatter = ({
  markdownPath,
  defaultPath,
  locale,
  defaultLocale,
}: {
  markdownPath: string;
  defaultPath: string;
  locale: string;
  defaultLocale: string;
}) => {
  const [isAlertVisible, showAlert] = useState(false);
  const [components, setComponentData] = useState<IBlog>(null);
  const [htmlContent, setContentData] = useState<string>("Text content");

  useTimeout(isAlertVisible, 7000, () => showAlert(false));

  useEffect(() => {
    const getFileComponents = async () => {
      return await getFrontMatter({
        filePath: markdownPath,
        directory: "src",
      }).then((res) => res.json()) as Promise<{ data: { sections, title: string, description }, content: string }>;
    };
    const handleComponents = async () => {
      try {
        const docsCreated = await isDocsAvailable({
          path: markdownPath,
          translatePath: defaultPath,
          localeFrom: defaultLocale,
          localeTo: locale,
        })
        if (docsCreated) {
          showAlert(true);
        }
        const components = await getFileComponents();
        setComponentData(components.data);
        setContentData(components.content);
      } catch (e) {
        console.log(e)
      }
    }
    void handleComponents();
  }, [locale]);

  const { sections, title, description } = components || {};
  const nav = sections?.find((section) => section.type === "Navigation");

  const { manager, state } = useRemirror({
    extensions: extensions,
    content: htmlContent,
    selection: "start",
    stringHandler: "markdown",
  });

  useEffect(() => {
    manager?.view?.updateState(manager.createState({ content: htmlContent }));
  }, [htmlContent]);

  return (
    <>
      <ToastAlert
        message="File is created successfully"
        type="success"
        isDisplayed={isAlertVisible}
      />
      {nav && <NavigationBar items={nav.items} />}
      {title && <h1>{title}</h1>}
      {description && <h2>{description}</h2>}
      <div className="remirror-theme">
        {/* the className is used to define css variables necessary for the editor */}
        <Remirror editable={false} manager={manager} initialContent={state} />
      </div>
    </>
  );
};
