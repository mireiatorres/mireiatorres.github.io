// Simulação de Banco de Dados usando o Local Storage
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
              cost: "5000.00",
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
              cost: "450.00",
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
              cost: "900.00",
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
              cost: "350.00",
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
              cost: "300.00",
            },
          ],
        },
      ],
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
              cost: "250.00",
            },
          ],
        },
      ],
    },
  ];
  localStorage.setItem("serviceData", JSON.stringify(data));
}

// Recuperar dados do Local Storage
let data = JSON.parse(localStorage.getItem("serviceData"));

// Elementos DOM
const clientSelect = document.getElementById("clientSelect");
const osListContainer = document.getElementById("osListContainer");
const osList = document.getElementById("osList");
const osForm = document.getElementById("osForm");
const formTitle = document.getElementById("formTitle");
const osNumber = document.getElementById("osNumber");
const osDescription = document.getElementById("osDescription");
const osStartDate = document.getElementById("osStartDate");
const osEndDate = document.getElementById("osEndDate");
const osServices = document.getElementById("osServices");
const osReplacedParts = document.getElementById("osReplacedParts");
const osRefurbishedParts = document.getElementById("osRefurbishedParts");
const osCost = document.getElementById("osCost");
const saveOSButton = document.getElementById("saveOSButton");
const deleteOSButton = document.getElementById("deleteOSButton");
const cancelButton = document.getElementById("cancelButton");
const addOSButton = document.getElementById("addOSButton");
const editOSButton = document.getElementById("editOSButton");

// Variáveis de controle
let currentClientIndex = null;
let currentOSIndex = null;

// Função carregar lista de clientes
function carregarClientes() {

  osForm.classList.add("d-none");

  clientSelect.innerHTML = "<option>Selecione o cliente</option>";
  data.forEach((cliente, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = cliente.client;
    clientSelect.appendChild(option);
  });
}

// Função para ajustar dinamicamente datas no formato DD/MM/YYYY para YYYY-MM-DD
function ajustarDataParaInput(dataOriginal) {
  if (!dataOriginal) return "";
  const [dia, mes, ano] = dataOriginal.split("/");
  return `${ano}-${mes}-${dia}`;
}

