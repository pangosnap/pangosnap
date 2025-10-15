import * as React from 'react'
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react'

import ArrowDown from '@/shared/icons/arrow-down.svg'
import ArrowUp from '@/shared/icons/arrow-up.svg'
import { clsx } from 'clsx'
import { Select } from 'radix-ui'

import s from './BaseSelect.module.scss'

type BaseSelectProps = {
  items: string[]
  disabled?: boolean
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
}

export const BaseSelect = ({
  items,
  disabled,
  value,
  defaultValue,
  onValueChange,
  className,
}: BaseSelectProps) => {
  return (
    <Select.Root
      disabled={disabled}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      <Select.Trigger className={clsx(s.Trigger, className)}>
        <Select.Value placeholder={defaultValue} />
        <Select.Icon className={s.Icon}>
          <ArrowDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={s.Content} position={'popper'} sideOffset={4}>
          <Select.ScrollUpButton className={s.ScrollButton}>
            <ArrowUp />
          </Select.ScrollUpButton>

          <Select.Viewport className={s.Viewport}>
            <Select.Group>
              {items.map(item => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton className={s.ScrollButton}>
            <ArrowDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

type SelectItemProps = ComponentPropsWithoutRef<typeof Select.Item> & {
  children: React.ReactNode
}

const SelectItem = forwardRef<ComponentRef<typeof Select.Item>, SelectItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Select.Item ref={ref} className={clsx(s.Item, className)} {...props}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className={s.ItemIndicator} />
      </Select.Item>
    )
  }
)
