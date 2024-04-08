// array
let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 1, 19, 23),
    dataCheckin: new Date(2024, 2, 1, 19, 23)
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 19, 23),
    dataCheckin: null
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 0, 10, 10, 10),
    dataCheckin: new Date(2024, 1, 15, 15, 15)
  },
  {
    nome: "João Oliveira",
    email: "joao@gmail.com",
    dataInscricao: new Date(2024, 0, 20, 20, 20),
    dataCheckin: new Date(2024, 1, 25, 12, 30)
  },
  {
    nome: "Maria Silva",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 1, 5, 12, 30),
    dataCheckin:null
  },
  {
    nome: "Pedro Santos",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 0, 15, 15, 15),
    dataCheckin: new Date(2024, 2, 20, 20, 20)
  },
  {
    nome: "Carlos Martins",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 0, 25, 10, 10),
    dataCheckin: null
  },
  {
    nome: "Rafael Silva",
    email: "rafael@gmail.com",
    dataInscricao: new Date(2024, 1, 10, 8, 0),
    dataCheckin: new Date(2024, 2, 5, 18, 30)
  },
  {
    nome: "Juliana Santos",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 1, 20, 18, 0),
    dataCheckin: new Date(2024, 2, 15, 14, 45)
  },
  {
    nome: "Lucas Oliveira",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 0, 5, 16, 45),
    dataCheckin: new Date(2024, 2, 25, 8, 0)
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckin = dayjs(Date.now()).to(participante.dataCheckin)

// condicional
  if(participante.dataCheckin == null) {
    dataCheckin = `
    <button
    data-email="${participante.email}"
    onclick="fazerCheckin(event)"
    >
      Confirmar check-in
    </button>
    `
  }

  return `
  <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao} </td>
      <td>${dataCheckin}</td>
    </tr>
  ` 
}


const atualizarLista = (participantes) => {
  output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informacao do HTML
  document.querySelector('tbody').innerHTML = output
} 

atualizarLista(participantes)


const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckin: null
  }

  // verificar se o participante ja existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email ja cadastrado!')
    return
  }


participantes = [participante, ...participantes]
atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckin = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }


  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => p.email == event.target.dataset.email
  )
  // atualizar o check-in do participante 
  participante.dataCheckin = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}