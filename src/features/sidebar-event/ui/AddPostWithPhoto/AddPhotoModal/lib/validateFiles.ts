export type ValidationResult = {
  valid: File[]
  errors: string[]
}

type Options = {
  maxFiles: number
  allowedMime: string[]
  maxBytes: number
}

export const validateFiles = (files: File[], opts: Options): ValidationResult => {
  const { maxFiles, allowedMime, maxBytes } = opts

  const sliced = files.slice(0, maxFiles)
  const valid: File[] = []
  const errors: string[] = []

  if (files.length > maxFiles) {
    errors.push(`Max ${maxFiles} photos.`)
  }

  for (const f of sliced) {
    if (!allowedMime.includes(f.type)) {
      errors.push(`${f.name}: only JPEG/PNG.`)
      continue
    }
    if (f.size > maxBytes) {
      errors.push(`${f.name}: max 20 MB.`)
      continue
    }
    valid.push(f)
  }

  return { valid, errors }
}
