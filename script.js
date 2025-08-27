document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll and active link highlighting (Scrollspy)
  const navLinks = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 360;
      if (window.pageYOffset >= sectionTop)
        current = section.getAttribute("id");
    });
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  });

  // Hamburger menu toggle
  const hamburger = document.querySelector(".hamburger");
  const collapsedNav = document.querySelector(".nav-collapsed");
  if (hamburger && collapsedNav) {
    hamburger.addEventListener("click", () => {
      collapsedNav.classList.toggle("show");
    });
  }

  // Back to top button
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  const projectCards = document.querySelectorAll(".projects .card");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.getAttribute("data-filter");
      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        card.classList.toggle(
          "hide",
          !(filter === "all" || category === filter)
        );
      });
    });
  });

  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your message!");
      contactForm.reset();
    });
  }

  // Section reveal animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 }
  );
  sections.forEach((section) => observer.observe(section));

  // Typing effect for the header
  const typingText = document.querySelector(".typing");
  const text =
    "Future Software Engineer | UX/UI Creator | AI-Powered Problem Solver";
  if (typingText) {
    typingText.textContent = "";
    let index = 0;
    function type() {
      if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(type, 100);
      }
    }
    type();
  }

  // Blog post expansion functionality
  const blogPosts = document.querySelectorAll(".blog-post");
  const readMoreButtons = document.querySelectorAll(".read-more-btn");
  const overlay = document.getElementById("blogOverlay");
  let expandedPost = null;

  function expandPost(post) {
    // Collapse any currently expanded post
    if (expandedPost) {
      collapsePost(expandedPost);
    }

    // Expand the clicked post
    post.classList.add("expanded");
    expandedPost = post;

    // Show overlay
    overlay.style.display = "block";

    // Scroll to the post if it's not fully in view
    post.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function collapsePost(post) {
    post.classList.remove("expanded");
    expandedPost = null;
    overlay.style.display = "none";
  }

  // Add click events to read more buttons
  readMoreButtons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const post = button.closest(".blog-post");

      if (post.classList.contains("expanded")) {
        collapsePost(post);
      } else {
        expandPost(post);
      }
    });
  });

  // Close expanded post when clicking on overlay
  overlay.addEventListener("click", () => {
    if (expandedPost) {
      collapsePost(expandedPost);
    }
  });

  // Close expanded post when clicking outside on mobile
  if (window.innerWidth <= 700) {
    document.addEventListener("click", (e) => {
      if (expandedPost && !expandedPost.contains(e.target)) {
        collapsePost(expandedPost);
      }
    });
  }
});
