export const MAX_AVATAR_FILE_SIZE_BYTES = 2 * 1024 * 1024

export const isValidAvatarFile = (file: File): boolean =>
  file.type.startsWith('image/') && file.size <= MAX_AVATAR_FILE_SIZE_BYTES

export const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
        return
      }
      reject(new Error('Failed to read image file'))
    }
    reader.onerror = () => reject(reader.error ?? new Error('Failed to read image file'))
    reader.readAsDataURL(file)
  })
