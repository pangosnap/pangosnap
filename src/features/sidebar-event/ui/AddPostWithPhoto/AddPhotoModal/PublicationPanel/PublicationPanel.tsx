import { profileApi } from '@/entities/profile/api/profileApi'
import { useAppSelector } from '@/shared/hooks'
import Avatar from '@/shared/ui/Avatar/Avatar'

import s from './PublicationPanel.module.scss'

export const PublicationPanel = () => {
  const userName = useAppSelector(
    state => profileApi.endpoints.getProfile.select()(state)?.data?.userName
  )

  return (
    <div>
      <div>
        <Avatar size={'small'} alt={'Avatar'} />
        <span className={s.userName}>{userName}</span>
      </div>
      <div className={s.Description}>
        <label className={s.label}>Add publication descriptions</label>
        <textarea className={'uik_typography-body1'} placeholder={'Text-area'}></textarea>
      </div>
    </div>
  )
}