function ajustarDataParaExibicao(dataOriginal) {
  if (!dataOriginal) return "";
  const [ano, mes, dia] = dataOriginal.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Função carregar OSs de um cliente
function carregarOSs(clientIndex) {
  osForm.classList.add("d-none");
  osList.innerHTML = "";
  osListContainer.classList.remove("d-none");

  const cliente = data[clientIndex];
  if (!cliente.os.length) {
    osList.innerHTML = '<li class="list-group-item">Cliente não possui OS cadastrada</li>';
    return;
  }

  cliente.os.forEach((os, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = `Código: ${os.code} - ${os.description} - Data: ${os.date}`;
    li.addEventListener("click", () => carregarFormularioOS(clientIndex, index));
    osList.appendChild(li);
  });
}

// Função carregar formulário com OS selecionada
function carregarFormularioOS(clientIndex, osIndex) {
  currentClientIndex = clientIndex;
  currentOSIndex = osIndex;

  const os = data[clientIndex].os[osIndex];

  osNumber.value = os.code;
  osDescription.value = os.description;
  osStartDate.value = ajustarDataParaInput(os.details[0].start);
  osEndDate.value = ajustarDataParaInput(os.details[0].end);
  osServices.value = os.details[0].services;
  osReplacedParts.value = os.details[0].replacedParts;
  osRefurbishedParts.value = os.details[0].refurbishedParts;
  osCost.value = os.details[0].cost;

  habilitarFormulario(false);
  osForm.classList.remove("d-none");
  saveOSButton.classList.add("d-none");
  editOSButton.classList.remove("d-none");
  formTitle.textContent = "Detalhamento da OS";

  deleteOSButton.classList.remove("d-none");

  addOSButton.classList.add("d-none");
}

// Função cadastrar nova OS
function cadastrarNovaOS() {
  currentOSIndex = null;
  currentClientIndex = clientSelect.value;

  if (currentClientIndex === "Selecione o cliente" || currentClientIndex === "") {
    alert("Por favor, selecione um cliente antes de cadastrar uma nova OS.");
    return;
  }

  osNumber.value = "";
  osDescription.value = "";
  osStartDate.value = "";
  osEndDate.value = "";
  osServices.value = "";
  osReplacedParts.value = "";
  osRefurbishedParts.value = "";
  osCost.value = "";

  // Habilitar campos e configurar visibilidade dos botões
  habilitarFormulario(true);
  formTitle.textContent = "Cadastrar Nova OS";
  osForm.classList.remove("d-none");
  saveOSButton.classList.remove("d-none");
  editOSButton.classList.add("d-none");

  deleteOSButton.classList.add("d-none");

  addOSButton.classList.add("d-none");
}

// Função habilitar ou desabilitar o formulário
function habilitarFormulario(editable) {
  [osNumber, osDescription, osStartDate, osEndDate, osServices, osReplacedParts, osRefurbishedParts, osCost].forEach(input => {
    input.disabled = !editable;

    // Controle do placeholder apenas em modo de exibição
    if (!editable) {
      if (!input.value.trim()) {
        input.classList.add("no-placeholder");
      } else {
        input.classList.remove("no-placeholder");
      }
    } else {
      input.classList.remove("no-placeholder");
    }
  });
}

// Função salvar alterações ou adicionar nova OS
function salvarOS() {

  // Verificar se os campos obrigatórios estão preenchidos
  if (
    !osNumber.value.trim() ||
    !osDescription.value.trim() ||
    !osStartDate.value.trim() ||
    !osEndDate.value.trim() ||
    !osServices.value.trim() ||
    !osCost.value.trim()
  ) {
    alert("Por favor, preencha todos os campos obrigatórios: Código, Descrição, Datas, Serviços Realizados e Custo.");
    return;
  }

  const novaOS = {
    code: osNumber.value,
    date: ajustarDataParaExibicao(osStartDate.value),
    description: osDescription.value,
    details: [
      {
        start: ajustarDataParaExibicao(osStartDate.value),
        end: ajustarDataParaExibicao(osEndDate.value),
        services: osServices.value,
        replacedParts: osReplacedParts.value,
        refurbishedParts: osRefurbishedParts.value,
        cost: osCost.value,
      },
    ],
  };

  if (currentOSIndex !== null) {
    data[currentClientIndex].os[currentOSIndex] = novaOS;
  } else {
    data[currentClientIndex].os.push(novaOS);
  }

  localStorage.setItem("serviceData", JSON.stringify(data));
  carregarOSs(currentClientIndex);
  osForm.classList.add("d-none");

  addOSButton.classList.remove("d-none");

  deleteOSButton.classList.remove("d-none");

  alert("OS salva com sucesso!");
}

// Função Excluir OS
function excluirOS() {
  if (currentOSIndex !== null) {
    const confirmarExclusao = confirm("Tem certeza de que deseja excluir esta OS?");
    if (confirmarExclusao) {
      data[currentClientIndex].os.splice(currentOSIndex, 1);
      localStorage.setItem("serviceData", JSON.stringify(data));
      carregarOSs(currentClientIndex);
      osForm.classList.add("d-none");
      addOSButton.classList.remove("d-none");
    }
  }
}

// Listeners
clientSelect.addEventListener("change", () => {
  const clientIndex = clientSelect.value;

  osForm.classList.add("d-none");
  osList.innerHTML = "";

  if (clientIndex !== "Selecione o cliente" && clientIndex !== "") {
    addOSButton.classList.remove("d-none");
    carregarOSs(clientIndex);
  } else {
    addOSButton.classList.add("d-none");
    osListContainer.classList.add("d-none");
  }
});

addOSButton.addEventListener("click", cadastrarNovaOS);

editOSButton.addEventListener("click", () => {
  if (currentOSIndex !== null && currentClientIndex !== null) {
    habilitarFormulario(true);
    saveOSButton.classList.remove("d-none");
    editOSButton.classList.add("d-none");
  }
});

saveOSButton.addEventListener("click", salvarOS);
deleteOSButton.addEventListener("click", excluirOS);
cancelButton.addEventListener("click", () => {
  osForm.classList.add("d-none");
  addOSButton.classList.remove("d-none");
});

// Inicializar
carregarClientes();