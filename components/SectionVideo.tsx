'use client'
import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'

interface SectionVideoProps {
  src: string
  className?: string
  ariaLabel?: string
}

export default function SectionVideo({ src, className = '', ariaLabel = 'Video' }: SectionVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  // Play automatically once the section scrolls into view (and pause when it leaves)
  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // Keep progress bar + play/pause state in sync with the video element
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onTimeUpdate = () => {
      if (video.duration) setProgress((video.currentTime / video.duration) * 100)
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => setPlaying(false)

    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onEnded)
    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onEnded)
    }
  }, [])

  // Pressing the play button always restarts the video from the beginning
  const handlePlayClick = () => {
    const video = videoRef.current
    if (!video) return
    video.currentTime = 0
    video.play().catch(() => {})
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
    video.currentTime = ratio * video.duration
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden group ${className}`}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Custom play / restart button */}
      <button
        onClick={handlePlayClick}
        aria-label={`${ariaLabel} neu starten`}
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
      >
        <span
          className={`flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 shadow-lg transition-all duration-200 group-hover:scale-105 ${
            playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
        >
          <Play size={26} fill="#00B893" color="#00B893" className="ml-1" />
        </span>
      </button>

      {/* Timeline / progress bar */}
      <div
        onClick={handleSeek}
        className="absolute bottom-0 left-0 right-0 h-2 bg-white/30 cursor-pointer"
      >
        <div
          className="h-full transition-[width] duration-100"
          style={{ width: `${progress}%`, backgroundColor: '#00B893' }}
        />
      </div>
    </div>
  )
}
