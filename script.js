const formulario = document.getElementById("formulario-vulcano");
const campoNome = document.getElementById("nome-visitante");
const campoEmail = document.getElementById("email-visitante");
const campoMensagem = document.getElementById("mensagem-vulcano");
const feedbackFormulario = document.getElementById("feedback-formulario");

function mostrarErro(campo, mensagem) {
    feedbackFormulario.textContent = mensagem;
    feedbackFormulario.classList.remove("sucesso");
    feedbackFormulario.classList.add("erro");

    campo.setAttribute("aria-invalid", "true");
    campo.focus();
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();


    feedbackFormulario.textContent = "";
    feedbackFormulario.classList.remove("erro", "sucesso");

    [campoNome, campoEmail, campoMensagem].forEach(function (campo) {
        campo.removeAttribute("aria-invalid");
    });

    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();
    const mensagem = campoMensagem.value.trim();

    if (nome === "") {
        mostrarErro(campoNome, "Preencha seu nome ou nick.");
        return;
    }

    if (email === "") {
        mostrarErro(campoEmail, "Preencha seu e-mail.");
        return;
    }


    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(email)) {
        mostrarErro(campoEmail, "Digite um e-mail válido, como nome@gmail.com.");
        return;
    }

    if (mensagem === "") {
        mostrarErro(campoMensagem, "Escreva uma mensagem para Vulcano.");
        return;
    }

    if (mensagem.length > 2000) {
        mostrarErro(campoMensagem, "A mensagem deve ter até 2.000 caracteres.");
        return;
    }

    const parametros = new URLSearchParams({
        view: "cm",
        fs: "1",
        to: "vulcano.ostrogard@gmail.com",
        su: "Mensagem para Vulcano",
        body: `Nome ou nick: ${nome}\nE-mail de contato: ${email}\n\n${mensagem}`
    });

    window.open(
        "https://mail.google.com/mail/?" + parametros.toString(),
        "_blank",
        "noopener,noreferrer"
    );

    feedbackFormulario.classList.add("sucesso");
    feedbackFormulario.textContent =
        "Dados validados! Confirme o envio na aba do Gmail. Se ela não abriu, permita pop-ups para este site e tente novamente.";
});
    

const botaoMenu = document.getElementById("botao-menu");
const menuPrincipal = document.getElementById("menu-principal");
const iconeMenu = document.getElementById("icone-menu");

function atualizarMenu(aberto) {
    menuPrincipal.classList.toggle("aberto", aberto);
    botaoMenu.setAttribute("aria-expanded", String(aberto));
    iconeMenu.textContent = aberto ? "✕" : "☰";
}

botaoMenu.addEventListener("click", function () {
    const estaAberto = menuPrincipal.classList.contains("aberto");
    atualizarMenu(!estaAberto);
});

menuPrincipal.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        atualizarMenu(false);
    });
});

botaoMenu.parentElement.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
        atualizarMenu(false);
        botaoMenu.focus();
    }
});
const inventario = [
    {
        id: "martelo-ostrogard",
        nome: "🔨 Martelo de Ostrogard",
        tipo: "arma",
        raridade: "Lendário",
        descricao: "Relíquia das fundições de Ostrogard. Necessário para usar a habilidade Regeneração de Construção."
    },
    {
        id: "pergaminho-estruturas",
        nome: "📜 Pergaminho de Estruturas Perdidas",
        tipo: "pergaminho",
        raridade: "Raro",
        descricao: "Guarda projetos antigos de muralhas e mecanismos de defesa do reino."
    },
    {
        id: "pocao-forjador",
        nome: "🧪 Poção de Fôlego do Forjador",
        tipo: "pocao",
        raridade: "Comum",
        descricao: "Preparado usado pelos ferreiros para suportar longas jornadas na forja."
    },
    {
        id: "escudo-forja",
        nome: "🛡️ Escudo da Forja",
        tipo: "armadura",
        raridade: "Raro",
        descricao: "Forjado por Vulcano para resistir ao calor e proteger os trabalhadores do reino."
    },
    {
        id: "trofeu-guardiao",
        nome: "🏆 Troféu de Guardião de Ostrogard",
        tipo: "trofeu",
        raridade: "Épico",
        descricao: "Concedido a Vulcano por salvar os trabalhadores durante o desabamento da torre."
    }
];

const listaInventario = document.getElementById("lista-inventario");
const contadorInventario = document.getElementById("contador-inventario");
const botoesFiltro = document.querySelectorAll(".filtro");

function mostrarInventario(tipoEscolhido) {
    const itensVisiveis = inventario.filter(function (item) {
        return tipoEscolhido === "todos" || item.tipo === tipoEscolhido;
    });

    listaInventario.replaceChildren();

    itensVisiveis.forEach(function (item) {
        const card = document.createElement("article");
        card.classList.add("card-item");
        card.id = item.id;

        const titulo = document.createElement("h3");
        titulo.textContent = item.nome;

        const raridade = document.createElement("p");
        raridade.classList.add("raridade");
        raridade.textContent = item.raridade;

        const descricao = document.createElement("p");
        descricao.textContent = item.descricao;

        card.appendChild(titulo);
        card.appendChild(raridade);
        card.appendChild(descricao);
        listaInventario.appendChild(card);
    });

    contadorInventario.textContent =
        `${inventario.length} itens conquistados — ${itensVisiveis.length} em exibição.`;

    botoesFiltro.forEach(function (botao) {
        const ativo = botao.dataset.tipo === tipoEscolhido;
        botao.classList.toggle("ativo", ativo);
        botao.setAttribute("aria-pressed", String(ativo));
    });
}

