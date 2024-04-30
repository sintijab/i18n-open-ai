import { Meta } from "@storybook/react";
import { ToastAlert } from "./";

// for this case we have set i18n.use(initReactI18next) in '../src/i18n' so no I18nextProvicer is needed to pass i18n down via context api

const meta: Meta<typeof ToastAlert> = {
  component: ToastAlert,
  args: {},
  argTypes: {
    isDisplayed: {
      control: {
        type: "boolean",
      },
    },
  },
};

export const AlertSuccess: Meta = {};
AlertSuccess.args = {
  message: "Successful",
  type: "success",
};

export const AlertInfo: Meta = {};
AlertInfo.args = {
  message: "Info",
  type: "info",
};

export const AlertError: Meta = {};
AlertError.args = {
  message: "Error",
  type: "error",
};

export default meta;
