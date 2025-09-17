'use client'
import { useGetPublicUserProfileQuery } from '@/entities/profile/api/profileApi'
import Count from '@/entities/profile/ui/Count/Count'
import { Posts } from '@/entities/profile/ui/Posts'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button/Button'
import { ProfileData } from '@/views/profile/ui/ProfileView'

import s from './Profile.module.scss'

type Props = {
  initialProfile: ProfileData
  userId: number
}

export default function Profile({ initialProfile, userId }: Props) {
  const { data: fetched } = useGetPublicUserProfileQuery({ profileId: userId }, { skip: !userId })

  const profileData = fetched ?? initialProfile
  const isProfileOwner = Boolean(userId)

  return (
    <div className={s.profile}>
      <div className={s.profile__container}>
        <div className={s.profile__header}>
          <Avatar alt={'avatar'} src={profileData.avatars?.[0]?.url} size={'large'} />

          <div className={s.profile__info}>
            <div className={s.profile__titleContainer}>
              <div className={s.profile__title}>{profileData.userName}</div>
              {isProfileOwner && (
                <div>
                  <Button variant={'secondary'}>Profile Settings</Button>
                </div>
              )}
            </div>

            <div className={s.profile__stats}>
              <Count countValue={profileData.userMetadata?.following ?? 0} name={'Following'} />
              <Count countValue={profileData.userMetadata?.followers ?? 0} name={'Followers'} />
              <Count
                countValue={profileData.userMetadata?.publications ?? 0}
                name={'Publications'}
              />
            </div>

            <div className={s.profile__description}>{profileData.aboutMe}</div>
          </div>
        </div>

        {!!userId && <Posts isAuthorized userId={userId} />}
      </div>
    </div>
  )
}
