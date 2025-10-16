'use client'

import { useEffect, useMemo } from 'react'

import {
  profileApi,
  useFollowMutation,
  useGetPublicUserProfileQuery,
  useUnfollowMutation,
} from '@/entities/profile/api/profileApi'
import { type PostsProps } from '@/entities/profile/type/types'
import { Count } from '@/entities/profile/ui/Count'
import { Posts } from '@/entities/profile/ui/Posts'
import { useMeQuery } from '@/features/auth/api/authRegApi'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'

import s from './Profile.module.scss'

export default function Profile({ profileData, profileId, initialPosts }: PostsProps) {
  const { data: meClient } = useMeQuery()
  const isAuthorized = meClient?.userId
  const profileDataFromCache = useAppSelector(
    state => profileApi.endpoints.getPublicUserProfile.select({ profileId })(state).data
  )
  const {} = useGetPublicUserProfileQuery({ profileId })
  const [unfollow] = useUnfollowMutation()
  const [follow] = useFollowMutation()
  const followHandler = () => follow({ selectedUserId: profileId })
  const unfollowHandler = () => unfollow({ userId: profileId })

  const isProfileOwner = meClient?.userId === profileData.id
  const dataForRender = useMemo(
    () => (profileDataFromCache ? profileDataFromCache : profileData),
    [profileDataFromCache, profileData]
  )
  const { isFollowing, avatars, userName, userMetadata, id, aboutMe } = dataForRender
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
          <Avatar alt={'avatar'} src={avatars[0]?.url} size={'large'} />
          <div className={s.profile__info}>
            <div className={s.profile__titleContainer}>
              <div className={s.profile__title}>{userName}</div>
              {isAuthorized &&
                (isProfileOwner ? (
                  <Button variant={'secondary'} as={Link} href={'/settings'}>
                    Profile Settings
                  </Button>
                ) : (
                  <div className={s.profile__buttons}>
                    <Button
                      variant={'primary'}
                      onClick={isFollowing ? unfollowHandler : followHandler}
                    >
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                    <Button variant={'secondary'}>Send Message</Button>
                  </div>
                ))}
            </div>

            <div className={s.profile__stats}>
              <Count countValue={userMetadata.following ?? 0} name={'Following'} />
              <Count countValue={userMetadata.followers ?? 0} name={'Followers'} />
              <Count countValue={userMetadata.publications ?? 0} name={'Publications'} />
            </div>
            <div className={s.profile__description}>{aboutMe}</div>
          </div>
        </div>

        {!!profileId && (
          <Posts isAuthorized={!!profileId} userId={id} initialItems={initialPosts} />
        )}
      </div>
    </div>
  )
}
