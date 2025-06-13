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
    
    // oculta avanço do nome
    document.getElementById("btnNome").style.display = "none";

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

function atualizarTrilha(stepAtual) {
  const trilha = document.getElementById("trilhaProgresso");
  const barra = document.getElementById("barraProgresso");
  const stepsComBarra = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];

  // Mostra barra se estiver dentro dos steps certos
  if (stepsComBarra.includes(parseInt(stepAtual.replace("step", "")))) {
    trilha.style.display = "block";
  } else {
    trilha.style.display = "none";
  }

  const totalEtapas = 35 - 3; // de step 3 a 35
  const etapaAtual = parseInt(stepAtual.replace("step", "")) - 3;
  const percentual = Math.min((etapaAtual / totalEtapas) * 100, 100);

  barra.style.width = percentual + "%";

  // Checkpoints
  if (etapaAtual >= 6) document.getElementById("cp1").classList.add("ativo"); // step 9
  if (etapaAtual >= 10) document.getElementById("cp2").classList.add("ativo"); // step 13
  if (etapaAtual >= 16) document.getElementById("cp3").classList.add("ativo"); // step 19
  if (etapaAtual >= 32) document.getElementById("cp4").classList.add("ativo"); // step 35
}

function mostrarTrilha() {
  const trilha = document.querySelector(".trilha-progresso");
  if (trilha) {
    trilha.style.display = "block";
    atualizarTrilha("step3"); // já começa no 1º checkpoint
  }
}
