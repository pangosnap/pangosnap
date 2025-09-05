import { useState } from 'react'

import { useCreatePostsMutation, usePostsImageMutation } from '@/features/sidebar-event/api/postApi'
import { AddPhotoModal } from '@/features/sidebar-event/ui/AddPostWithPhoto/AddPhotoModal/AddPhotoModal'
import CreateIcon from '@/shared/icons/create-icon.svg'
import { Button } from '@/shared/ui/Button/Button'

import s from '@/widgets/Sidebar/Sidebar.module.scss'

export const AddPostWithPhoto = () => {
  const [postsImage] = usePostsImageMutation()
  const [post] = useCreatePostsMutation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const addPhotoModalHandler = async (validFiles: File[], description: string) => {
    try {
      const res = await postsImage({ file: validFiles }).unwrap()
      const childrenMetadata = res.images.map(i => ({ uploadId: i.uploadId }))

      await post({ description, childrenMetadata })
    } catch (error) {
      console.error(error)
    }
  }

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
        <AddPhotoModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalTitle={'Add Photo'}
          onConfirm={addPhotoModalHandler}
        />
      )}
    </>
  )
}
