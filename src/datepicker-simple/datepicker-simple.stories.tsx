/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import { DatepickerSimple } from "./datepicker-simple";
import { useState } from "react";
import { Timestamp } from "../types";
import { DatepickerPopup } from "../datepicker-popup";
import { MonthPicker } from "../month-picker";
import { Slider } from "../circularSlider/Slider";
import MultiRangeSlider from "../slider/slider";

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
export const Month: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState<Timestamp | number>();
    console.log(value);
    return (
      <DatepickerPopup>
        <MonthPicker {...args} onSelect={setValue} />
      </DatepickerPopup>
    );
  },
};

export const MonthSlider: Story = {
  args: {},
  render: () => {
    const sliderOptions = {
      sliders: [
        {
          radius: 120,
          min: 1,
          max: 12,
          step: 1,
          initialValue: 1,
          color: "#0984e3",
          displayName: "Value 2",
        },
      ],
    };

    return (
      <DatepickerPopup>
        <Slider {...sliderOptions} />
      </DatepickerPopup>
    );
  },
};

export const PriceSlider: Story = {
  args: {},
  render: () => {
    // const []
    return (
      <MultiRangeSlider
        min={0}
        max={1000}
        onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
      />
    );
  },
};
