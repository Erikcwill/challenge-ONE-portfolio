// botaoVoltarAoTopo.js
export function adicionarBotaoVoltarAoTopo() {
  window.addEventListener("scroll", function() {
    var button = document.getElementById("voltarAoTopo");
    if (window.pageYOffset > 0) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  });

  document.getElementById("voltarAoTopo").addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
