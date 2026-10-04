import { Expand } from 'lucide-react'
import { useLightbox } from '../../context/ui'
import type { GalleryImage } from '../../data/portfolio'
import { cn } from '../../lib/cn'

/** Thumbnail that opens the full gallery in the lightbox at this image. */
export function GalleryThumb({
  images,
  index,
  className,
}: {
  images: GalleryImage[]
  index: number
  className?: string
}) {
  const openLightbox = useLightbox()
  const image = images[index]

  return (
    <button
      type="button"
      onClick={() => openLightbox(images, index)}
      aria-label={`View image: ${image.caption}`}
      className={cn(
        'group/thumb relative block overflow-hidden rounded-xl border border-line bg-surface-2 transition-colors hover:border-accent/60',
        className,
      )}
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
        className="size-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity group-hover/thumb:opacity-100 group-focus-visible/thumb:opacity-100">
        <span className="flex size-10 items-center justify-center rounded-full bg-accent-solid text-on-accent">
          <Expand className="size-4" aria-hidden="true" />
        </span>
      </span>
    </button>
  )
}
