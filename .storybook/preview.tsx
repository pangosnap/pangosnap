import '@/app/styles/index.scss'
import { themes } from '@storybook/theming'

import { Preview } from '@storybook/react'
import { Decorator } from '@storybook/react'

const darkBackgroundDecorator: Decorator = StoryFn => (
  <div
    style={{
      background: '#0d0d0d',
      minHeight: '100vh',
      padding: '20px',
    }}
  >
    <StoryFn />
  </div>
)

const preview: Preview = {
  decorators: [darkBackgroundDecorator],
  parameters: {
    docs: {
      theme: themes.dark,
    },
  },
}

export default preview
