import "@remirror/styles/all.css";
import { useEffect } from "react";
import { css as styled } from "@emotion/css";
import {
  CommandButton,
  HeadingLevelButtonGroup,
  ListButtonGroup,
  ReactExtensions,
  Remirror,
  ThemeProvider,
  ToggleBlockquoteButton,
  ToggleBoldButton,
  ToggleCodeBlockButton,
  ToggleCodeButton,
  ToggleItalicButton,
  ToggleStrikeButton,
  Toolbar,
  useRemirror,
  UseRemirrorReturn,
} from "@remirror/react";
import { AllStyledComponent } from "@remirror/styles/emotion";
import { createContextState } from "create-context-state";
import React, { useState } from "react";
import css from "refractor/lang/css.js";
import javascript from "refractor/lang/javascript.js";
import json from "refractor/lang/json.js";
import jsx from "refractor/lang/jsx.js";
import md from "refractor/lang/markdown.js";
import typescript from "refractor/lang/typescript.js";
import { ExtensionPriority, getThemeVar, RemirrorContentType } from "remirror";
import "./styles.css";
import {
  BlockquoteExtension,
  BoldExtension,
  BulletListExtension,
  CodeBlockExtension,
  CodeExtension,
  DocExtension,
  HardBreakExtension,
  HeadingExtension,
  ItalicExtension,
  ImageExtension,
  LinkExtension,
  ListItemExtension,
  MarkdownExtension,
  OrderedListExtension,
  StrikeExtension,
  TableExtension,
  TaskListExtension,
  TrailingNodeExtension,
} from "remirror/extensions";

import { IMarkdownBasic, IMarkdownEditor } from "./types";
import { MarkDownButtonGroup } from "./utils/MarkdownButtonGroup";
import { HIDE_EDITOR, SHOW_EDITOR, TableMenu } from "./utils/TableMenu";

interface Context extends Props {
  setMarkdown: (markdown: string) => void;
  setVisual: (markdown: string) => void;
}

interface Props {
  visual: UseRemirrorReturn<
    ReactExtensions<ReturnType<typeof extensions>[number]>
  >;
  markdown: UseRemirrorReturn<
    ReactExtensions<CodeBlockExtension | ImageExtension | DocExtension>
  >;
}

const [DualEditorProvider, useDualEditor] = createContextState<Context, Props>(
  ({ props }) => {
    return {
      ...props,

      setMarkdown: (text: string) => {
        return props.markdown.getContext()?.setContent({
          type: "doc",
          content: [
            {
              type: "codeBlock",
              attrs: { language: "markdown" },
              content: text ? [{ type: "text", text }] : undefined,
            },
          ],
        });
      },
      setVisual: (markdown: string) => {
        return props.visual.getContext()?.setContent(markdown);
      },
    };
  },
);

const MarkdownTextEditor = ({
  toggleEdit,
  editButtonText,
  filePath,
}: IMarkdownBasic) => {
  const { markdown, setVisual } = useDualEditor();
  const [visualText, setVisualText] = useState("");

  return (
    <Remirror
      manager={markdown.manager}
      autoRender="end"
      onChange={({ helpers, state }) => {
        const text: string = helpers.getText({ state });
        setVisualText(text);
        return setVisual(text);
      }}
      initialContent={markdown.state}
      classNames={[
        styled`
          &.ProseMirror {
            pre {
              height: 100%;
              padding: ${getThemeVar("space", 3)};
              margin: 0;
            }
          }
        `,
      ]}
    >
      <MarkDownButtonGroup
        onEdit={toggleEdit}
        editButtonText={editButtonText}
        markdown={visualText}
        filePath={filePath}
      />
    </Remirror>
  );
};

