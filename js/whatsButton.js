export function configurarWhatsAppButton() {
    document.addEventListener("DOMContentLoaded", function () {
      const whatsappButton = document.getElementById("whatsapp-button");
      const contatoSection = document.getElementById("contato");
      const navLinks = document.querySelectorAll("a.nav-link");
  
      function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
      }
  
      function handleScroll() {
        if (isInViewport(contatoSection)) {
          whatsappButton.classList.add("active");
        } else {
          whatsappButton.classList.remove("active");
        }
      }
  
      function handleNavClick() {
        whatsappButton.classList.add("active");
      }
  
      navLinks.forEach(function (link) {
        link.addEventListener("click", handleNavClick);
      });
  
      window.addEventListener("scroll", handleScroll);
    });
  }