'use client'

import { type PostsProps } from '@/entities/profile/type/types'
import { Count } from '@/entities/profile/ui/Count'
import { Posts } from '@/entities/profile/ui/Posts'
import { useMeQuery } from '@/features/auth/api/authRegApi'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button/Button'

import s from './Profile.module.scss'

export default function Profile({ profileData, profileId, initialPosts }: PostsProps) {
  const { data: meClient } = useMeQuery()

  const isProfileOwner = meClient?.userId === profileData.id

  return (
    <div className={s.profile}>
      <div className={s.profile__container}>
        <div className={s.profile__header}>
          <Avatar alt={'avatar'} src={profileData?.avatars[0]?.url} size={'large'} />
          <div className={s.profile__info}>
            <div className={s.profile__titleContainer}>
              <div className={s.profile__title}>{profileData?.userName}</div>
              {isProfileOwner && (
                <div>
                  <Button variant={'secondary'}>Profile Settings</Button>
                </div>
              )}
            </div>

            <div className={s.profile__stats}>
              <Count countValue={profileData?.userMetadata.following ?? 0} name={'Following'} />
              <Count countValue={profileData?.userMetadata.followers ?? 0} name={'Followers'} />
              <Count
                countValue={profileData?.userMetadata.publications ?? 0}
                name={'Publications'}
              />
            </div>
            <div className={s.profile__description}>{profileData?.aboutMe}</div>
          </div>
        </div>

        {!!profileId && (
          <Posts
            isAuthorized={!!profileId}
            userId={profileData.id}
            initialItems={initialPosts?.items}
          />
        )}
      </div>
    </div>
  )
}
