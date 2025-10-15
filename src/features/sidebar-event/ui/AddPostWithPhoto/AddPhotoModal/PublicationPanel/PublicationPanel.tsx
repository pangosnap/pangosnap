import { ChangeEventHandler, useState } from 'react'

import { useGetProfileQuery } from '@/entities/profile/api/profileApi'
import Avatar from '@/shared/ui/Avatar/Avatar'
import { clsx } from 'clsx'

import s from './PublicationPanel.module.scss'

const MAX_DESC = 500

type Props = {
  descriptionValue: (description: string) => void
}
export const PublicationPanel = ({ descriptionValue }: Props) => {
  const [text, setText] = useState<string>('')
  const { data } = useGetProfileQuery()
  const userName = data?.userName

  const descriptionHandler: ChangeEventHandler<HTMLTextAreaElement> = e => {
    setText(e.currentTarget.value)
    descriptionValue(e.currentTarget.value)
  }

  const counter = text.length

  return (
    <div>
      <div className={s.info}>
        <Avatar size={'small'} alt={'Avatar'} />
        <span className={s.userName}>{userName}</span>
      </div>
      <div className={s.Description}>
        <label className={clsx('uik_typography-body2', s.label)}>
          Add publication descriptions
        </label>
        <textarea
          value={text}
          onChange={descriptionHandler}
          maxLength={MAX_DESC}
          className={clsx('uik_typography-body1', s.textarea)}
          placeholder={'Text-area'}
        />
        <span className={s.counter}>
          {counter}/{MAX_DESC}
        </span>
      </div>
    </div>
  )
}
