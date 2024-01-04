/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { Timestamp } from "../types";
import { AntdCalendar } from "./antdCalendar";
import { DatepickerPopup } from "../datepicker-popup";

const meta = {
  title: "Example/AntdDatePcker",
  component: AntdCalendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AntdCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState<Timestamp | undefined>();
    console.log(value);
    return (
      <DatepickerPopup>
        <AntdCalendar {...args} selected={value} onSelect={setValue} />
      </DatepickerPopup>
    );
  },
};