botoesFiltro.forEach(function (botao) {
    botao.addEventListener("click", function () {
        mostrarInventario(botao.dataset.tipo);
    });
});


document.querySelector(".requisito-item").addEventListener("click", function () {
    mostrarInventario("todos");
});

mostrarInventario("todos");
let experiencia = 0;
let nivel = 1;

const chaveProgresso = "vulcano-parte2-progresso";

try {
    const progressoSalvo = localStorage.getItem(chaveProgresso);

    if (progressoSalvo !== null) {
        const progresso = JSON.parse(progressoSalvo);

        if (
            progresso !== null &&
            Number.isSafeInteger(progresso.nivel) &&
            progresso.nivel >= 1 &&
            Number.isInteger(progresso.experiencia) &&
            progresso.experiencia >= 0 &&
            progresso.experiencia < 100
        ) {
            nivel = progresso.nivel;
            experiencia = progresso.experiencia;
        }
    }
} catch {
  
    experiencia = 0;
    nivel = 1;
}

const xpPorMissao = 25;
const xpParaSubir = 100;

const nivelHeroi = document.getElementById("nivel-heroi");
const textoXp = document.getElementById("texto-xp");
const barraXp = document.getElementById("barra-xp");
const preenchimentoXp = document.getElementById("preenchimento-xp");
const ganharXp = document.getElementById("ganhar-xp");
const feedbackXp = document.getElementById("feedback-xp");

function atualizarExperiencia() {
    nivelHeroi.textContent = nivel;
    textoXp.textContent = `${experiencia} de ${xpParaSubir} XP`;

    const porcentagem = (experiencia / xpParaSubir) * 100;
    preenchimentoXp.style.width = `${porcentagem}%`;

    barraXp.setAttribute("aria-valuenow", String(experiencia));
    barraXp.setAttribute("aria-valuemax", String(xpParaSubir));

     verificarConquista();
    salvarProgresso();
}

ganharXp.addEventListener("click", function () {
    experiencia += xpPorMissao;

    if (experiencia >= xpParaSubir) {
        experiencia -= xpParaSubir;
        nivel++;

        feedbackXp.textContent =
            `Nível up! Vulcano chegou ao nível ${nivel}!`;
    } else {
        feedbackXp.textContent =
            `Missão concluída! +${xpPorMissao} XP. Faltam ${xpParaSubir - experiencia} XP para subir de nível.`;
    }

    atualizarExperiencia();
});

atualizarExperiencia();
function verificarConquista() {
    if (nivel < 70) {
        return;
    }

    const avatar = document.querySelector(".avatar-heroi");

    avatar.setAttribute(
        "src",
        "imagens/vulcano-mestre-das-forjas.png"
    );

    avatar.setAttribute(
        "alt",
        "Vulcano, Mestre das Forjas, com manto de pele marcado por lava e martelo aprimorado com runas azuis."
    );

    document.getElementById("titulo-heroi").textContent =
        "🏆 Título conquistado: Mestre das Forjas!";

    const jaConquistou = inventario.some(function (item) {
        return item.id === "trofeu-mestre-forjas";
    });

    if (!jaConquistou) {
        inventario.push({
            id: "trofeu-mestre-forjas",
            nome: "🏆 Mestre das Forjas",
            tipo: "trofeu",
            raridade: "Lendário",
            descricao: "Título conquistado no nível 70. Vulcano recebeu o manto das forjas e aprimorou seu martelo com runas azuis."
        });

        const filtroAtual = document.querySelector(".filtro.ativo");
        mostrarInventario(filtroAtual.dataset.tipo);

        feedbackXp.textContent =
            "Nível 70! Vulcano recebeu o título Mestre das Forjas, uma nova aparência e um troféu!";
    }
}
const botaoHistoria = document.getElementById("botao-historia");
const historiaCompleta = document.getElementById("historia-completa");

botaoHistoria.addEventListener("click", function () {
    const aberta = historiaCompleta.hidden;

    historiaCompleta.hidden = !aberta;
    historiaCompleta.classList.toggle("revelado", aberta);

    botaoHistoria.setAttribute("aria-expanded", String(aberta));

    botaoHistoria.textContent = aberta
        ? "Ver menos"
        : "Ver história completa";
});
const horaAtual = new Date().getHours();
const saudacaoHeroi = document.getElementById("saudacao-heroi");

if (horaAtual < 12) {
    saudacaoHeroi.textContent =
        "Bom dia, viajante! As forjas de Ostrogard esperam por você.";
} else if (horaAtual < 18) {
    saudacaoHeroi.textContent =
        "Boa tarde, guerreiro! Vamos fortalecer as defesas do reino.";
} else {
    saudacaoHeroi.textContent =
        "Boa noite, guardião! A chama de Ostrogard continua acesa.";
}const botaoTema = document.getElementById("botao-tema");

botaoTema.addEventListener("click", function () {
    const modoNoturno = document.body.classList.toggle("modo-noturno");

    botaoTema.setAttribute("aria-pressed", String(modoNoturno));

    botaoTema.textContent = modoNoturno
        ? "☀️ Restaurar visual original"
        : "🌙 Ativar modo noturno";
});
function salvarProgresso() {
    const avisoSalvamento = document.getElementById("aviso-salvamento");

    const progresso = {
        nivel: nivel,
        experiencia: experiencia
    };

    try {
        localStorage.setItem(
            chaveProgresso,
            JSON.stringify(progresso)
        );

        avisoSalvamento.textContent =
            "Progresso salvo neste navegador.";
    } catch {
        avisoSalvamento.textContent =
            "Não foi possível salvar. Você pode continuar jogando, mas o progresso poderá ser perdido ao fechar a página.";
    }
}