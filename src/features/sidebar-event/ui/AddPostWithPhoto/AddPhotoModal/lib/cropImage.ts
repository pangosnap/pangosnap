import type { Area } from 'react-easy-crop'

export async function cropImageToBlob(
  src: string,
  pixelCrop: Area,
  mime: string = 'image/jpeg',
  quality = 0.92
): Promise<Blob> {
  const image = await loadImage(src)
  const canvas = document.createElement('canvas')
  const canvasRenderingContext = canvas.getContext('2d')

  // Размер выходного изображения = размер области кропа
  canvas.width = Math.round(pixelCrop.width)
  canvas.height = Math.round(pixelCrop.height)

  // Рисуем нужный кусок изображения на (0,0)
  canvasRenderingContext?.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return await new Promise((resolve, reject) => {
    canvas.toBlob(b => (b ? resolve(b) : reject(new Error('toBlob failed'))), mime, quality)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()

    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}
