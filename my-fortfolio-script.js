// Mobile menu toggle
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("navLinks");
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () =>
          navLinks.classList.remove("active"),
        );
      });

      // Navbar shadow on scroll
      window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        navbar.style.boxShadow =
          window.scrollY > 50 ? "0 4px 20px rgba(0,0,0,0.4)" : "none";
      });

      // Back-to-top button
      const backToTop = document.getElementById("backToTop");
      window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY > 400);
      });

      // Reveal sections on scroll
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0)";
            }
          });
        },
        { threshold: 0.1 },
      );

      document.querySelectorAll(".section").forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(40px)";
        section.style.transition = "all 0.8s ease";
        observer.observe(section);
      });

      // Animate skill bars when visible
      const barObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const fill = entry.target;
              fill.style.width = fill.dataset.width;
              barObserver.unobserve(fill);
            }
          });
        },
        { threshold: 0.3 },
      );

      document
        .querySelectorAll(".bar-fill")
        .forEach((fill) => barObserver.observe(fill));
