// Quando o botão dos cards for clicado, chama essa função
function irParaPagina2() {
  document.querySelector(".container").style.display = "none";
  document.querySelector(".page2").style.display = "block";
}

function mostrarProvaSocial() {
  const nome = document.getElementById("inputNome").value.trim();
  if (nome !== "") {
    localStorage.setItem("leadName", nome);
    document.getElementById("leadName").textContent = nome;
    document.getElementById("provaSocial").style.display = "block";
  
  // Adiciona isso: prepara step3 pro botão de avanço funcionar
    prepararAvanco('step3');
  } else {
    alert("Por favor, digite seu nome!");
  }
}

// Adiciona o evento de clique em todos os botões dos cards
document.querySelectorAll(".card .cta").forEach(btn => {
  btn.addEventListener("click", irParaPagina2);
});


function irParaProximaEtapa(stepAtual, proximoStep) {
  // Esconde o step atual e mostra o próximo
  document.querySelector(`.${stepAtual}`).style.display = "none";
  document.querySelector(`.${proximoStep}`).style.display = "block";

  const stepElement = document.querySelector(`.${proximoStep}`);
  const opcoes = stepElement.querySelectorAll(".toggle-opcao");
  const botaoAvanco = stepElement.querySelector(".botao-avanco");

  // Libera o botão se alguma opção for marcada
  if (botaoAvanco) {
    botaoAvanco.disabled = true;

    opcoes.forEach(opcao => {
      opcao.addEventListener("change", () => {
        const algumSelecionado = Array.from(opcoes).some(o => o.checked);
        botaoAvanco.disabled = !algumSelecionado;
      });
    });
  }
}

