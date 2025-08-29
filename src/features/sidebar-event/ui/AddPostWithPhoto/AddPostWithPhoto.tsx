import { useState } from 'react'

import { AddPhotoModal } from '@/features/sidebar-event/ui/AddPostWithPhoto/AddPhotoModal/AddPhotoModal'
import CreateIcon from '@/shared/icons/create-icon.svg'
import { Button } from '@/shared/ui/Button/Button'

import s from '@/widgets/Sidebar/Sidebar.module.scss'

export const AddPostWithPhoto = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant={'icon'}
        className={s.rowBtn}
        aria-label={'Create'}
      >
        <CreateIcon className={s.iconBtn} />
        <span className={'uik_typography-body2-medium'}>Create</span>
      </Button>
      {isModalOpen && (
        // <UniversalModal
        //   open={isModalOpen}
        //   onClose={() => setIsModalOpen(false)}
        //   modalTitle={'Create'}
        // ></UniversalModal>
        <AddPhotoModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalTitle={'Add Photo'}
        />
      )}
    </>
  )
}
