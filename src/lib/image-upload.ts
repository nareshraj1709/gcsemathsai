import { supabase } from './supabase'

const MAX_DIMENSION = 1280
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const COMPRESSION_QUALITY = 0.85
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export type UploadResult = { url: string } | { error: string }

/**
 * Compress an image file to JPEG with max 1280px dimension.
 * Reduces size significantly while keeping it readable for maths working.
 */
async function compressImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height)
        width = Math.round(width * ratio)
        height = Math.round(height * ratio)
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('Canvas not available'))
        return
      }
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Compression failed'))
        },
        'image/jpeg',
        COMPRESSION_QUALITY,
      )
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    }
    img.src = url
  })
}

/**
 * Upload an image to Supabase Storage forum-images bucket.
 * Files are stored under {user_id}/{timestamp}-{random}.jpg so the
 * RLS policy can enforce per-user delete permissions.
 */
export async function uploadForumImage(file: File): Promise<UploadResult> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: 'Only JPEG, PNG, and WebP images are allowed.' }
  }
  if (file.size > MAX_FILE_SIZE) {
    return { error: 'Image must be under 5 MB.' }
  }

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return { error: 'You must be logged in to upload images.' }

  let blob: Blob
  try {
    blob = await compressImage(file)
  } catch {
    blob = file
  }

  const timestamp = Date.now()
  const random = Math.random().toString(36).slice(2, 8)
  const path = `${session.user.id}/${timestamp}-${random}.jpg`

  const { error } = await supabase.storage
    .from('forum-images')
    .upload(path, blob, {
      contentType: 'image/jpeg',
      upsert: false,
    })

  if (error) {
    return { error: error.message }
  }

  const { data: urlData } = supabase.storage.from('forum-images').getPublicUrl(path)
  return { url: urlData.publicUrl }
}

/**
 * Upload multiple images and return successful URLs.
 * Reports first error if any fail.
 */
export async function uploadForumImages(files: File[]): Promise<{ urls: string[]; error?: string }> {
  const urls: string[] = []
  for (const file of files) {
    const result = await uploadForumImage(file)
    if ('error' in result) {
      return { urls, error: result.error }
    }
    urls.push(result.url)
  }
  return { urls }
}
