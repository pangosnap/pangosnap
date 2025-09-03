'use client'

import { useCallback, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'

import { cropImageToBlob } from '../lib/cropImage'
import { BaseSelect } from '@/shared/ui/BaseSelect/BaseSelect'
import { Button } from '@/shared/ui/Button/Button'

import s from './CropperStep.module.scss'

type Props = {
  src: string
  onCancel: () => void
  onApply: (file: File, previewUrl: string) => void
}

export const CropperStep = ({ src, onCancel, onApply }: Props) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [aspect, setAspect] = useState(1)
  const onCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels)
  }, [])

  const applyHandler = useCallback(async () => {
    if (!croppedAreaPixels) {
      return
    }
    const blob = await cropImageToBlob(src, croppedAreaPixels, 'image/jpeg', 0.92)
    const file = new File([blob], 'cropped.jpg', { type: 'image/jpeg' })
    const url = URL.createObjectURL(blob)

    onApply(file, url)
  }, [croppedAreaPixels, onApply, src])

  const aspectMap: Record<string, number> = {
    '1:1': 1,
    '4:5': 4 / 5,
    '16:9': 16 / 9,
  }

  return (
    <div className={s.Root}>
      <div className={s.CropArea}>
        <Cropper
          image={src}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          restrictPosition
          showGrid={false}
        />
      </div>

      <div className={s.Toolbar}>
        <input
          className={s.Zoom}
          type={'range'}
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={e => setZoom(Number(e.target.value))}
          aria-label={'Zoom'}
        />
        <BaseSelect
          items={['1:1', '4:5', '16:9']}
          defaultValue={'1:1'}
          onValueChange={value => setAspect(aspectMap[value])}
        />

        <div className={s.Actions}>
          <Button variant={'text'} onClick={onCancel}>
            Back
          </Button>
          <Button variant={'primary'} onClick={applyHandler}>
            Apply crop
          </Button>
        </div>
      </div>
    </div>
  )
}
