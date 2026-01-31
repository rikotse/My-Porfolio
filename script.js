document.addEventListener("DOMContentLoaded", () => {
  // --- 1. DEFINE DATA ---
  const engineerData = [
    { label: "Lines of Code", value: 12500, suffix: "+", icon: "💻" },
    { label: "Coffees Consumed", value: 10, suffix: " ☕", icon: "☕" },
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

  // --- 6. BLOG MODAL FUNCTIONALITY ---

  // 1. The Blog Data
  const blogPosts = [
    {
      id: 0,
      title:
        "Between Fear and Fire: Taking on Cybersecurity and Data Engineering",
      date: "Jan 30, 2026",
      content: `
        <p><strong>Deciding to pursue both Cybersecurity and Data Engineering at the same time was not a calm, logical decision — it was equal parts excitement and fear.</strong> On one hand, I feel deeply inspired by the possibilities ahead. On the other, I would be lying if I said I wasn’t scared.</p>
        <br>
        <p>The workload is heavy, the expectations are high, and there are moments when the weight of doing both feels overwhelming. But strangely, that fear doesn’t paralyse me — it energises me. It reminds me that I am standing at the edge of growth, and growth has never been comfortable.</p>
        <br>
        <p>Cybersecurity sharpened my awareness of systems, vulnerabilities, and responsibility. Data Engineering challenged me to think in pipelines, structures, and long-term impact. Together, they are stretching me in ways a single path never could. I am learning how to think defensively and strategically at the same time — how to protect systems while extracting meaning from them.</p>
        <br>
        <p>There are days when doubt creeps in, when I question whether I have taken on too much. But there are also days when I feel deeply empowered. Every concept I grasp, every challenge I survive, strengthens my belief that I am capable of more than I once imagined.</p>
        <br>
        <p>Doing both Cybersecurity and Data Engineering is not about proving anything to anyone else. It is about honouring my curiosity, my ambition, and my refusal to limit myself to a single box. I am learning to trust my resilience, discipline, and adaptability.</p>
        <br>
        <p>I may be afraid — but I am not backing down. I am building breadth and depth, pressure and precision. <strong>When this chapter is complete, I will not just be qualified; I will be formidable. A force to be reckoned with.</strong></p>
      `,
    },
    {
      id: 1,
      title: "ALX Professional Foundations: A Silent but Defining Shift",
      date: "Jan 30, 2026",
      content: `
        <p>When I first enrolled in the ALX Professional Foundations course, I had no expectations — if anything, I dreaded it. I was eager to jump straight into my specialised tech track and saw Professional Foundations as something I just needed to “get through.” <strong>I had no idea that it would quietly become one of the most impactful learning experiences of my life.</strong></p>
        <br>
        <p>As the weeks progressed, something unexpected happened. I wasn’t just learning new concepts — I could feel the way I thought beginning to change. It genuinely felt like the wires in my brain were shifting, stretching to accommodate new, enlightening ways of seeing myself, my work, and the world around me.</p>
        <br>
        <p>The entrepreneurship lessons stood out the most. They weren’t abstract theories reserved for startups or boardrooms; they were practical frameworks I could apply to my daily life. From problem-solving to opportunity recognition, I began approaching everyday situations with more intention and clarity.</p>
        <br>
        <p>One of the most transformative moments for me was the elevator pitch activity. It pushed me far outside my comfort zone and helped me build confidence in articulating who I am. Working in peer groups was equally powerful — it taught me empathy, adaptability, and the value of shared leadership.</p>
        <br>
        <p>Looking back, Professional Foundations became an unexpected turning point. It didn’t change me loudly or instantly — it changed me silently, but deeply. It was during this course that I rediscovered myself and found the language to describe my identity in tech.</p>
        <br>
        <p>This is where I embraced the title <strong>Creative Engineer</strong> — someone who exists at the intersection of technology, creativity, systems thinking, and human-centred problem solving. ALX Professional Foundations didn’t just prepare me for a career; it helped me reconnect with who I am and who I am becoming.</p>
      `,
    },
    {
      id: 2,
      title: "My Experience at the Johannesburg Amazon Summit 2025",
      date: "March 22, 2025",
      content: `
        <p><strong>Attending the Amazon Summit in Johannesburg was an eye-opening experience.</strong> Although I registered as a student and was limited to the student zone, it gave me a new perspective on the tech community and the value of networking in the industry.</p>
        <br>
        <p>The Johannesburg Amazon Summit 2025 was my first major tech conference, and I was excited to dive into the world of cloud, innovation, and networking. However, when registering I mistakenly signed up as a student, which meant I wasn’t allowed into the main building where the core sessions were happening. Instead, I was placed in the student zone — a space designed more for introductory exposure than in-depth learning.</p>
        <br>
        <p>At first, I was a little disappointed because I felt like I was missing out on the deeper technical sessions, but the experience still had its own value. I connected with other students and young developers who were also starting their journeys in tech. It became more of a social experience, and through conversations I gained insights into different learning paths, struggles, and opportunities others were exploring.</p>
        <br>
        <p>Being surrounded by so many like-minded people gave me a new appreciation for the importance of community in tech. It reminded me that growth doesn’t just come from workshops or certifications — it also comes from sharing experiences, asking questions, and building relationships.</p>
        <br>
        <p>While I didn’t get the full summit experience I had hoped for, it was still an important milestone for me. It made me realize how important it is to take every opportunity seriously — even small details like how you register. Next time, I’ll make sure to sign up properly so I can attend the main sessions and absorb as much knowledge as possible.</p>
        <br>
        <p><strong>Most importantly, the summit sparked a fire in me to keep showing up in spaces like these.</strong> Even if things don’t go as planned, every experience has something to teach, and this one taught me to always stay curious and intentional about my growth in tech.</p>
      `,
    },
    {
      id: 3,
      title: "My Journey Through the FNB App Academy Bootcamp",
      date: "March 10, 2025",
      content: `
        <p><strong>From my very first "Hello World" to building full-stack applications in just 9 weeks, the FNB App Academy bootcamp was a life-changing experience.</strong> It showed me that with focus and persistence, I can learn and create anything I set my mind to.</p>
        <br>
        <p>My journey into coding officially began here—a 9-week intensive program that opened the doors to full-stack development. From the very first moment I ran "Hello World," I knew I had fallen in love with coding. It was exciting to see something I typed on the screen come to life.</p>
        <br>
        <p>The program was fast-paced. Within weeks, we went from writing simple HTML and CSS pages to tackling JavaScript and Python projects. The amount of information packed into those 9 weeks was overwhelming at times, but also incredibly rewarding.</p>
        <br>
        <p><strong>Debugging became one of my favorite parts of the process.</strong> Every error message was a challenge waiting to be solved, and each solution brought a sense of accomplishment. Watching my web apps evolve with every fix and new feature made me realize how powerful coding really is.</p>
        <br>
        <p>Through the bootcamp, I learned the importance of persistence, problem-solving, and collaboration. More than just the technical knowledge, I gained confidence in my ability to grow as a developer.</p>
        <br>
        <p>I will always be grateful to <strong>FNB and IT Varsity</strong> for giving me this opportunity. Their support and guidance set the foundation for my career in tech, and I’m excited to keep building, learning, and creating as I continue my journey as a full-stack developer.</p>
      `,
    },
    {
      id: 4,
      title: "Building Lorraine's Restaurant Web App",
      date: "April 5, 2025",
      content: `
        <p><strong>Lorraine's Restaurant web app has been one of my most exciting projects.</strong> From building a beautiful menu layout to adding real functionality like bookings, ordering, and a working cart system, it challenged me to grow as both a front-end and back-end developer.</p>
        <br>
        <p>When I started, my goal was simple: create a visually appealing site where users could browse the menu. But as the project grew, I realized I wanted to push myself further and bring in real-world functionality like filtering menu items, customizing orders, and persisting cart data.</p>
        <br>
        <p>The front-end came first. I wanted users to feel like they were stepping into a real restaurant space, so I focused on details like smooth navigation, scrollable category tabs, and animations that made the experience interactive.</p>
        <br>
        <p>The real challenge came when I started implementing the logic. I worked on:</p>
        <ul>
          <li>A <strong>booking form</strong> that validates input and allows users to reserve tables.</li>
          <li>A <strong>cart system</strong> with quantity increment/decrement, remove buttons, and localStorage persistence.</li>
          <li>A <strong>menu customization modal</strong> where users can add notes before sending items to the cart.</li>
          <li><strong>Smooth scrolling</strong> between menu categories for better navigation.</li>
        </ul>
        <br>
        <p>Debugging became a huge part of the journey — from fixing a stubborn hamburger menu that wouldn’t behave on mobile, to ensuring that cart totals updated dynamically every time an order changed. Each solved bug felt like a small victory.</p>
        <br>
        <p><strong>Lorraine’s Restaurant taught me how to think like a user.</strong> It wasn’t just about making things look good, but about making them work in a way that feels natural. Each update brings me closer to building a full-stack app that feels production-ready.</p>
      `,
    },
  ];

  // 2. Elements
  const modal = document.getElementById("blog-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDate = document.getElementById("modal-date");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.querySelector(".close-modal");
  const readLinks = document.querySelectorAll(".read-link");

  // 3. Open Modal
  readLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Stop page jump

      // Get data based on index (assuming order matches)
      const post = blogPosts[index];

      // Populate Modal
      modalTitle.textContent = post.title;
      modalDate.textContent = post.date;
      modalBody.innerHTML = post.content;

      // Show Modal
      modal.classList.add("active");
    });
  });

  // 4. Close Modal (X button)
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // 5. Close Modal (Click Outside)
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // --- 7. MOBILE MENU LOGIC ---
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (hamburger && mobileMenu) {
    // Toggle Menu
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("active");

      // Stop scrolling when menu is open
      if (mobileMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    });

    // Close Menu (Function to reuse)
    const closeMenu = () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "auto";
    };

    // Close when X is clicked (NEW)
    if (mobileClose) {
      mobileClose.addEventListener("click", closeMenu);
    }

    // Close when any link is clicked
    mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }
});
