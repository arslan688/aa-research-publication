// ******************Off Canvas Menu Logic******************
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector("#menu-btn");
  const navLinks = document.querySelector("#nav-links");

  // Toggle the active class on click instead of modifying inline display styles
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    // Optional: Switch icon to a clean close symbol (✕) while the menu is open
    if (navLinks.classList.contains("active")) {
      menuBtn.textContent = "✕";
    } else {
      menuBtn.textContent = "☰";
    }
  });
  // 1. Set up the observer options
  const observerOptions = {
    root: null, // Uses the browser viewport
    rootMargin: "0px",
    threshold: 0.15, // Triggers when 15% of the element is visible
  };

  // 2. Create the Intersection Observer
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // When the element enters the viewport
      if (entry.isIntersecting) {
        entry.target.classList.add("active"); // Triggers the CSS transition
        observer.unobserve(entry.target); // Stops observing so it only animates once
      }
    });
  }, observerOptions);

  // 3. Select all elements with our reveal classes
  const animatedElements = document.querySelectorAll(
    ".reveal-up, .reveal-scale",
  );

  // 4. Tell the observer to watch each of these elements
  animatedElements.forEach((el) => {
    scrollObserver.observe(el);
  });
});

/*
event.preventDefault(); alert('Form design complete. Connect this form to your email, CRM, WhatsApp, or form service before launch.');
*/
// ****************** Contact Form Logic ******************
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const submitBtn = document.querySelector("#form-btn");

  // Prevent errors if the elements aren't found on the page
  if (!form || !submitBtn) return;

  // 1. Listen for 'submit' on the FORM, not the button
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    formData.append("access_key", "6288fd35-dc18-449e-8e30-d84888774ed6");

    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Create the stylized success message element
        const successMessage = document.createElement("div");
        successMessage.className = "form-success-card";
        successMessage.innerHTML = `
          <h2>Thank You For Contacting Us</h2>
          <p>We will get back to you shortly.</p>
        `;

        // Hide the form and inject the message card in its place
        form.style.display = "none";
        form.parentElement.appendChild(successMessage);

        form.reset();
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      // Re-enable elements only if the form is still active
      if (form.style.display !== "none") {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }
  });
});

// ******************Testimonial Logic******************
const track = document.getElementById("carouselTrack");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const cards = document.querySelectorAll(".review-card");

let currentIndex = 0;

function getCardsPerView() {
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 991) return 2;
  return 3;
}

function updateCarousel() {
  const cardsPerView = getCardsPerView();
  const maxIndex = cards.length - cardsPerView;

  // Keep index within boundaries
  if (currentIndex > maxIndex) currentIndex = 0;
  if (currentIndex < 0) currentIndex = maxIndex;

  // Calculate slide distance including gap widths dynamically
  const cardWidth = cards[0].getBoundingClientRect().width;
  const gapWidth = 24;
  const moveDistance = currentIndex * (cardWidth + gapWidth);

  track.style.transform = `translateX(-${moveDistance}px)`;
}

// Arrow Button Listeners
nextBtn.addEventListener("click", () => {
  currentIndex++;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  currentIndex--;
  updateCarousel();
});

// Auto-Play Engine (Slides every 5 seconds)
let autoPlay = setInterval(() => {
  currentIndex++;
  updateCarousel();
}, 5000);

// Stop auto-play when user interacts with arrows
[nextBtn, prevBtn].forEach((btn) => {
  btn.addEventListener("mouseenter", () => clearInterval(autoPlay));
});

// Re-calculate math smoothly if user tilts or resizes window browser
window.addEventListener("resize", updateCarousel);

//  ******************FAQ Accordion Smooth Transition Logic***********************

const accordionHeaders = document.querySelectorAll(".accordion-header");
const accordionContents = document.querySelectorAll(".accordion-content");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement;
    const accordionContent = accordionItem.querySelector(".accordion-content");

    accordionContents.forEach((content) => {
      if (content !== accordionContent) {
        content.style.maxHeight = "0";
        content.classList.remove("active");
      }
    });
    // Toggle active state utility class
    accordionContent.classList.toggle("active");

    if (accordionContent.classList.contains("active")) {
      // scrollHeight + 4px handles extra buffer spacing safely
      accordionContent.style.maxHeight =
        accordionContent.scrollHeight + 4 + "px";
    } else {
      accordionContent.style.maxHeight = "0";
    }
  });
});

