// import { useSelector } from 'react-redux'
//
// import { RootState } from '@/app/store'
//
// export const useAppSelector = useSelector.withTypes<RootState>()

import type { RootState } from '@/app/store'

import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
