'use client'

import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { Camera } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { MediaPicker } from './MidiaPicker'

export function NewMemoryForm() {
  const router = useRouter()

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const filesToUpload = formData.get('coverUrl')

    let coverUrl = ''

    if (filesToUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', filesToUpload)

      const uploadReponse = await api.post('/upload', uploadFormData)

      coverUrl = uploadReponse.data.fileUrl
    }

    const token = Cookie.get('token')

    // eslint-disable-next-line no-unused-expressions
    await api.post(
      '/memories',
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
        // eslint-disable-next-line no-sequences
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/')
  }

  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="rounder h-4 w-4 border-gray-400 bg-gray-700 text-purple-500"
          />
          Tornar memómoria publica
        </label>
      </div>

      <MediaPicker />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:right-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
      ></textarea>

      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salva
      </button>
    </form>
  )
}
