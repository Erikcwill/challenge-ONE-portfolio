var isRotated = false;

export function rotateProfile() {
  var profile = document.querySelector(".tittle__profile");
  var screenWidth = window.innerWidth;

  if (screenWidth <= 768) {
    if (isRotated) {
      profile.style.transform = "rotateY(0deg)";
      isRotated = false;
    } else {
      profile.style.transform = "rotateY(180deg)";
      isRotated = true;
    }
  }
}
