import { TextField } from './TextField'
import EyeClosedIcon from '@/shared/icons/EyeClosedIcon'
import EyeIcon from '@/shared/icons/EyeIcon'
import { SearchIcon } from '@/shared/icons/SearchIcon'
import { Meta, StoryObj } from '@storybook/nextjs'

const meta: Meta<typeof TextField> = {
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'search'],
    },
    variant: {
      control: 'select',
      options: ['default', 'active', 'error', 'hover', 'focus', 'disabled'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  decorators: [
    Story => (
      <div
        style={{
          background: 'var(--color-dark-700)',
          padding: '2rem',
          borderRadius: '8px',
          minHeight: '10vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
    variant: 'default',
  },
}

export const Active: Story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
    variant: 'active',
  },
}

export const Hover: Story = {
  args: {
    label: 'Email',
    placeholder: 'Epam@epam.com',
    variant: 'hover',
  },
}

export const Focus: Story = {
  args: {
    label: 'Focus input',
    placeholder: 'Focus state',
    variant: 'focus',
  },
}

export const FocusWithPassword: Story = {
  args: {
    type: 'password',
    label: 'Password with focus',
    placeholder: 'Enter password',
    variant: 'focus',
    rightIcon: <EyeClosedIcon />,
  },
}

export const Error: Story = {
  args: {
    label: 'Input with error',
    placeholder: 'Epam@epam.com',
    variant: 'error',
    errorMessage: 'Error text',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled input',
    placeholder: 'Epam@epam.com',
    variant: 'disabled',
  },
}

export const SearchField: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    leftIcon: <SearchIcon />,
  },
}

export const SearchFieldWithError: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    leftIcon: <SearchIcon />,
    variant: 'error',
    errorMessage: 'Error text',
  },
}

export const PasswordFieldHidden: Story = {
  args: {
    type: 'password',
    label: 'Password field',
    placeholder: 'Enter password',
    rightIcon: <EyeClosedIcon />,
  },
}

export const PasswordFieldVisible: Story = {
  args: {
    type: 'text',
    label: 'Password visible',
    placeholder: 'Password is visible',
    rightIcon: <EyeIcon />,
  },
}

export const WithLeftIcon: Story = {
  args: {
    label: 'With left icon',
    placeholder: 'Has left icon',
    leftIcon: <SearchIcon />,
  },
}

export const WithRightIcon: Story = {
  args: {
    label: 'With right icon',
    placeholder: 'Has right icon',
    rightIcon: <EyeIcon />,
  },
}

export const FullWidth: Story = {
  args: {
    label: 'Full width input',
    placeholder: 'Takes all available width',
  },
  decorators: [
    Story => (
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      <TextField label={'Default'} placeholder={'Default'} variant={'default'} />
      <TextField label={'Active'} placeholder={'Active'} variant={'active'} />
      <TextField label={'Hover'} placeholder={'Hover'} variant={'hover'} />
      <TextField label={'Focus'} placeholder={'Focus'} variant={'focus'} />
      <TextField
        label={'Password focused'}
        placeholder={'Enter password'}
        type={'password'}
        variant={'focus'}
        rightIcon={<EyeClosedIcon />}
      />
      <TextField
        label={'Error'}
        placeholder={'Error'}
        variant={'error'}
        errorMessage={'Validation error'}
      />
      <TextField
        placeholder={'Search error'}
        type={'search'}
        leftIcon={<SearchIcon />}
        variant={'error'}
        errorMessage={'Search error'}
      />
      <TextField label={'Disabled'} placeholder={'Disabled'} variant={'disabled'} />
    </div>
  ),
}
