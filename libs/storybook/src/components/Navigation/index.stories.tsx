import { Meta } from "@storybook/react";
import { NavigationBar } from "./";

// for this case we have set i18n.use(initReactI18next) in '../src/i18n' so no I18nextProvicer is needed to pass i18n down via context api

const meta: Meta = {
  component: NavigationBar,
  args: {},
};

const mocks = [
  {
    label: "navigation.items.speakers",
    href: "#speakers",
  },
  {
    label: "navigation.items.schedule",
    href: "/schedule-offline",
  },
  {
    label: "navigation.items.workshops",
    href: "/#workshops-list",
  },
  {
    label: "navigation.items.venue",
    href: "/#location",
  },
  {
    label: "navigation.items.awards",
    href: "/#awards",
  },
  {
    label: "navigation.items.events",
    href: "/pre-event",
  },
  {
    label: "navigation.items.sponsors",
    href: "#sponsors",
  },
  {
    label: "navigation.items.faq",
    href: "/faq",
  },
];

export const Navigation = { args: { items: mocks, i18next: true } };

export default meta;
