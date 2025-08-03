import { Button } from '@/shared/ui/Button/Button'
import { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  component: Button,
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
}
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Button',
  },
}
export const Text: Story = {
  args: {
    variant: 'text',
    children: 'Button',
  },
}
export const ButtonDisabled: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
    disabled: true,
  },
}
export const ButtonAsLink: Story = {
  args: {
    ...Primary.args,
    children: <a href={'https://google.com'}>Google</a>,
  },
}

export default meta
