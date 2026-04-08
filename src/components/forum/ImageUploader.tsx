'use client'
import { useState } from 'react'
import { uploadForumImage } from '@/lib/image-upload'

type Props = {
  urls: string[]
  onChange: (urls: string[]) => void
  maxImages?: number
}

export default function ImageUploader({ urls, onChange, maxImages = 3 }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setError('')
    setUploading(true)

    const remaining = maxImages - urls.length
    const filesToUpload = Array.from(files).slice(0, remaining)
    const newUrls: string[] = []

    for (const file of filesToUpload) {
      const result = await uploadForumImage(file)
      if ('error' in result) {
        setError(result.error)
        break
      }
      newUrls.push(result.url)
    }

    if (newUrls.length > 0) {
      onChange([...urls, ...newUrls])
    }
    setUploading(false)
  }

  const removeImage = (idx: number) => {
    onChange(urls.filter((_, i) => i !== idx))
  }

  return (
    <div>
      {urls.length > 0 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {urls.map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <div key={url} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
              <img src={url} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-0.5 right-0.5 w-5 h-5 bg-black/60 text-white rounded-full text-xs flex items-center justify-center hover:bg-black/80"
                aria-label="Remove image"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {urls.length < maxImages && (
        <label className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-purple-300 bg-purple-50 text-purple-700 text-sm font-semibold cursor-pointer hover:bg-purple-100 transition ${uploading ? 'opacity-50 cursor-wait' : ''}`}>
          <span>📷</span>
          <span>{uploading ? 'Uploading...' : `Add image (${urls.length}/${maxImages})`}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            disabled={uploading}
            className="hidden"
            onChange={e => { handleFiles(e.target.files); e.target.value = '' }}
          />
        </label>
      )}

      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  )
}
