"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import styles from "./BackgroundMarquee.module.css"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const router = useRouter()
  const [canRender, setCanRender] = useState(false)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  

  useEffect(() => {
  // About section observer
  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    },
    { threshold: 0.2 }
  )

  document.querySelectorAll(".about-text, .about-img").forEach((el) => {
    aboutObserver.observe(el)
  })

  // Typing animation effect
  const textElement = document.getElementById("text")
  if (textElement) {
    const words = ["Frontend Developer.", "Backend Developer.", "Full Stack Developer.", "Problem Solver."]
    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timeoutId

    function typeEffect() {
      const currentWord = words[wordIndex]

      if (isDeleting) {
        charIndex--
        textElement.innerText = currentWord.substring(0, charIndex)
      } else {
        charIndex++
        textElement.innerText = currentWord.substring(0, charIndex)
      }

      let typingSpeed = isDeleting ? 50 : 100

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        wordIndex = (wordIndex + 1) % words.length
        typingSpeed = 500
      }

      timeoutId = setTimeout(typeEffect, typingSpeed)
    }

    typeEffect()
  }

  // Scroll animation observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
        setActiveSection(entry.target.id)
      }
    })
  }, observerOptions)

  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section)
  })

  // Cleanup everything properly
  return () => {
    aboutObserver.disconnect()
    window.removeEventListener("scroll", handleScroll)
  }
}, [])


  const closeWithAnimation = () => {
    const navEl = document.getElementById('primary-navigation') || document.querySelector('.nav')
    if (navEl && navEl.classList.contains('active')) {
      // Add a closing class so CSS can animate slide-out while visible
      navEl.classList.add('closing')
      setIsMenuOpen(false)
      const onEnd = () => {
        navEl.classList.remove('closing')
      }
      // Use transitionend with a fallback timeout
      navEl.addEventListener('transitionend', onEnd, { once: true })
      setTimeout(onEnd, 600)
      return true
    }
    return false
  }

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeWithAnimation()
    } else {
      setIsMenuOpen(true)
    }
  }

  const closeMenu = () => {
    if (!closeWithAnimation()) {
      setIsMenuOpen(false)
    }
  }

  // Add scrolled header effect
  function handleScroll() {
    const headerEl = document.querySelector(".header")
    if (!headerEl) return
    if (window.scrollY > 10) headerEl.classList.add("scrolled")
    else headerEl.classList.remove("scrolled")

    // If sidebar/menu is open, close it on scroll (mobile/desktop)
    closeWithAnimation()

    // Toggle back-to-top visibility
    const backTop = document.querySelector('.back-to-top')
    if (backTop) {
      if (window.scrollY > 300) backTop.classList.add('show')
      else backTop.classList.remove('show')
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Root page acts purely as a loader now
  useEffect(() => {
    if (typeof window === 'undefined') return
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.floor(Math.random() * 8) + 3)
        if (next >= 100) {
          clearInterval(interval)
          setExiting(true)
          setTimeout(() => router.replace('/home'), 450)
        }
        return next
      })
    }, 200)
    return () => clearInterval(interval)
  }, [router])

  // Loader removed from homepage

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    alert("Thank you for your message! I'll get back to you soon.")
  }

  const scrollToTop = () => {
    if (typeof window === 'undefined') return
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
