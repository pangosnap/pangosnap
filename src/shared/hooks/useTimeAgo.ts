import { useMemo } from 'react'

interface UseTimeAgoOptions {
  dateString: string
  includeSeconds?: boolean
  capitalize?: boolean
}

interface TimeAgoResult {
  formatted: string
  isRecent: boolean
  isToday: boolean
  isThisYear: boolean
}

const TIME_INTERVALS = {
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  month: 30 * 24 * 60 * 60 * 1000,
  year: 365 * 24 * 60 * 60 * 1000,
} as const

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

/**
 * Custom hook to format dates as "X minutes ago" or human-readable date
 */

export function useTimeAgo(
  dateStringOrOptions: string | UseTimeAgoOptions
): string | TimeAgoResult {
  return useMemo(() => {
    // Extract parameters based on argument type
    const dateString =
      typeof dateStringOrOptions === 'string' ? dateStringOrOptions : dateStringOrOptions.dateString

    const includeSeconds =
      typeof dateStringOrOptions === 'object' ? dateStringOrOptions.includeSeconds ?? false : false

    const capitalize =
      typeof dateStringOrOptions === 'object' ? dateStringOrOptions.capitalize ?? false : false

    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()

    // Calculate different time intervals
    const diffInSeconds = Math.floor(diffInMs / 1000)
    const diffInMinutes = Math.floor(diffInMs / TIME_INTERVALS.minute)
    const diffInHours = Math.floor(diffInMs / TIME_INTERVALS.hour)
    const diffInDays = Math.floor(diffInMs / TIME_INTERVALS.day)
    const diffInWeeks = Math.floor(diffInMs / TIME_INTERVALS.week)
    const diffInMonths = Math.floor(diffInMs / TIME_INTERVALS.month)
    const diffInYears = Math.floor(diffInMs / TIME_INTERVALS.year)

    // Status flags
    const isToday = date.toDateString() === now.toDateString()
    const isThisYear = date.getFullYear() === now.getFullYear()
    const isRecent = diffInDays < 1

    // Format relative time
    const formatRelativeTime = (): string => {
      if (includeSeconds && diffInSeconds < 60) {
        if (diffInSeconds < 5) {
          return 'just now'
        }
        if (diffInSeconds < 10) {
          return 'a few seconds ago'
        }

        return `${diffInSeconds} seconds ago`
      }

      if (diffInMinutes < 1) {
        return 'just now'
      }
      if (diffInMinutes === 1) {
        return 'a minute ago'
      }
      if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`
      }
      if (diffInHours === 1) {
        return 'an hour ago'
      }
      if (diffInHours < 24) {
        return `${diffInHours} hours ago`
      }
      if (diffInDays === 1) {
        return 'yesterday'
      }
      if (diffInDays < 7) {
        return `${diffInDays} days ago`
      }
      if (diffInWeeks === 1) {
        return 'a week ago'
      }
      if (diffInWeeks < 4) {
        return `${diffInWeeks} weeks ago`
      }
      if (diffInMonths === 1) {
        return 'a month ago'
      }
      if (diffInMonths < 12) {
        return `${diffInMonths} months ago`
      }
      if (diffInYears === 1) {
        return 'a year ago'
      }

      return `${diffInYears} years ago`
    }

    // Format human-readable date
    const formatReadableDate = (): string => {
      const day = date.getDate()
      const month = MONTH_NAMES[date.getMonth()]
      const year = date.getFullYear()

      if (isThisYear) {
        return `${month} ${day}`
      }

      return `${month} ${day}, ${year}`
    }

    // Determine which format to use
    let formatted: string

    if (diffInMs < TIME_INTERVALS.day) {
      formatted = formatRelativeTime()
    } else {
      formatted = formatReadableDate()
    }

    // Capitalize if requested
    if (capitalize) {
      formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1)
    }

    // Return based on overload
    if (typeof dateStringOrOptions === 'string') {
      return formatted
    } else {
      return {
        formatted,
        isRecent,
        isToday,
        isThisYear,
      }
    }
  }, [dateStringOrOptions])
}
