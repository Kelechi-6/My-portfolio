"use client"
import { useState, useEffect } from "react"
import styles from "./BackgroundMarquee.module.css"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

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
    observer.disconnect()
    window.removeEventListener("scroll", handleScroll)
  }
}, [])


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Add scrolled header effect
  function handleScroll() {
    const headerEl = document.querySelector(".header")
    if (!headerEl) return
    if (window.scrollY > 10) headerEl.classList.add("scrolled")
    else headerEl.classList.remove("scrolled")
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Simulated loading progress for the loader overlay
  useEffect(() => {
    if (!loading) return
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.floor(Math.random() * 8) + 3)
        if (next >= 100) {
          clearInterval(interval)
          // Delay a bit to show 100%
          setTimeout(() => setLoading(false), 350)
        }
        return next
      })
    }, 200)
    return () => clearInterval(interval)
  }, [loading])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    alert("Thank you for your message! I'll get back to you soon.")
  }

  return (
    <>
      {loading && (
        <div className="loader-overlay" role="status" aria-live="polite">
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
      )}

      {/* Subtle animated background watermark scoped to hero */}

      <div className="portfolio-container">
      <header className="header">
        <div className="logo">
          Kelechi <span>Timothy</span>
        </div>

        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          type="button"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav id="primary-navigation" className={`nav ${isMenuOpen ? "active" : ""}`}>
          <div className="nav-links">
            <a href="#home" onClick={closeMenu} className={activeSection === "home" ? "active" : ""}>
              Home
            </a>
            <a href="#about" onClick={closeMenu} className={activeSection === "about" ? "active" : ""}>
              About
            </a>
            <a href="#projects" onClick={closeMenu} className={activeSection === "projects" ? "active" : ""}>
              Projects
            </a>
            <a href="#services" onClick={closeMenu} className={activeSection === "services" ? "active" : ""}>
              Services
            </a>
            <a href="#skills" onClick={closeMenu} className={activeSection === "skills" ? "active" : ""}>
              Skills
            </a>
            <a href="#contact" onClick={closeMenu} className={activeSection === "contact" ? "active" : ""}>
              Contact
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          {/* Ticker-like background watermark within hero */}
          <div className={styles.bgMarquee} aria-hidden="true">
            <div className={styles.track}>
              <span>KELECHI</span>
              <span>KELECHI</span>
              <span>KELECHI</span>
              <span>KELECHI</span>
              <span>KELECHI</span>
              <span>KELECHI</span>
              <span>KELECHI</span>
              <span>KELECHI</span>
              <span>KELECHI</span>
              <span>KELECHI</span>
              <span>KELECHI</span>
              <span>KELECHI</span>
            </div>
          </div>
          <div className="hero-content">
            <h1>
              Hey I&apos;m <span>Kelechi Timothy</span>
            </h1>
            <h3 className="text-animation">
                  I&apos;m a <span id="text"></span><span className="caret"></span>
            </h3>

            <p>
              I&apos;m a passionate programmer with a deep respect for the foundations of software development and a
              drive to build thoughtful, reliable solutions. I take pride in writing clean, maintainable code and
              crafting digital experiences that are both practical and intuitive.
            </p>

            <div className="social-icons">
              <a href="#" aria-label="LinkedIn">
                <i className="bx bxl-linkedin"></i>
              </a>
              <a href="https://github.com/Kelechi-6" target="_blank" aria-label="GitHub" rel="noreferrer">
                <i className="bx bxl-github"></i>
              </a>
              <a
                href="https://wa.me/2349033282350?text=Good%20day..."
                target="_blank"
                aria-label="WhatsApp"
                rel="noreferrer"
              >
                <i className="bx bxl-whatsapp"></i>
              </a>
              <a href="https://www.instagram.com/kelechi.dev" target="_blank" aria-label="Instagram" rel="noreferrer">
                <i className="bx bxl-instagram"></i>
              </a>
            </div>

            <div className="btn-group">
              <a href="mailto:kcboytimo@gmail.com" className="btn primary">
                Hire Me
              </a>
              <a href="#contact" className="btn secondary">
                Contact
              </a>
            </div>
          </div>

          <div className="hero-img">
            <img src="/K.jpeg" alt="Kelechi Timothy" />
          </div>
        </section>

        <section className="about" id="about">
          <div className="container">
            <h2 className="section-title">
              About <span>Me</span>
            </h2>
            <div className="about-content">
              <div className="about-text">
                <h3>Full Stack Developer & Problem Solver</h3>
                <p>
                  With over 3 years of experience in web development, I specialize in creating robust, scalable
                  applications using modern technologies. My journey began with a curiosity about how things work, which
                  led me to pursue programming as both a career and a passion.
                </p>
                <p>
                  I believe in writing clean, maintainable code and following best practices. Whether it&apos;s building
                  a responsive frontend or architecting a complex backend system, I approach each project with attention
                  to detail and a commitment to quality.
                </p>
                <div className="stats">
                  <div className="stat">
                    <h4>50+</h4>
                    <p>Projects Completed</p>
                  </div>
                  <div className="stat">
                    <h4>3+</h4>
                    <p>Years Experience</p>
                  </div>
                  <div className="stat">
                    <h4>100%</h4>
                    <p>Client Satisfaction</p>
                  </div>
                </div>
              </div>
              <div className="about-img">
                <img src="/K.jpeg" alt="About Kelechi" />
              </div>
            </div>
          </div>
        </section>

        <section className="projects" id="projects">
          <div className="container">
            <h2 className="section-title">
              Featured <span>Projects</span>
            </h2>
            <div className="projects-grid">
              <div className="project-card">
                <div className="project-image">
                  <img src="/project-1.png" alt="Furniture Website" />
                  <div className="project-overlay">
                    <div className="project-info">
                      <h3>Furniture E-commerce</h3>
                      <p>Modern furniture website with shopping cart and payment integration</p>
                      <div className="project-tech">
                        <span>React</span>
                        <span>Node.js</span>
                        <span>MongoDB</span>
                      </div>
                      <div className="project-links">
                        <a
                          href="https://responsive-furniture-website1.vercel.app/"
                          target="_blank"
                          className="btn-link"
                          rel="noreferrer"
                        >
                          <i className="bx bx-link-external"></i> Live Demo
                        </a>
                        <a href="#" className="btn-link">
                          <i className="bx bxl-github"></i> Code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="project-card">
                <div className="project-image">
                  <img src="/project-2.png" alt="E-commerce Website" />
                  <div className="project-overlay">
                    <div className="project-info">
                      <h3>Multi-vendor Marketplace</h3>
                      <p>Full-featured e-commerce platform with vendor management</p>
                      <div className="project-tech">
                        <span>Next.js</span>
                        <span>Express</span>
                        <span>PostgreSQL</span>
                      </div>
                      <div className="project-links">
                        <a
                          href="https://multi-vendor-marketplace-sand.vercel.app/"
                          target="_blank"
                          className="btn-link"
                          rel="noreferrer"
                        >
                          <i className="bx bx-link-external"></i> Live Demo
                        </a>
                        <a href="#" className="btn-link">
                          <i className="bx bxl-github"></i> Code
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="services" id="services">
          <div className="container">
            <h2 className="section-title">My <span>Services</span></h2>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon" aria-hidden="true">
                  <span className="service-icon-text">&lt;/&gt;</span>
                </div>
                <h3 className="service-title">Web Development</h3>
                <p className="service-desc">High-performance, responsive websites and web apps with clean, scalable code tailored to your business goals.</p>
                <a href="#projects" className="service-btn" aria-label="Read more about Web Development">Read More</a>
              </div>

              <div className="service-card">
                <div className="service-icon" aria-hidden="true">
                  <i className="bx bx-palette"></i>
                </div>
                <h3 className="service-title">UI/UX Designing</h3>
                <p className="service-desc">Human-centered interfaces with thoughtful interactions and polished visuals that elevate user experience.</p>
                <a href="#projects" className="service-btn" aria-label="Read more about UI/UX Designing">Read More</a>
              </div>

              {/* <div className="service-card">
                <div className="service-icon" aria-hidden="true">
                  <i className="bx bx-mobile-alt"></i>
                </div>
                <h3 className="service-title">App Development</h3>
                <p className="service-desc">Cross-platform applications with smooth performance, modern stacks, and a consistent design system.</p>
                <a href="#projects" className="service-btn" aria-label="Read more about App Development">Read More</a>
              </div> */}
            </div>
          </div>
        </section>

        <section className="skills" id="skills">
          <div className="container">
            <h2 className="section-title">
              My <span>Skills</span>
            </h2>
            <div className="skills-content">
              <div className="skills-category">
                <h3>Frontend</h3>
                <div className="skills-list">
                  <div className="skill-item">
                    <span>HTML/CSS</span>
                    <div className="skill-bar">
                      <div className="skill-progress" data-width="95"></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span>JavaScript</span>
                    <div className="skill-bar">
                      <div className="skill-progress" data-width="90"></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span>React</span>
                    <div className="skill-bar">
                      <div className="skill-progress" data-width="85"></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span>Next.js</span>
                    <div className="skill-bar">
                      <div className="skill-progress" data-width="80"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="skills-category">
                <h3>Backend</h3>
                <div className="skills-list">
                  <div className="skill-item">
                    <span>Node.js</span>
                    <div className="skill-bar">
                      <div className="skill-progress" data-width="85"></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span>Express.js</span>
                    <div className="skill-bar">
                      <div className="skill-progress" data-width="80"></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span>PostgreSQL</span>
                    <div className="skill-bar">
                      <div className="skill-progress" data-width="70"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="skills-category">
                <h3>Tools & Others</h3>
                <div className="skills-list">
                  <div className="skill-item">
                    <span>Git/GitHub</span>
                    <div className="skill-bar">
                      <div className="skill-progress" data-width="90"></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span>UI/UX Design</span>
                    <div className="skill-bar">
                      <div className="skill-progress" data-width="75"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container">
            <h2 className="section-title">
              Get In <span>Touch</span>
            </h2>
            <div className="contact-content">
              <div className="contact-info">
                <div className="info-card">
                  <div className="info-icon">
                    <i className="bx bx-map"></i>
                  </div>
                  <div className="info-details">
                    <h3>Address</h3>
                    <p>
                      123 Agudama, Human Right Street
                      <br />
                      Bayelsa, Nigeria 100001
                    </p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <i className="bx bx-phone"></i>
                  </div>
                  <div className="info-details">
                    <h3>Phone</h3>
                    <p>+234 903 328 2350</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <i className="bx bx-envelope"></i>
                  </div>
                  <div className="info-details">
                    <h3>Email</h3>
                    <p>kcboytimo@gmail.com</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="info-icon">
                    <i className="bx bx-time"></i>
                  </div>
                  <div className="info-details">
                    <h3>Business Hours</h3>
                    <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input type="text" name="name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" name="email" placeholder="Your Email" required />
                </div>
                <div className="form-group">
                  <input type="text" name="subject" placeholder="Subject" required />
                </div>
                <div className="form-group">
                  <textarea name="message" placeholder="Your Message" rows="6" required></textarea>
                </div>
                <button type="submit" className="btn primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="social-links">
              <a href="#" aria-label="LinkedIn">
                <i className="bx bxl-linkedin"></i>
              </a>
              <a href="https://github.com/Kelechi-6" target="_blank" aria-label="GitHub" rel="noreferrer">
                <i className="bx bxl-github"></i>
              </a>
              <a href="https://wa.me/2349033282350" target="_blank" aria-label="WhatsApp" rel="noreferrer">
                <i className="bx bxl-whatsapp"></i>
              </a>
              <a href="https://www.instagram.com/kelechi.dev" target="_blank" aria-label="Instagram" rel="noreferrer">
                <i className="bx bxl-instagram"></i>
              </a>
            </div>
            <nav className="footer-nav">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#contact">Contact</a>
            </nav>
            <p className="copyright">© 2024 Kelechi Timothy. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  )
}
