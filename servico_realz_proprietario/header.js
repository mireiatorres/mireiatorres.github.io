const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
      const mobileMenu = document.querySelector(".mobile-menu");
      const menuOverlay = document.querySelector(".menu-overlay");
      const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

      function toggleMenu() {
        mobileMenuBtn.classList.toggle("active");
        mobileMenu.classList.toggle("active");
        menuOverlay.classList.toggle("active");
        document.body.style.overflow = mobileMenu.classList.contains("active")
          ? "hidden"
          : "";
      }

      mobileMenuBtn.addEventListener("click", toggleMenu);
      menuOverlay.addEventListener("click", toggleMenu);

      mobileNavLinks.forEach((link) => {
        link.addEventListener("click", toggleMenu);
      });

      window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
          mobileMenuBtn.classList.remove("active");
          mobileMenu.classList.remove("active");
          menuOverlay.classList.remove("active");
          document.body.style.overflow = "";
        }
      });