const VisualEditor = ({
  filePath,
  toggleEdit,
  editButtonText,
}: IMarkdownBasic) => {
  const { visual, setMarkdown } = useDualEditor();
  const [markdown, saveMarkdown] = useState("");
  const [tableVisible, toggleTableCommands] = useState(false);
  const [iframeVisible, toggleIframeCommands] = useState(false);

  return (
    <Remirror
      autoFocus
      manager={visual.manager}
      autoRender="end"
      onChange={({ helpers, state }) => {
        const text: string = helpers.getMarkdown(state);
        saveMarkdown(text);
        return setMarkdown(text);
      }}
      initialContent={visual.state}
      classNames={[
        styled`
          &.ProseMirror {
            table {
              p {
                padding: 4px;
              }
              th {
                background-color: var(--rmr-color-table-default-controller);
              }
            }

            a {
              color: var(--chakra-colors-primary-weekendViolet-1000);
              cursor: pointer;
              margin-top: ${getThemeVar("space", 3)}!important;
            }

            ol,
            ul {
              padding: revert;
              margin: revert;
            }
            p,
            h3,
            h4,
            h5,
            h6 {
              margin-top: ${getThemeVar("space", 2)}!important;
              margin-bottom: ${getThemeVar("space", 2)}!important;
            }

            h1,
            h2 {
              margin-bottom: ${getThemeVar("space", 3)}!important;
              margin-top: ${getThemeVar("space", 3)}!important;
            }
          }
        `,
      ]}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "100%",
          margin: "1rem",
        }}
      >
        <MarkDownButtonGroup
          filePath={filePath}
          markdown={markdown}
          onEdit={toggleEdit}
          editButtonText={editButtonText}
        />
      </div>
      <Toolbar>
        <ToggleBoldButton />
        <ToggleItalicButton />
        <ToggleStrikeButton />
        <HeadingLevelButtonGroup showAll />
        <ToggleBlockquoteButton />
        <ListButtonGroup />
        <ToggleCodeBlockButton />
        <ToggleCodeButton />
        <CommandButton
          onSelect={() => toggleTableCommands(!tableVisible)}
          icon="table2"
          enabled
          commandName={""}
        />
        <CommandButton
          onSelect={() => toggleIframeCommands(!iframeVisible)}
          icon="videoLine"
          enabled
          commandName={""}
        />
      </Toolbar>
      {tableVisible && <TableMenu />}
    </Remirror>
  );
};

/**
 * The editor which is used to create the annotation. Supports formatting.
 */
export const DualEditor: React.FC<IMarkdownEditor> = ({ filePath = "" }) => {
  const [isEditorVisible, toggleEdit] = useState(false);
  const editButtonText = isEditorVisible ? HIDE_EDITOR : SHOW_EDITOR;
  let initialContent = `` as unknown as RemirrorContentType;
  try {
    initialContent =
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require(`../${filePath}`); // nosemgrep: eslint.detect-non-literal-require
  } catch (e) {
    // file hasn't been created
  }
  const visual = useRemirror({
    extensions,
    stringHandler: "markdown",
    content: initialContent,
  });
  const { manager } = visual;
  const markdown = useRemirror({
    extensions: () => [
      new DocExtension({ content: "codeBlock" }),
      new CodeBlockExtension({
        supportedLanguages: [md, typescript],
        defaultLanguage: "markdown",
        syntaxTheme: "base16_ateliersulphurpool_light",
        defaultWrap: true,
      }),
      new ImageExtension({ enableResizing: true }),
    ],
    builtin: {
      exitMarksOnArrowPress: false,
    },

    stringHandler: "html",
  });

  useEffect(() => {
    manager.view.updateState(manager.createState({ content: initialContent }));
  }, [filePath]);
  return (
    <DualEditorProvider visual={visual} markdown={markdown}>
      <AllStyledComponent>
        <ThemeProvider>
          <div style={{ display: !isEditorVisible ? "block" : "none" }}>
            <VisualEditor
              filePath={filePath}
              toggleEdit={() => toggleEdit(!isEditorVisible)}
              editButtonText={editButtonText}
            />
          </div>
          <div style={{ display: isEditorVisible ? "block" : "none" }}>
            <MarkdownTextEditor
              filePath={filePath}
              toggleEdit={() => toggleEdit(!isEditorVisible)}
              editButtonText={editButtonText}
            />
          </div>
        </ThemeProvider>
      </AllStyledComponent>
    </DualEditorProvider>
  );
};
const linkExtension = new LinkExtension({ autoLink: true });
linkExtension.addHandler("onClick", (_, data) => {
  // nosemgrep: eslint.detect-non-literal-fs-filename
  window.open(data.href, "_blank", "noopener");
  return true;
});

export const extensions = () => [
  linkExtension,
  new BoldExtension({ weight: 500 }),
  new StrikeExtension(),
  new ItalicExtension(),
  new BlockquoteExtension(),
  new BulletListExtension({ enableSpine: true }),
  new OrderedListExtension(),
  new ListItemExtension({
    priority: ExtensionPriority.High,
    enableCollapsible: true,
  }),
  new CodeExtension(),
  new CodeBlockExtension({
    supportedLanguages: [css, jsx, javascript, json, md, typescript],
  }),
  new TrailingNodeExtension(),
  new TableExtension(),
  new MarkdownExtension({ copyAsMarkdown: false }),
  new TaskListExtension(),
  new HeadingExtension({ defaultLevel: 1 }),
  new HardBreakExtension(),
  new ImageExtension({ enableResizing: true }),
];
