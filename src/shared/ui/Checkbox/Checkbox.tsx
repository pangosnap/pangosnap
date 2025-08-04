import { CheckBoxSelected } from '@/shared/icons/CheckBoxSelected'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './Checkbox.module.scss'

type Props = {
  className?: string
  label?: string
  disabled?: boolean
  onChange: (checked: boolean) => void
}

export const Checkbox = (props: Props) => {
  const { className, label, disabled, onChange } = props

  return (
    <div className={clsx(s.container, disabled && s.disabled, className)}>
      <LabelRadix.Root className={clsx(s.label, disabled && s.disabled)}>
        <div className={s.wrapper}>
          <CheckboxRadix.Root
            className={s.root}
            defaultChecked
            disabled={disabled}
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
