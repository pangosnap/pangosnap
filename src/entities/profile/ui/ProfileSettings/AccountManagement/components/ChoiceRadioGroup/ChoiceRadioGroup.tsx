import type { AccountManagementRadioGroup } from '@/entities/profile/ui/ProfileSettings/AccountManagement/types'

import React from 'react'

import s from './ChoiceRadioGroup.module.scss'

export type ChoiceRadioGroupProps = {
  mappingValues: AccountManagementRadioGroup[]
  title: string
  type: string
}

export const ChoiceRadioGroup: React.FC<ChoiceRadioGroupProps> = ({
  title,
  type,
  mappingValues,
}) => {
  return (
    <div className={s.panel}>
      <h3 className={s.panelTitle}>{title}</h3>
      <div className={s.panelContainer}>
        <div className={s.radioGroup}>
          {mappingValues.map(value => (
            <label key={value.value} className={s.radioLabel}>
              <input
                type={'radio'}
                name={type}
                value={value.value}
                checked={value.checked}
                onChange={value.onChange}
                className={s.radioInput}
              />
              <span className={s.radioCustom}></span>
              {value.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
