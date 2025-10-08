'use client'

import { useEffect, useMemo } from 'react'

import { profileApi, useGetPublicUserProfileQuery } from '@/entities/profile/api/profileApi'
import { type PostsProps } from '@/entities/profile/type/types'
import { Count } from '@/entities/profile/ui/Count'
import { Posts } from '@/entities/profile/ui/Posts'
import { useMeQuery } from '@/features/auth/api/authRegApi'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button/Button'

import s from './Profile.module.scss'

export default function Profile({ profileData, profileId, initialPosts }: PostsProps) {
  const { data: meClient } = useMeQuery()
  const profileDataFromCache = useAppSelector(
    state => profileApi.endpoints.getPublicUserProfile.select({ profileId })(state).data
  )
  const {} = useGetPublicUserProfileQuery({ profileId }, { skip: !profileDataFromCache })
  const isProfileOwner = meClient?.userId === profileData.id
  const dataForRender = useMemo(
    () => (profileDataFromCache ? profileDataFromCache : profileData),
    [profileDataFromCache, profileData]
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!profileDataFromCache) {
      dispatch(profileApi.util.upsertQueryData('getPublicUserProfile', { profileId }, profileData))
    }
  }, [dispatch, profileData, profileId, profileDataFromCache])

  return (
    <div className={s.profile}>
      <div className={s.profile__container}>
        <div className={s.profile__header}>
          <Avatar alt={'avatar'} src={dataForRender?.avatars[0]?.url} size={'large'} />
          <div className={s.profile__info}>
            <div className={s.profile__titleContainer}>
              <div className={s.profile__title}>{dataForRender?.userName}</div>
              {isProfileOwner && (
                <div>
                  <Button variant={'secondary'}>Profile Settings</Button>
                </div>
              )}
            </div>

            <div className={s.profile__stats}>
              <Count countValue={dataForRender?.userMetadata.following ?? 0} name={'Following'} />
              <Count countValue={dataForRender?.userMetadata.followers ?? 0} name={'Followers'} />
              <Count
                countValue={dataForRender?.userMetadata.publications ?? 0}
                name={'Publications'}
              />
            </div>
            <div className={s.profile__description}>{dataForRender?.aboutMe}</div>
          </div>
        </div>

        {!!profileId && (
          <Posts isAuthorized={!!profileId} userId={dataForRender.id} initialItems={initialPosts} />
        )}
      </div>
    </div>
  )
}
