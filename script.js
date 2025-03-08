document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinks = document.querySelector(".nav-links")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      this.classList.toggle("active")
      navLinks.classList.toggle("active")

      if (this.classList.contains("active")) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
    })
  }

  // Add active class to mobile menu button
  if (mobileMenuBtn) {
    const spans = mobileMenuBtn.querySelectorAll("span")

    mobileMenuBtn.addEventListener("click", () => {
      spans.forEach((span) => {
        span.classList.toggle("active")
      })
    })
  }

  // Add styles for active mobile menu
  const style = document.createElement("style")
  style.textContent = `
    @media (max-width: 768px) {
      .nav-links.active {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 80px;
        left: 0;
        width: 100%;
        height: calc(100vh - 80px);
        background-color: white;
        padding: 2rem;
        z-index: 1000;
        overflow-y: auto;
      }
      
      .mobile-menu-btn span.active:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }
      
      .mobile-menu-btn span.active:nth-child(2) {
        opacity: 0;
      }
      
      .mobile-menu-btn span.active:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    }
  `
  document.head.appendChild(style)

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-testimonial")
  const nextBtn = document.querySelector(".next-testimonial")

  if (testimonialSlides.length > 0) {
    let currentSlide = 0

    function showSlide(index) {
      testimonialSlides.forEach((slide) => slide.classList.remove("active"))
      dots.forEach((dot) => dot.classList.remove("active"))

      testimonialSlides[index].classList.add("active")
      dots[index].classList.add("active")
      currentSlide = index
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        let index = currentSlide - 1
        if (index < 0) index = testimonialSlides.length - 1
        showSlide(index)
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        let index = currentSlide + 1
        if (index >= testimonialSlides.length) index = 0
        showSlide(index)
      })
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        showSlide(index)
      })
    })

    // Auto slide
    setInterval(() => {
      let index = currentSlide + 1
      if (index >= testimonialSlides.length) index = 0
      showSlide(index)
    }, 5000)
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      item.classList.toggle("active")

      // Close other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active")
        }
      })
    })
  })

  // Form Submission
  const contactForm = document.getElementById("contact-form")
  const newsletterForm = document.getElementById("newsletter-form")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]')
      submitBtn.disabled = true
      submitBtn.textContent = "Envoi en cours..."

      setTimeout(() => {
        contactForm.innerHTML = `
          <div class="success-message">
            <i class="fas fa-check-circle" style="color: var(--success-color); font-size: 3rem; margin-bottom: 1rem;"></i>
            <h3>Message envoyé avec succès!</h3>
            <p>Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        `
      }, 1500)
    })
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]')
      submitBtn.disabled = true
      submitBtn.textContent = "Inscription..."

      setTimeout(() => {
        newsletterForm.innerHTML = `
          <div class="success-message">
            <i class="fas fa-check-circle" style="color: var(--success-color); font-size: 3rem; margin-bottom: 1rem;"></i>
            <h3>Inscription réussie!</h3>
            <p>Merci de vous être inscrit à notre newsletter.</p>
          </div>
        `
      }, 1500)
    })
  }

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href !== "#") {
        e.preventDefault()

        const targetElement = document.querySelector(href)

        if (targetElement) {
          const headerHeight = document.querySelector("header").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })

          // Close mobile menu if open
          if (mobileMenuBtn && mobileMenuBtn.classList.contains("active")) {
            mobileMenuBtn.click()
          }
        }
      }
    })
  })

  // Animate elements on scroll
  const animateElements = document.querySelectorAll(
    ".service-card, .blog-card, .value-card, .step, .testimonial-content, .gallery-item",
  )

  function checkScroll() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementTop < windowHeight * 0.8) {
        element.classList.add("animate")
      }
    })
  }

  // Add animation styles
  const animationStyle = document.createElement("style")
  animationStyle.textContent = `
    .service-card, .blog-card, .value-card, .step, .testimonial-content, .gallery-item {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .service-card.animate, .blog-card.animate, .value-card.animate, .step.animate, .testimonial-content.animate, .gallery-item.animate {
      opacity: 1;
      transform: translateY(0);
    }
  `
  document.head.appendChild(animationStyle)

  window.addEventListener("scroll", checkScroll)
  window.addEventListener("load", checkScroll)
})

