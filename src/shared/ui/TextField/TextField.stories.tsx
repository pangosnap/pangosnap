import { useState } from 'react'

import { TextField } from './TextField'
import { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    type: {
      options: ['text', 'password', 'search'],
      control: { type: 'select' },
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    errorMessage: { control: 'text' },
    onClearClick: { action: 'cleared' },
  },
}

export default meta

type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
  },
}

export const Active: Story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
    value: 'Epam@epam.com',
  },
}

export const Error: Story = {
  args: {
    label: 'Email',
    value: 'Epam@epam.com',
    errorMessage: 'Error text',
  },
}

export const Hover: Story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const Focus: Story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
  },
  parameters: {
    pseudo: { focus: true },
  },
}

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
    disabled: true,
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
}

export const Search: Story = {
  render: args => {
    const [value, setValue] = useState('Search text')

    return (
      <TextField
        {...args}
        type={'search'}
        value={value}
        onChange={e => setValue(e.target.value)}
        onClearClick={() => setValue('')}
      />
    )
  },
  args: {
    placeholder: 'Search...',
  },
}

export const AllStates = () => {
  const [searchValue, setSearchValue] = useState('Search text')

  return (
    <div style={{ display: 'grid', gap: '20px', maxWidth: '400px' }}>
      <TextField label={'Email'} placeholder={'Placeholder text'} />

      <TextField label={'Email state'} value={'Sample text'} />

      <TextField
        label={'Error s'}
        value={'Invalid value'}
        errorMessage={'This field is required'}
      />

      <TextField label={'Disabled state'} placeholder={'Disabled field'} disabled />

      <TextField label={'Password field'} type={'password'} value={'password123'} />

      <TextField
        label={'Search field'}
        type={'search'}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onClearClick={() => setSearchValue('')}
      />
    </div>
  )
}
