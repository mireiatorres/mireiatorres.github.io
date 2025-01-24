// Dados Local storage //
if (!localStorage.getItem("serviceData")) {
    const data = [
      {
        client: "João Silva - CPF: 123.456.789-00 - Fiat Argo - Placa DEF-3456",
        os: [
          {
            code: "11111",
            date: "10/09/2024",
            description: "Revisão completa",
            details: [
              {
                start: "15/09/2024",
                end: "16/09/2024",
                services: "Troca de óleo, Troca das velas de ignição, Troca da correia dentada, Ajuste de freios e suspensão",
                replacedParts: "Filtro de óleo, Velas de ignição, Correia dentada",
                refurbishedParts: "Freios, Suspensão",
                cost: "R$ 5000,00",
              },
            ],
          },
          {
            code: "22222",
            date: "20/09/2024",
            description: "Troca de bateria",
            details: [
              {
                start: "20/09/2024",
                end: "21/09/2024",
                services: "Troca de bateria",
                replacedParts: "Bateria",
                refurbishedParts: "",
                cost: "R$ 450,00",
              },
            ],
          },
        ],
      },
      {
        client: "Maria Oliveira - CPF: 987.654.321-00 - Fiat Uno - Placa ABC-12346",
        os: [
          {
            code: "33333",
            date: "01/10/2024",
            description: "Revisão completa",
            details: [
              {
                start: "01/10/2024",
                end: "03/10/2024",
                services: "Revisão completa",
                replacedParts: "Filtros de ar, Óleo do motor",
                refurbishedParts: "",
                cost: "R$ 900,00",
              },
            ],
          },
          {
            code: "44444",
            date: "15/10/2024",
            description: "Troca de fluido de freio",
            details: [
              {
                start: "15/10/2024",
                end: "15/10/2024",
                services: "Troca de fluido de freio",
                replacedParts: "Fluido de freio",
                refurbishedParts: "Sistema de freios",
                cost: "R$ 350,00",
              },
            ],
          },
        ],
      },
      {
        client: "Ana Costa - CPF: 321.654.987-00 - Chevrolet Onix - Placa QWE-9876",
        os: [
          {
            code: "55555",
            date: "25/10/2024",
            description: "Substituição de pastilhas de freio",
            details: [
              {
                start: "25/10/2024",
                end: "25/10/2024",
                services: "Troca de pastilhas de freio",
                replacedParts: "Pastilhas de freio",
                refurbishedParts: "",
                cost: "R$ 300,00"
              }
            ]
          }
        ]
      },
      {
        client: "Fernanda Lima - CPF: 159.753.258-00 - Ford Ka - Placa OPQ-1357",
        os: [
          {
            code: "66666",
            date: "05/11/2024",
            description: "Troca de óleo do motor",
            details: [
              {
                start: "05/11/2024",
                end: "05/11/2024",
                services: "Troca de óleo do motor",
                replacedParts: "Óleo do motor, Filtro de óleo",
                refurbishedParts: "",
                cost: "R$ 250,00"
              }
            ]
          }
        ]
      }
    ];
    localStorage.setItem("serviceData", JSON.stringify(data));
  }

  // Recuperar dados do Local Storage
const data = JSON.parse(localStorage.getItem("serviceData"));

// Elementos DOM
const clienteDropdownMenu = document.getElementById("clienteDropdownMenu");
const osDropdownMenu = document.getElementById("osDropdownMenu");
const osDescription = document.getElementById("osDescription");
const tabelaGrandeBody = document.getElementById("tabelaGrandeBody");
const tabelaPequenaBody = document.getElementById("tabelaPequenaBody");

// Função para carregar clientes no dropdown
function carregarClientes() {
  clienteDropdownMenu.innerHTML = "";
  data.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<a class="dropdown-item" href="#" data-index="${index}">${item.client}</a>`;
    clienteDropdownMenu.appendChild(li);
  });
}

// Função para carregar ordens de serviço com base no cliente selecionado
function carregarOS(indexCliente) {
  const cliente = data[indexCliente];
  osDropdownMenu.innerHTML = "";
  cliente.os.forEach((os, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<a class="dropdown-item" href="#" data-cliente="${indexCliente}" data-os="${index}">Código: ${os.code} - Data: ${os.date} - ${os.description}</a>`;
    osDropdownMenu.appendChild(li);
  });
}

