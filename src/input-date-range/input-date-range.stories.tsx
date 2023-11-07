/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { InputDateRange } from "./input-date-range";
import { Timestamp } from "../types";

const meta = {
  title: "Example/Input-Range",
  component: InputDateRange,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof InputDateRange>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
  render: (args) => {
    const [value, setValue] = useState<[Timestamp, Timestamp] | undefined>();

    return <InputDateRange {...args} value={value} onChange={setValue} />;
  },
};
