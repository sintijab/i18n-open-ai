# Internationalization (i18n) With AI-Powered Language Model

Build fully customizable **Internationalization tool for creating and translating digital content**. This project has built-in MD and MDX file support for the purpose of demonstration. Markdown is commonly used to author text-heavy content like blog posts and documentation. The other common file extension is JSON for importing and exporting the content for headless content management systems.

## Editing bulk content at glance

The main problem with bulk content creation is planning **how to introduce translations** with limitations of the existing content management systems.

**Building Web application that supports multi lingual context** with custom solutions made with [Astro JS](https://docs.astro.build/en/getting-started/), Remirror and Storybook enables fast and efficient workflows.

Mono-repository with powerful editing via [Visual Studio Code](https://code.visualstudio.com/) and [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) integrated with the file system can make hundreds of file changes with a single search and replace pattern. It allows to setup multiple packages in a way to **automate the development workflow** and run **one command to install and manage all** of them in a single pass.

[Content collections](https://docs.astro.build/en/guides/content-collections/) helps organizing content, validate your frontmatter, website preliminary matter, and provide automatic TypeScript support while working with content.

## Blow up by collaborative editing

The second problem of managing the translated content is the efficiency of **collaborative editing** and assigning different roles for the content creation, reviews as well as validating accuracy and quality of translations.

Collaborative editing must be controlled process that allows transforming translated files into the **supported publishing formats**. Nevertheless, for the pre-published content to be previewed along with all its components the files must be **readable by browser**, adding extra layer to the development.

The HTML rich text editors like Remirror integrates [Prosemirror](https://prosemirror.net/) and TypeScript into a standard toolkit for building rich text editors. [Remirror](https://remirror.io/docs) provides extensions that abstract over various ProseMirror concepts such as schemas, commands and plugins, making it much simpler to **build extensions** and **connect visual editing with UI elements**.

Editing via Rich text editors allows **collaborative editing to preview, edit, copy and paste, undo** or move already formatted rich text elements across the web. Yet, working with text is equally important, for example, when highlighting important snippets with a color, font style, or adding comments when reviewing the articles.

## **Automated workflows**

The content creation for bulk editing is always linked with the **User Interface** which grows in complexity in two directions- one is all-in-one Content Management System interface controlling the domain. The second is the mirroring source code platform, a domain adapter or class that wraps a domain and provides additional methods to enhance testability.

Storybook is packaged as a small, development-only, [workshop](https://bradfrost.com/blog/post/a-frontend-workshop-environment/) environment that lives alongside your app. It provides an isolated iframe to render components **without interference from app business logic and context**. Such a tools help development teams visualize components and construct templates and representative pages outside of the application environment.

Storybook is mostly known for **Design System workshop**. By creating granular UI component variation designers, engineers and teams in collaborative mode are using those stories **for software development, testing, and documentation**, and yet, it can be integrated with other powerful tools for Internationalization and testing.
