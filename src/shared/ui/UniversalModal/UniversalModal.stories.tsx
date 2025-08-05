import { useState } from 'react'

import { Button } from '@/shared/ui/Button/Button'
import { UniversalModal } from '@/shared/ui/UniversalModal/UniversalModal'
import { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  component: UniversalModal,
} satisfies Meta<typeof UniversalModal>

type Story = StoryObj<typeof UniversalModal>
export default meta

export const BaseModal: Story = {
  args: {
    open: true,
    onClose: () => console.log('on close'),
    modalTitle: 'modal title',
    children: 'Lorem ipsum dolor sit amet...',
  },
}
export const BaseModalWithButton: Story = {
  render: () => {
    const [showModal, setShowModal] = useState(false)

    const openModalHandler = () => {
      setShowModal(true)
    }

    const closeModalHandler = () => {
      setShowModal(false)
    }

    return (
      <>
        <Button variant={'primary'} onClick={openModalHandler}>
          Open modal
        </Button>
        <UniversalModal
          open={showModal}
          onClose={closeModalHandler}
          size={'sm'}
          modalTitle={'Email sent'}
        >
          <span> We have sent a link to confirm your email to epam@epam.com</span>
        </UniversalModal>
      </>
    )
  },
}
