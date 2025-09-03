'use client'
import { useEffect } from 'react'

import { useGetPublicUserProfileQuery } from '@/entities/profile/api/profileApi'
import { Count } from '@/entities/profile/ui/Count'
import { Posts } from '@/entities/profile/ui/Posts'
import { useMeQuery } from '@/features/auth/api/authRegApi'
import { useCarryQuery } from '@/shared/hooks/useCarryQuery'
import { Path } from '@/shared/routes/constants'
import { Avatar } from '@/shared/ui/Avatar'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import s from './Profile.module.scss'

export default function Profile() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { data: user } = useMeQuery(undefined, {
    selectFromResult: ({ data }) => ({ data }),

    refetchOnMountOrArgChange: false,
    refetchOnFocus: false,
    refetchOnReconnect: false,
  })

  const { data: profileData } = useGetPublicUserProfileQuery(
    { profileId: Number(id) },
    { skip: !id }
  )

  const isProfileOwner = !!id && user?.userId && Number(id) === user.userId

  const href = useCarryQuery()

  useEffect(() => {
    if (!id) {
      router.push(Path.main)
    }
  }, [id, router])

  return (
    <div className={s.profile}>
      <Link href={href('/post/1')} scroll={false}>
        Открыть пост
      </Link>
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

        {!!id && <Posts isAuthorized={!!user?.userId} userId={+id} />}
      </div>
    </div>
  )
}
