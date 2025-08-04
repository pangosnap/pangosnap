import { type ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { DeleteIcon } from '@/shared/icons/DeleteIcon'
import Eye from '@/shared/icons/Eye'
import EyeClosed from '@/shared/icons/Eye-closed'
import { SearchImg } from '@/shared/icons/Search'
import { clsx } from 'clsx'

import s from './TextField.module.scss'

export type TextFieldProps = {
  errorMessage?: string
  fullWidth?: boolean
  label?: string
  name?: string
  onClearClick?: () => void
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      disabled,
      errorMessage,
      fullWidth,
      label,
      onClearClick,
      type = 'text',
      value,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const finalType = getFinalType(type, showPassword)

    const inputWrapperCN = clsx(
      s.inputWrapper,
      {
        [s.error]: !!errorMessage,
        [s.disabled]: disabled,
        [s.fullWidth]: fullWidth,
      },
      className
    )

    const inputCN = clsx(s.textField, {
      [s.disabled]: disabled,
      [s.hasIcon]: type === 'search',
    })

    const labelCN = clsx('uik_typography-body2', {
      'uik_typography-caption': disabled,
    })

    const searchImgCN = clsx(s.searchImg, {
      [s.disabled]: disabled,
    })

    const eyeBtnCN = clsx(s.eyeBtn, {
      [s.disabled]: disabled,
    })

    return (
      <div className={s.container}>
        {label && <label className={labelCN}>{label}</label>}

        <div className={inputWrapperCN}>
          {type === 'search' && <SearchImg className={searchImgCN} />}

          <input
            className={inputCN}
            disabled={disabled}
            ref={ref}
            type={finalType}
            value={value}
            {...rest}
          />

          {type === 'search' && value && !disabled && (
            <button className={s.deleteBtn} onClick={onClearClick} type={'button'}>
              <DeleteIcon />
            </button>
          )}

          {type === 'password' && !disabled && (
            <button className={eyeBtnCN} onClick={() => setShowPassword(p => !p)} type={'button'}>
              {showPassword ? <EyeClosed /> : <Eye />}
            </button>
          )}
        </div>

        {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}
      </div>
    )
  }
)

const getFinalType = (type: ComponentPropsWithoutRef<'input'>['type'], showPassword: boolean) => {
  if (type === 'password') {
    return showPassword ? 'text' : 'password'
  }

  return type
}
