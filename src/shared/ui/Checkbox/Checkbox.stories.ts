import type { Meta, StoryObj } from '@storybook/nextjs'

import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'

const meta = {
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#0D0D0D' },
      },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const CheckboxWithoutLabel: Story = {
  args: {
    className: 'background-storybook',
    onChange: () => {},
  },
}

export const CheckboxWithLabel: Story = {
  args: {
    label: 'Check-box',
    onChange: () => {},
  },
}

export const DisabledCheckbox: Story = {
  args: {
    label: 'disabled checkbox',
    disabled: true,
    onChange: () => {},
  },
}
