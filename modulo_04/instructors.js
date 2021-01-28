const fs = require("fs");

const { age, date } = require("./utils");

const data = require("./data.json");

exports.show = (req, res) => {
  const { id } = req.params;

  const foundInstruction = data.instructors.find((instructor) => {
    return id == instructor.id;
  });

  if (!foundInstruction) return res.send("Instructor Not Found");

  const verifyGender = () => {
    if (foundInstruction.gender == "M") {
      return "Masculino";
    } else {
      return "Feminino";
    }
  };

  const instructor = {
    ...foundInstruction,
    age: age(foundInstruction.birth),
    services: foundInstruction.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(
      foundInstruction.created_at
    ),
    gender: verifyGender(),
  };

  return res.render("instructors/show", { instructor });
};

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por Favor preencha todos os campos ");
    }
  }

  let { avatar_url, name, birth, gender, services } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length + 1);

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Erro");

    return res.redirect("/instructors");
  });
};

exports.edit = (req, res) => {
  const { id } = req.params;

  const foundInstruction = data.instructors.find((instructor) => {
    return id == instructor.id;
  });

  if (!foundInstruction) return res.send("Instructor Not Found");

  const instructor = {
    ...foundInstruction,
    birth: date(foundInstruction.birth),
  };

  return res.render("instructors/edit", { instructor });
};