// Função para limpar exibição de detalhes da OS
function limparDetalhesOS() {
  osDescription.textContent = "Selecione uma ordem de serviço.";
  tabelaGrandeBody.innerHTML = "";
  tabelaPequenaBody.innerHTML = "";
}

// Função para exibir detalhes da ordem de serviço na tabela
function exibirDetalhesOS(indexVeiculo, indexOS) {
  const os = data[indexVeiculo].os[indexOS];
  const detalhes = os.details[0];

  // Atualizar descrição
  osDescription.textContent = `Descrição da OS: ${os.code} - ${os.description}`;

  // Função para formatar os dados em parágrafos
  function formatarEmParagrafos(texto) {
    return texto
      .split(",")
      .map(item => `<p>${item.trim()}</p>`)
      .join("");
  }

  // Atualizar a tabela grande
  tabelaGrandeBody.innerHTML = `
    <tr>
      <td>${detalhes.start}</td>
      <td>${detalhes.end}</td>
      <td>${formatarEmParagrafos(detalhes.services)}</td>
      <td>${formatarEmParagrafos(detalhes.replacedParts)}</td>
      <td>${formatarEmParagrafos(detalhes.refurbishedParts || "Nenhuma")}</td>
      <td>${detalhes.cost}</td>
    </tr>
  `;

  // Atualizar a tabela pequena
  tabelaPequenaBody.innerHTML = `
    <tr>
        <th>Data de Início</th>
      <td>${detalhes.start}</td>
    </tr>
    <tr>
      <th>Data de Término</th>
      <td>${detalhes.end}</td>
    </tr>
    <tr>
      <th>Serviços Realizados</th>
      <td>${formatarEmParagrafos(detalhes.services)}</td>
    </tr>
    <tr>
      <th>Peças Substituídas</th>
      <td>${formatarEmParagrafos(detalhes.replacedParts)}</td>
    </tr>
    <tr>
      <th>Peças Reformadas</th>
      <td>${formatarEmParagrafos(detalhes.refurbishedParts || "Nenhuma")}</td>
    </tr>
    <tr>
      <th>Custo Total</th>
      <td>${detalhes.cost}</td>
    </tr>
  `;

  // Foco na tabela
  let tabelaVisivel;
  if (window.innerWidth >= 768) {
    tabelaVisivel = document.querySelector('.d-none.d-md-table');
  } else {
    tabelaVisivel = document.querySelector('#small-table');
  }

  if (tabelaVisivel) {
    tabelaVisivel.classList.add('tabela-foco');
    tabelaVisivel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      tabelaVisivel.classList.remove('tabela-foco');
    }, 1000);
  }
}

// Eventos
// Carregar ordens de serviço ao selecionar um veículo
clienteDropdownMenu.addEventListener("click", (event) => {
  const target = event.target.closest("a");
  if (target) {
    const indexCliente = target.dataset.index;
    limparDetalhesOS();
    carregarOS(indexCliente);
  }
});

// Exibir detalhes da OS ao selecionar uma ordem de serviço
osDropdownMenu.addEventListener("click", (event) => {
  const target = event.target.closest("a");
  if (target) {
    const indexCliente = target.dataset.cliente;
    const indexOS = target.dataset.os;
    exibirDetalhesOS(indexCliente, indexOS);
  }
});

// Inicializar
carregarClientes();

// Adicionar destaque no item selecionado
function destacarItemSelecionado(elemento, menu) {
  [...menu.querySelectorAll(".dropdown-item")].forEach(item => item.classList.remove("selected-item"));
  elemento.classList.add("selected-item");
}

// Aplicar ao clicar nos dropdowns
clienteDropdownMenu.addEventListener("click", (event) => {
  const target = event.target.closest("a");
  if (target) {
    destacarItemSelecionado(target, clienteDropdownMenu);
    carregarOS(target.dataset.index);
  }
});

osDropdownMenu.addEventListener("click", (event) => {
  const target = event.target.closest("a");
  if (target) {
    destacarItemSelecionado(target, osDropdownMenu);
    exibirDetalhesOS(indexCliente, indexOS);
  }
});
  