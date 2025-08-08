'use client'

import { ComponentPropsWithoutRef } from 'react'

import { CheckBoxSelected } from '@/shared/icons/CheckBoxSelected'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './Checkbox.module.scss'

type Props = {
  className?: string
  label?: string
  disabled?: boolean
  checked?: boolean
  onChange: (checked: boolean) => void
} & ComponentPropsWithoutRef<'input'>

export const Checkbox = ({ className, label, disabled, checked, onChange }: Props) => {
  return (
    <div className={clsx(s.container, disabled && s.disabled, className)}>
      <LabelRadix.Root className={clsx(s.label, disabled && s.disabled)}>
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
