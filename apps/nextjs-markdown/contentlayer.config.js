import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
};

const Image = defineNestedType(() => ({
  name: "Image",
  fields: {
    src: {
      type: "string",
    },
    alt: {
      type: "string",
    },
  },
}));

const Button = defineNestedType(() => ({
  name: "Button",
  fields: {
    label: {
      type: "string",
    },
    url: {
      type: "string",
    },
    theme: {
      type: "enum",
      options: ["outline", "primary"],
      default: "outline",
    },
  },
}));

const Hero = defineNestedType(() => ({
  name: "Hero",
  fields: {
    heading: {
      type: "string",
    },
    body: {
      type: "string",
    },
    button: {
      type: "nested",
      of: Button,
    },
    image: {
      type: "nested",
      of: Image,
    },
  },
}));
const Item = defineNestedType(() => ({
  name: "Item",
  fields: {
    label: {
      type: "string",
      required: true,
    },
    href: {
      type: "string",
      required: true,
    },
  },
}));

const Navigation = defineNestedType(() => ({
  name: "Navigation",
  fields: {
    items: {
      type: "list",
      of: Item,
    },
  },
}));

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    published: {
      type: "boolean",
      default: true,
    },
    sections: {
      type: "list",
      of: [Hero, Navigation],
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Page],
});