//*************WhatsApp Floating Button*****************
document.addEventListener("DOMContentLoaded", function () {
  // Configured Phone Number & Default Fallback Text
  const PHONE_NUMBER = "447457411062";
  const DEFAULT_MESSAGE = "Hy! I am interested in your services.";

  // Select UI Elements
  const waBtn = document.getElementById("waBtn");
  const waPopup = document.getElementById("waPopup");
  const waBadge = document.getElementById("waBadge");
  const waInput = document.getElementById("waInput");
  const waSendBtn = document.getElementById("waSendBtn");
  const waChatTime = document.getElementById("waChatTime");
  const waAvatar = document.querySelector(".wa-avatar");

  // Get SVG/Awesome UI internal button assets
  const iconMain = waBtn.querySelector(".wa-icon-main");
  const iconClose = waBtn.querySelector(".wa-icon-close");

  // Set initial dynamic message chat bubble timestamp
  const now = new Date();
  if (waChatTime) {
    waChatTime.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Toggle Popup Window visibility states on floating button click
  waBtn.addEventListener("click", function () {
    const isOpen = waPopup.classList.toggle("show");

    if (isOpen) {
      if (iconMain) iconMain.style.display = "none";
      if (iconClose) iconClose.style.display = "block";
      // Clear alert notification badge count
      if (waBadge) waBadge.style.opacity = "0";
    } else {
      if (iconMain) iconMain.style.display = "block";
      if (iconClose) iconClose.style.display = "none";
    }
  });

  // Trigger a 2-second (2000 milliseconds) delayed appearance
  setTimeout(function () {
    const waContainer = document.querySelector(".wa-widget-container");
    if (waContainer) {
      waContainer.classList.add("active");
    }
  }, 2000);

  // Master Redirection Link Building Engine
  function redirectToWhatsApp(useDefaultOnly = false) {
    let userMsg = waInput.value.trim();

    // Force default text if specified (like clicking the avatar icon) or if input is empty
    if (useDefaultOnly || userMsg === "") {
      userMsg = DEFAULT_MESSAGE;
    }

    // Convert raw spaces and strings into web-safe URL characters
    const encodedMessage = encodeURIComponent(userMsg);

    // Universal URL Structure (Ensures correct formatting protocol)
    const targetURL =
      "https://wa.me/" + PHONE_NUMBER + "?text=" + encodedMessage;

    // Launch into a secure external tab
    window.open(targetURL, "_blank");

    // Reset internal input state
    waInput.value = "";
  }

  // Trigger dispatch on profile avatar click
  if (waAvatar) {
    // Add clickable indicator cursor via JS
    waAvatar.style.cursor = "pointer";
    waAvatar.addEventListener("click", function () {
      redirectToWhatsApp(true); // Forces default message template execution
    });
  }

  // Listeners to execute standard button redirect triggers
  if (waSendBtn) {
    waSendBtn.addEventListener("click", function () {
      redirectToWhatsApp(false);
    });
  }

  if (waInput) {
    waInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        redirectToWhatsApp(false);
      }
    });
  }
});

/* =========================================
   Number Count-Up Animation
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  // Create an observer so it only animates when scrolled into view
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseFloat(counter.getAttribute("data-target"));
          const duration = 2000; // Animation duration in milliseconds
          const fps = 60; // Frames per second
          const totalFrames = (duration / 1000) * fps;
          let currentFrame = 0;

          // Check if the target is a decimal (e.g., 4.8)
          const isFloat = target % 1 !== 0;

          const updateCount = () => {
            currentFrame++;
            const progress = currentFrame / totalFrames;

            // Easing function for smooth slowdown at the end
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = target * easeOutProgress;

            if (currentFrame < totalFrames) {
              // Format number based on whether it is a float or integer
              counter.innerText = isFloat
                ? currentCount.toFixed(1)
                : Math.ceil(currentCount);
              requestAnimationFrame(updateCount);
            } else {
              // Ensure it ends exactly on the target number
              counter.innerText = target;
            }
          };

          updateCount();
          observer.unobserve(counter); // Stop observing once animated
        }
      });
    },
    { threshold: 0.5 },
  ); // Triggers when 50% of the element is visible

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
});
