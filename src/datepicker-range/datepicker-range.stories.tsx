/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { Timestamp } from "../types";
import { DatepickerPopup } from "../datepicker-popup";

import { DatepickerRange } from "./datepicker-range";
import { checkInRange } from "../utils";

const minDate = new Date();
minDate.setHours(0, 0, 0, 0);
minDate.setDate(minDate.getDate());
const maxDate = new Date();
maxDate.setHours(0, 0, 0, 0);
maxDate.setDate(minDate.getDate() + 30);

const onDisableDay = (dateTimestamp: Timestamp): boolean =>
  !checkInRange(dateTimestamp, [minDate.getTime(), maxDate.getTime()]);

const meta = {
  title: "Example/Range",
  component: DatepickerRange,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DatepickerRange>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState<[Timestamp, Timestamp]>([
      Date.now() as Timestamp,
      maxDate.getTime() as Timestamp,
    ]);

    return (
      <DatepickerPopup>
        <DatepickerRange
          {...args}
          selected={value}
          onSelect={setValue}
          onDisableDay={onDisableDay}
        />
      </DatepickerPopup>
    );
  },
};
