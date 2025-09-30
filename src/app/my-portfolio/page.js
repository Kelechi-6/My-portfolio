"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function LoaderPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.floor(Math.random() * 8) + 3)
        if (next >= 100) {
          clearInterval(interval)
          // Play a short exit animation before redirect
          setExiting(true)
          setTimeout(() => router.replace("/"), 450)
        }
        return next
      })
    }, 200)

    return () => clearInterval(interval)
  }, [router])

  return (
    <div className={`loader-overlay${exiting ? " loader-exit" : ""}`} role="status" aria-live="polite">
      <div className="loader-card">
        <h1 className="loader-title">Portfolio<span className="loader-title-dot">.</span></h1>
        <div className="loader-bar-row">
          <span className="loader-label-left">Loading...</span>
          <span className="loader-label-right">{progress}%</span>
        </div>
        <div className="loader-bar" aria-label="Loading progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}>
          <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="loader-dots-row">
          <div className="loader-dots" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="loader-subtext">Preparing your experience...</p>
        </div>
      </div>
    </div>
  )
}
