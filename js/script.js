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
  if (botaoAvanco && opcoes.length > 0) {
    botaoAvanco.disabled = true

    opcoes.forEach(opcao => {
      opcao.addEventListener("change", () => {
        const algumSelecionado = Array.from(opcoes).some(o => o.checked)
        botaoAvanco.disabled = !algumSelecionado
      })
    })
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

document.querySelectorAll('.card-opcao').forEach(card => {
  card.addEventListener('click', () => {
    // marca visual
    card.classList.toggle('selecionado');

    // busca botão de avanço do step atual
    const step = card.closest("section");
    const botao = step.querySelector(".botao-avanco");

    // se houver ao menos 1 selecionado, ativa o botão
    const algumSelecionado = step.querySelectorAll(".card-opcao.selecionado").length > 0;
    if (botao) botao.disabled = !algumSelecionado;
  });
});

const canvas = document.getElementById('canvasRoleta')
const ctx = canvas.getContext('2d')
const btn = document.getElementById('btnGirarCanvas')
const resultado = document.getElementById('resultadoRoleta')

const premios = [
  '100 reais', 'R$5 OFF', '120 reais',
  'Quase lá', 'Nada', '10% OFF',
  'R$5 OFF', 'Mais sorte'
]
const cores = [
  '#f94144', '#f3722c', '#f9c74f', '#90be6d',
  '#43aa8b', '#577590', '#9b5de5', '#f15bb5'
]

const total = premios.length
const anguloPorSetor = 360 / total
let angle = 0
let girando = false

function desenharRoleta() {
  for (let i = 0; i < total; i++) {
    const start = (angle + i * anguloPorSetor) * Math.PI / 180
    const end = (angle + (i + 1) * anguloPorSetor) * Math.PI / 180

    ctx.beginPath()
    ctx.moveTo(150, 150)
    ctx.arc(150, 150, 150, start, end)
    ctx.fillStyle = cores[i % cores.length]
    ctx.fill()

    // Texto
    ctx.save()
    ctx.translate(150, 150)
    ctx.rotate((start + end) / 2)
    ctx.textAlign = 'right'
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 14px Poppins'
    ctx.fillText(premios[i], 140, 10)
    ctx.restore()
  }
}

function girarParaPremio(indexPremiado) {
  if (girando) return
  girando = true

  const voltas = 5
  const destinoFinal = 360 * voltas - (indexPremiado * anguloPorSetor + anguloPorSetor / 2)
  let atual = 0

  const intervalo = setInterval(() => {
    ctx.clearRect(0, 0, 300, 300)
    angle += 5
    angle %= 360
    desenharRoleta()
    atual += 5

    if (atual >= destinoFinal) {
      clearInterval(intervalo)
      girando = false
      resultado.style.display = 'block'
      localStorage.setItem('roletaGirada', 'true')
      btn.style.display = 'none'
    }
  }, 16)
}

// Inicializa
desenharRoleta()

btn.addEventListener('click', () => {
  // Sempre cair no índice 1 → 'R$5 OFF'
  girarParaPremio(1)
})

document.querySelectorAll('.card-sono').forEach(card => {
  card.addEventListener('click', () => {
    // remove seleção de todos
    document.querySelectorAll('.card-sono').forEach(c => c.classList.remove('selecionado'))

    // seleciona o clicado
    card.classList.add('selecionado')
  })
})

window.addEventListener('DOMContentLoaded', () => {
  let unidadeAtual = 'cm'

  const btnCm = document.getElementById('btnCm')
  const btnPol = document.getElementById('btnPol')
  const alturaInput = document.getElementById('alturaInput')
  const unidadeLabel = document.getElementById('unidadeLabel')
  const btnContinuar = document.getElementById('continuarAltura')

  if (!btnCm || !btnPol || !alturaInput || !unidadeLabel || !btnContinuar) {
    console.warn('Elementos não encontrados. Verifique os IDs no HTML.')
    return
  }

  btnCm.addEventListener('click', () => {
    unidadeAtual = 'cm'
    btnCm.classList.add('ativa')
    btnPol.classList.remove('ativa')
    unidadeLabel.textContent = 'cm'
  })

  btnPol.addEventListener('click', () => {
    unidadeAtual = 'pol'
    btnPol.classList.add('ativa')
    btnCm.classList.remove('ativa')
    unidadeLabel.textContent = 'pol'
  })

  alturaInput.addEventListener('input', () => {
    btnContinuar.disabled = Number(alturaInput.value) <= 0
  })

  btnContinuar.addEventListener('click', () => {
    const altura = Number(alturaInput.value)
    localStorage.setItem(
      'alturaUsuario',
      JSON.stringify({ altura, unidade: unidadeAtual })
    )
    irParaProximaEtapa('step27', 'step28')
    atualizarTrilha('step28')
  })
})

window.addEventListener('DOMContentLoaded', () => {
  const btnKg = document.getElementById('btnKg')
  const btnLb = document.getElementById('btnLb')
  const pesoInput = document.getElementById('pesoInput')
  const unidadePesoLabel = document.getElementById('unidadePesoLabel')
  const btnContinuarPeso = document.getElementById('continuarPeso')

  if (!btnKg || !btnLb || !pesoInput || !unidadePesoLabel || !btnContinuarPeso) return

  let unidadePeso = 'kg'

  btnKg.addEventListener('click', () => {
    unidadePeso = 'kg'
    btnKg.classList.add('ativa')
    btnLb.classList.remove('ativa')
    unidadePesoLabel.textContent = 'kg'
  })

  btnLb.addEventListener('click', () => {
    unidadePeso = 'lb'
    btnLb.classList.add('ativa')
    btnKg.classList.remove('ativa')
    unidadePesoLabel.textContent = 'lb'
  })

  pesoInput.addEventListener('input', () => {
    btnContinuarPeso.disabled = Number(pesoInput.value) <= 0
  })

  window.salvarPesoEAvancar = function () {
    const peso = Number(pesoInput.value)

    localStorage.setItem('pesoUsuario', JSON.stringify({
      peso,
      unidade: unidadePeso
    }))

    irParaProximaEtapa('step28', 'step29')
    atualizarTrilha('step29')
  }
})

window.addEventListener('DOMContentLoaded', () => {
  const btnMetaKg = document.getElementById('btnMetaKg')
  const btnMetaLb = document.getElementById('btnMetaLb')
  const metaPesoInput = document.getElementById('metaPesoInput')
  const unidadeMetaLabel = document.getElementById('unidadeMetaLabel')
  const btnContinuarMeta = document.getElementById('continuarMetaPeso')

  if (!btnMetaKg || !btnMetaLb || !metaPesoInput || !unidadeMetaLabel || !btnContinuarMeta) return

  let unidadeMeta = 'kg'

  btnMetaKg.addEventListener('click', () => {
    unidadeMeta = 'kg'
    btnMetaKg.classList.add('ativa')
    btnMetaLb.classList.remove('ativa')
    unidadeMetaLabel.textContent = 'kg'
  })

  btnMetaLb.addEventListener('click', () => {
    unidadeMeta = 'lb'
    btnMetaLb.classList.add('ativa')
    btnMetaKg.classList.remove('ativa')
    unidadeMetaLabel.textContent = 'lb'
  })

  metaPesoInput.addEventListener('input', () => {
    btnContinuarMeta.disabled = Number(metaPesoInput.value) <= 0
  })

  window.salvarMetaPesoEAvancar = function () {
    const pesoMeta = Number(metaPesoInput.value)

    localStorage.setItem('metaPesoUsuario', JSON.stringify({
      peso: pesoMeta,
      unidade: unidadeMeta
    }))

    irParaProximaEtapa('step29', 'step30')
    atualizarTrilha('step30')
  }
})

window.addEventListener('DOMContentLoaded', () => {
  const idadeInput = document.getElementById('idadeInput')
  const btnContinuarIdade = document.getElementById('continuarIdade')

  if (!idadeInput || !btnContinuarIdade) return

  idadeInput.addEventListener('input', () => {
    const idade = Number(idadeInput.value)
    btnContinuarIdade.disabled = idade < 10 || idade > 120
  })

  window.salvarIdadeEAvancar = function () {
    const idade = Number(idadeInput.value)
    localStorage.setItem('idadeUsuario', idade)
    irParaProximaEtapa('step30', 'step31')
    atualizarTrilha('step31')
  }
})

function iniciarCarregamentoStep35() {
  const barra = document.getElementById('barraProgressoInterna')
  const percentual = document.getElementById('porcentagem')

  let progresso = 0

  const intervalo = setInterval(() => {
    progresso++

    barra.style.width = `${progresso}%`
    percentual.textContent = `${progresso}%`

    if (progresso >= 100) {
      clearInterval(intervalo)
      irParaProximaEtapa('step35', 'step36')
      atualizarTrilha('step36')
    }
  }, 50) // 50ms x 100 = 5 segundos total
}

