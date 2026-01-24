document.addEventListener("DOMContentLoaded", () => {
  // --- 1. DEFINE DATA ---
  const engineerData = [
    { label: "Lines of Code", value: 12500, suffix: "+", icon: "💻" },
    { label: "Coffees Consumed", value: 0, suffix: " ☕", icon: "☕" },
    { label: "Bugs Squashed", value: 99, suffix: "%", icon: "👾" },
    { label: "Security Threats", value: 0, suffix: " (Clean)", icon: "🛡️" },
  ];

  const metricsContainer = document.getElementById("metrics-display");

  // --- 2. RENDER THE CARDS ---
  if (metricsContainer) {
    metricsContainer.innerHTML = "";

    engineerData.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("metric-card");
      // Initial state for animation
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      card.style.transition = "all 0.5s ease-out";
      card.style.transitionDelay = `${index * 0.1}s`;

      card.innerHTML = `
        <div class="metric-icon">${item.icon}</div>
        <div class="metric-number" data-target="${item.value}" data-suffix="${item.suffix}">0${item.suffix}</div>
        <div class="metric-label">${item.label}</div>
      `;

      metricsContainer.appendChild(card);
    });
  }

  // --- 3. ANIMATION FUNCTION (The Counter) ---
  const runCounter = (el) => {
    const target = +el.getAttribute("data-target");
    const suffix = el.getAttribute("data-suffix");
    const duration = 2000;
    const increment = target / (duration / 16);

    let current = 0;

    const updateCount = () => {
      current += increment;
      if (current < target) {
        el.innerHTML =
          Math.ceil(current) +
          `<span style="font-size:1rem; color:#c084fc;">${suffix}</span>`;
        requestAnimationFrame(updateCount);
      } else {
        el.innerHTML =
          target +
          `<span style="font-size:1rem; color:#c084fc;">${suffix}</span>`;
      }
    };
    updateCount();
  };

  // --- 4. INTERSECTION OBSERVER (Trigger Everything) ---
  const observerOptions = { threshold: 0.2 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // A. Reveal the card
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

        // B. If it's a metric card, run the numbers
        if (entry.target.classList.contains("metric-card")) {
          const numberEl = entry.target.querySelector(".metric-number");
          // Check if we already ran the animation to prevent re-running
          if (numberEl && !numberEl.classList.contains("counted")) {
            runCounter(numberEl);
            numberEl.classList.add("counted");
          }
        }
      }
    });
  }, observerOptions);

  // Observe all cards
  const allCards = document.querySelectorAll(
    ".card, .project-card, .metric-card",
  );
  allCards.forEach((card) => observer.observe(card));

  // --- 5. TYPEWRITER EFFECT ---
  const textElement = document.querySelector(".typewriter");
  if (textElement) {
    const phrases = [
      "architect intelligent data.",
      "craft beautiful software.",
      "ensure system security.",
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        textElement.textContent = "I " + current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        textElement.textContent = "I " + current.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, isDeleting ? 50 : 100);
      }
    }
    type();
  }
});
