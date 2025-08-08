import { ComponentProps, ReactNode, useState } from 'react'

import { useGetId } from '@/shared/hooks/useGetId'
import EyeClosedIcon from '@/shared/icons/EyeClosedIcon'
import EyeIcon from '@/shared/icons/EyeIcon'
import { clsx } from 'clsx'

import s from './TextField.module.scss'

export type TextFieldProps = {
  errorMessage?: string
  label?: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  variant?: 'default' | 'active' | 'error' | 'hover' | 'focus' | 'disabled'
  type?: 'text' | 'password' | 'search'
} & ComponentProps<'input'>

export const TextField = ({
  className,
  errorMessage,
  id,
  leftIcon,
  rightIcon,
  type = 'text',
  label,
  variant = 'default',
  disabled,
  ...props
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const showError = Boolean(errorMessage)
  const inputId = useGetId(id)
  const isDisabled = disabled || variant === 'disabled'

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const getInputType = () => {
    if (type !== 'password') {
      return type
    }

    return showPassword ? 'text' : 'password'
  }

  const getRightIcon = () => {
    if (type !== 'password') {
      return rightIcon
    }

    return showPassword ? <EyeIcon /> : <EyeClosedIcon />
  }

  return (
    <div className={clsx(s.box, className)}>
      {label && (
        <label className={clsx(s.label, isDisabled && s.disabled)} htmlFor={inputId}>
          {label && <span className={s.labelText}>{label}</span>}
        </label>
      )}

      <div className={s.inputWrapper}>
        {leftIcon && <span className={s.leftIcon}>{leftIcon}</span>}
        <input
          className={clsx(
            s.input,
            s[variant],
            showError && s.error,
            leftIcon && s.withLeftIcon,
            (rightIcon || type === 'password') && s.withRightIcon,
            isDisabled && s.disabled
          )}
          id={inputId}
          type={getInputType()}
          disabled={isDisabled}
          {...props}
        />
        {(rightIcon || type === 'password') && (
          <button
            type={'button'}
            className={s.rightIcon}
            onClick={type === 'password' ? togglePasswordVisibility : undefined}
            disabled={isDisabled}
          >
            {getRightIcon()}
          </button>
        )}
      </div>

      {showError && <span className={s.errorMessage}>{errorMessage}</span>}
    </div>
  )
}
