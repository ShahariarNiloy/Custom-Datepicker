/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import { DatepickerSimple } from "./datepicker-simple";
import { useState } from "react";
import { Timestamp } from "../types";
import { DatepickerPopup } from "../datepicker-popup";

const meta = {
  title: "Example/Simple",
  component: DatepickerSimple,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DatepickerSimple>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState<Timestamp | undefined>();
    console.log(value);
    return (
      <DatepickerPopup>
        <DatepickerSimple {...args} selected={value} onSelect={setValue} />
      </DatepickerPopup>
    );
  },
};
