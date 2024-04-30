# Internationalization (i18n) With AI-Powered Language Model

This project contains two workspaces, one for building components with automated
translations, and the other for demonstrating the frontmatter in nextjs
application. <br>

### Getting started

#### Install dependencies

```sh
yarn
```

#### Run storybook locally

Create .env file in the libs/storybook workspace and export your Open AI API key

```yaml
OPENAI_API_KEY=YOUR_KEY
```

Test it on Storybook local environment

```sh
yarn workspace jsnation storybook
```

#### Start application

```sh
yarn workspace nextjs-markdown dev
```
