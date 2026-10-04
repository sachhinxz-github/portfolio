import { useCallback } from 'react'
import { useToast } from '../context/ui'

/** Copy text to the clipboard and confirm with a toast. */
export function useCopy(): (text: string, message: string) => void {
  const notify = useToast()
  return useCallback(
    (text: string, message: string) => {
      navigator.clipboard
        .writeText(text)
        .then(() => notify(message))
        .catch(() => notify(`Copy failed — ${text}`))
    },
    [notify],
  )
}
