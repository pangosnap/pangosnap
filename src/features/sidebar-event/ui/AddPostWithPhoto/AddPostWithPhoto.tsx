import CreateIcon from '@/shared/icons/create-icone.svg'
import { Button } from '@/shared/ui/Button/Button'

import s from '@/widgets/Sidebar/Sidebar.module.scss'

export const AddPostWithPhoto = () => {
  return (
    <>
      <Button variant={'icon'} className={s.iconBtn} aria-label={'Create'}>
        <CreateIcon />
      </Button>
      <span className={'uik_typography-body2-medium'}>Create</span>
    </>
  )
}
