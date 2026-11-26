// SUBSTITUA PELO SEU NÚMERO COM 55 + DDD + NÚMERO
const MEU_WHATSAPP = "557398359544";

let carrinho = [];

function adicionarAoCarrinho(nome, preco, idTamanho, idQtd) {
  const tamanho = document.getElementById(idTamanho).value;
  const quantidade = parseInt(document.getElementById(idQtd).value);

  if (quantidade <= 0 || isNaN(quantidade)) {
    alert("Escolha uma quantidade válida.");
    return;
  }

  carrinho.push({ nome, preco, tamanho, quantidade });
  atualizarTelaCarrinho();
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarTelaCarrinho();
}

function atualizarTelaCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const totalElemento = document.getElementById("valor-total");
  const btnWhatsapp = document.getElementById("btn-whatsapp");

  lista.innerHTML = "";
  let total = 0;

  if (carrinho.length === 0) {
    lista.innerHTML = '<li class="vazio">Nenhum modelo selecionado ainda.</li>';
    totalElemento.innerText = "R$ 0,00";
    btnWhatsapp.disabled = true;
    return;
  }

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.quantidade}x ${item.nome} (Tam: ${item.tamanho})</span>
      <div>
        <strong>R$ ${subtotal.toFixed(2).replace('.', ',')}</strong>
        <button class="btn-remover" onclick="removerDoCarrinho(${index})">X</button>
      </div>
    `;
    lista.appendChild(li);
  });

  totalElemento.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
  btnWhatsapp.disabled = false;
}

function finalizarWhatsApp() {
  if (carrinho.length === 0) return;

  let mensagem = "Olá! Vi o catálogo da *GG T-Shirts* e gostaria de consultar disponibilidade:\n\n";
  let total = 0;

  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;
    mensagem += `▪ ${item.quantidade}x ${item.nome} - Tam: *${item.tamanho}* (R$ ${subtotal.toFixed(2).replace('.', ',')})\n`;
  });

  mensagem += `\n*Total Estimado: R$ ${total.toFixed(2).replace('.', ',')}*`;
  mensagem += `\n\nComo combinamos o pagamento e a entrega?`;

  const url = `https://wa.me/${MEU_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}

