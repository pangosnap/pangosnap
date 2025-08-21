import type { Meta, StoryObj } from '@storybook/nextjs'

import { Card } from './Card'

const meta = {
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const CardDemo: Story = {
  args: {
    title: 'Card title',
    children: <div>Card content</div>,
  },
}
