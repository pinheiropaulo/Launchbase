const fs = require("fs");

const { age, date } = require("../utils");

const data = require("../data.json");

exports.index = (req, res) => {
  return res.render("instructors/index", { instructors: data.instructors });
};

exports.create = (req, res) => {
  return res.render("instructors/create");
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

    return res.redirect(`/instructors/${id}`);
  });
};

exports.show = (req, res) => {
  const { id } = req.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return id == instructor.id;
  });

  if (!foundInstructor) return res.send("Instructor Not Found");

  const verifyGender = () => {
    if (foundInstructor.gender == "M") {
      return "Masculino";
    } else {
      return "Feminino";
    }
  };

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(
      foundInstructor.created_at
    ),
    gender: verifyGender(),
  };

  return res.render("instructors/show", { instructor });
};

exports.edit = (req, res) => {
  const { id } = req.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return id == instructor.id;
  });

  if (!foundInstructor) return res.send("Instructor Not Found");

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth).iso,
  };

  return res.render("instructors/edit", { instructor });
};

exports.put = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundInstructor = data.instructors.find((instructor, foundIndex) => {
    if (id == instructor.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundInstructor) return res.send("Instructor Not Found");

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };

  data.instructors[index] = instructor;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Erro");

    return res.redirect(`/instructors/${id}`);
  });
};

exports.delete = (req, res) => {
  const { id } = req.body;

  const foundInstructor = data.instructors.filter((instructor) => {
    return instructor.id != id;
  });

  data.instructors = foundInstructor;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Erro");

    return res.redirect("/instructors");
  });
};
