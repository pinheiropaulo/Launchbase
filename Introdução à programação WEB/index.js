const classA = [
  {
    name: 'Paulo',
    grade: 10,
  },
  {
    name: 'Ricardo',
    grade: 9,
  },
  {
    name: 'Augusto',
    grade: 8,
  },
];

const classB = [
  {
    name: 'Pinheiro',
    grade: 10,
  },
  {
    name: 'Vera',
    grade: 10,
  },
  {
    name: 'Alice',
    grade: 10,
  },
];

const calculateAverage = (students) => {
  let sum = 0;

  for (let i = 0; i < students.length; i++) {
    sum = sum + students[i].grade;
  }

  const avegage = sum / students.length;

  return avegage;
};

const sendMessage = (avegage, turma) => {
  if (avegage > 5) {
    console.log(`A media da ${turma} foi de ${avegage}. Parabéns`);
  } else {
    console.log(`A media da ${turma} é menor que 5`);
  }
};

const markAsFlunked = (student) => {
  student.flunked = false;
  if (student.grade < 5) {
    student.flunked = true;
  }
};

const sendFlunkedMessage = (student) => {
  if (student.flunked) {
    console.log(`o Aluno ${student.name} esta reprovado!`);
  }
};

const studentsReprovados = (students) => {
  for (let student of students) {
    markAsFlunked(student);
    sendFlunkedMessage(student);
  }
};

const avegage1 = calculateAverage(classA);
const avegage2 = calculateAverage(classB);

sendMessage(avegage1, 'Turma A');
sendMessage(avegage2, 'Turma B');

studentsReprovados(classA);
studentsReprovados(classB);
