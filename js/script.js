function mostrarProvaSocial() {
  const nome = document.getElementById("inputNome").value.trim();
  if (nome !== "") {
    localStorage.setItem("leadName", nome);
    document.getElementById("leadName").textContent = nome;
    document.getElementById("provaSocial").style.display = "block";
  } else {
    alert("Por favor, digite seu nome!");
  }
}

// Quando o botão dos cards for clicado, chama essa função
function irParaPagina2() {
  document.querySelector(".container").style.display = "none";
  document.querySelector(".page2").style.display = "block";
}

// Adiciona o evento de clique em todos os botões dos cards
document.querySelectorAll(".card .cta").forEach(btn => {
  btn.addEventListener("click", irParaPagina2);
});

function irParaProximaEtapa() {
  document.querySelector(".page2").style.display = "none";
  document.querySelector(".step3").style.display = "block";

  const step3 = document.querySelector(".step3");
  const opcoes = step3.querySelectorAll(".toggle-opcao");
  const botaoAvanco = step3.querySelector(".botao-avanco");

  // Libera o botão só se alguma opção for marcada
  opcoes.forEach(opcao => {
    opcao.addEventListener("change", () => {
      const algumSelecionado = Array.from(opcoes).some(o => o.checked);
      botaoAvanco.disabled = !algumSelecionado;
    });
  });
}

function irParaProximaEtapa2() {
  document.querySelector(".step3").style.display = "none";
  document.querySelector(".step4").style.display = "block";

  const step4 = document.querySelector(".step4");
  const opcoes = step4.querySelectorAll(".toggle-opcao");
  const botaoAvanco = step4.querySelector(".botao-avanco");

  // Libera o botão se alguma opção for marcada
  opcoes.forEach(opcao => {
    opcao.addEventListener("change", () => {
      const algumSelecionado = Array.from(opcoes).some(o => o.checked);
      botaoAvanco.disabled = !algumSelecionado;
    });
  });
}
