'use client'

import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { CheckBoxSelected } from '@/shared/icons/CheckBoxSelected'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './Checkbox.module.scss'

type Props = {
  className?: string
  label?: ReactNode
  disabled?: boolean
  checked?: boolean
  labelSize?: 'normal' | 'small'
  onChange: (checked: boolean) => void
} & ComponentPropsWithoutRef<'input'>

export const Checkbox = ({
  className,
  label,
  disabled,
  checked,
  labelSize = 'normal',
  onChange,
}: Props) => {
  const classNames = {
    root: clsx(s.container, disabled && s.disabled, className),
    label: clsx(
      labelSize === 'normal' && 'uik_typography-body2',
      labelSize === 'small' && 'uik_typography-caption',
      s.label,
      disabled && s.disabled
    ),
  }

  return (
    <div className={classNames.root}>
      <LabelRadix.Root className={classNames.label}>
        <div className={s.wrapper}>
          <CheckboxRadix.Root
            className={s.root}
            disabled={disabled}
            checked={checked}
            onCheckedChange={onChange}
          >
            <CheckboxRadix.Indicator className={s.indicator}>
              <CheckBoxSelected />
            </CheckboxRadix.Indicator>
          </CheckboxRadix.Root>
        </div>
        {label}
      </LabelRadix.Root>
    </div>
  )
}
