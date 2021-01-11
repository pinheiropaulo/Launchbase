//Desafio 1-1: Primeiros passos com JS

//Cálculo de IMC

// const nome = 'Paulo';
// const peso = 80;
// const altura = 1.75;

// const imc = peso / (altura * altura);

// let message = '';

// if (imc >= 30) {
//   message = `${nome} voce está acima do peso`;
// } else {
//   message = `${nome} voce não esta acima do peso`;
// }

// console.log(message);

//Cálculo de aposentadoria

// const nome = 'Paulo';
// const sexo = 'M';
// const idade = 30;
// const contribuicao = 10;

// const calculoContribuicao = idade + contribuicao;

// // essas variáveis irão retornar true ou false
// const homemPodeAposentar =
//   sexo == 'M' && contribuicao >= 35 && calculoContribuicao >= 95;
// const mulherPodeAposentar =
//   sexo == 'F' && contribuicao >= 30 && calculoContribuicao >= 85;

// if (homemPodeAposentar || mulherPodeAposentar) {
//   console.log(`${nome}, você pode se aposentar!`);
// } else {
//   console.log(`${nome}, você não pode se aposentar!`);
// }

//Desafio 1-2: Lidando com objetos e vetores

//Construção e impressão de objetos

// const empresa = {
//   nome: 'Rocketseat',
//   cor: 'Roxo',
//   foco: 'Programação',
//   endereco: {
//     rua: 'Rua Guilherme Gembala',
//     numero: 260,
//   },
// };

// console.log(
//   `A empresa ${empresa.nome} está localizada em ${empresa.endereco.rua}, ${empresa.endereco.numero}`
// );

//Vetores e objetos

// const programador = {
//   nome: 'Paulo',
//   idade: 24,
//   tecnologias: [
//     { nome: 'JavaScript', especialidade: 'Desktop' },
//     { nome: 'JavaScript', especialidade: 'Web/Mobile' },
//   ],
// };

// console.log(
//   `O usuário ${programador.nome} tem ${programador.idade} e usa a tecnologia ${programador.tecnologias[0].nome} com especialidade em ${programador.tecnologias[1].especialidade} `
// );

// Desafio 1-3: Funções e estruturas de repetição

//Usuários e tecnologias

// const usuarios = [
//   { nome: "Paulo", tecnologias: ["HTML", "CSS"] },
//   { nome: "Ricardo", tecnologias: ["JavaScript", "CSS"] },
//   { nome: "Augusto", tecnologias: ["HTML", "Node.js"] },
// ];

// for (let usuario of usuarios) {
//   console.log(`${usuario.nome} trabalha com ${usuario.tecnologias.join(', ')}`);
// }

//Busca por tecnologia

// function checaSeUsuarioUsaCSS(usuario) {
//   for (let tecnologia of usuario.tecnologias) {
//     if (tecnologia == "CSS") return true;
//   }

//   return false;
// }

// for (let i = 0; i < usuarios.length; i++) {
//   const usuarioTrabalhaComCSS = checaSeUsuarioUsaCSS(usuarios[i]);

//   if (usuarioTrabalhaComCSS) {
//     console.log(`O usuário ${usuarios[i].nome} trabalha com CSS`);
//   }
// }

// Soma de despesas e receitas
// const usuarios = [
//   {
//     nome: "Paulo",
//     receitas: [115.3, 48.7, 98.3, 14.5],
//     despesas: [85.3, 13.5, 19.9],
//   },
//   {
//     nome: "Ricardo",
//     receitas: [24.6, 214.3, 45.3],
//     despesas: [185.3, 12.1, 120.0],
//   },
//   {
//     nome: "Augusto",
//     receitas: [9.8, 120.3, 340.2, 45.3],
//     despesas: [450.2, 29.9],
//   },
// ];

// function calculaSaldo(receitas, despesas) {
//   const somaReceitas = somaNumeros(receitas);
//   const somaDespesas = somaNumeros(despesas);

//   return somaReceitas - somaDespesas;
// }
// function somaNumeros(numeros) {
//   let soma = 0;

//   for (let numero of numeros) {
//     soma = soma + numero;
//   }

//   return soma;
// }
// for (let usuario of usuarios) {
//   const saldo = calculaSaldo(usuario.receitas, usuario.despesas);

//   if (saldo > 0) {
//     console.log(
//       `${usuario.nome} possui o saldo POSITIVO de ${saldo.toFixed(2)}`
//     );
//   } else {
//     console.log(
//       `${usuario.nome} possui o saldo NEGATIVO de ${saldo.toFixed(2)}`
//     );
//   }
// }

// Desafio 1-4: Aplicação: Operações bancárias

const user = {
  name: "Paulo",
  transactions: [],
  balance: 0,
};

function createTransaction(transaction) {
  user.transactions.push(transaction);

  if (transaction.type === "credit") {
    user.balance = user.balance + transaction.value;
  } else {
    user.balance = user.balance - transaction.value;
  }
}

function getHigherTransactionByType(type) {
  let higherTransaction;
  let higherValue = 0;

  for (let transaction of user.transactions) {
    if (transaction.type == type && transaction.value > higherValue) {
      higherValue = transaction.value;
      higherTransaction = transaction;
    }
  }

  return higherTransaction;
}

function getAverageTransactionValue() {
  let sum = 0;

  for (let transaction of user.transactions) {
    sum += transaction.value;
  }

  return sum / user.transactions.length;
}

function getTransactionsCount() {
  let count = {
    credit: 0,
    debit: 0,
  };

  for (let transaction of user.transactions) {
    if (transaction.type === "credit") {
      count.credit++;
    } else {
      count.debit++;
    }
  }

  return count;
}

//

createTransaction({ type: "credit", value: 50 });
createTransaction({ type: "credit", value: 120 });
createTransaction({ type: "debit", value: 80 });
createTransaction({ type: "debit", value: 30 });

console.log(user.balance); // 60

console.log(getHigherTransactionByType("credit")); // { type: 'credit', value: 120 }
console.log(getHigherTransactionByType("debit")); // { type: 'debit', value: 80 }

console.log(getAverageTransactionValue()); // 70

console.log(getTransactionsCount()); // { credit: 2, debit: 2 }
