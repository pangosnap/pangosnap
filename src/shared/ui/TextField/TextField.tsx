import { ComponentProps, ReactNode, useState } from 'react'

import { useGetId } from '@/shared/hooks/useGetId'
import EyeClosedIcon from '@/shared/icons/EyeClosedIcon'
import EyeIcon from '@/shared/icons/EyeIcon'
import { clsx } from 'clsx'

import s from './TextField.module.scss'

type Option = { label: string; value: string }

export type TextFieldProps = {
  errorMessage?: string
  label?: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  variant?: 'default' | 'active' | 'error' | 'hover' | 'focus' | 'disabled'
  type?: 'text' | 'password' | 'search' | 'date' | 'select' // ⬅️ добавили 'select'
  options?: Option[] // ⬅️ список опций
  required?: boolean
} & ComponentProps<'input'> // оставляем просто, без мудрёных типов

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
  options,
  ...props
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const showError = Boolean(errorMessage)
  const inputId = useGetId(id)
  const isDisabled = disabled || variant === 'disabled'
  const isSelect = type === 'select'

  const togglePasswordVisibility = () => setShowPassword(v => !v)

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
          <span className={s.labelText}>
            {label}
            {props.required && <span className={s.required}>*</span>}
          </span>
        </label>
      )}

      <div className={s.inputWrapper}>
        {leftIcon && <span className={s.leftIcon}>{leftIcon}</span>}

        {isSelect ? (
          <select
            id={inputId}
            className={clsx(
              s.input,
              s[variant],
              showError && s.error,
              leftIcon && s.withLeftIcon,
              rightIcon && s.withRightIcon,
              isDisabled && s.disabled
            )}
            disabled={isDisabled}
            // spread пропсов от RHF — ок для select
            {...(props as any)}
          >
            {/* placeholder как disabled option, если передан */}
            {props.placeholder && (
              <option value={''} disabled hidden>
                {props.placeholder as string}
              </option>
            )}
            {options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={inputId}
            className={clsx(
              s.input,
              s[variant],
              showError && s.error,
              leftIcon && s.withLeftIcon,
              (rightIcon || type === 'password') && s.withRightIcon,
              isDisabled && s.disabled
            )}
            type={getInputType()}
            disabled={isDisabled}
            {...props}
          />
        )}

        {(rightIcon || type === 'password') && !isSelect && (
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
