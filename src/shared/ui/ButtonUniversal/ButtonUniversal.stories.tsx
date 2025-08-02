import { ButtonUniversal } from '@/shared/ui/ButtonUniversal/ButtonUniversal'
import { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  component: ButtonUniversal,
} satisfies Meta<typeof ButtonUniversal>

type Story = StoryObj<typeof ButtonUniversal>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}

export default meta
