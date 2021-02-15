const fs = require("fs");

const { date } = require("../utils");

const data = require("../data.json");

exports.index = (req, res) => {
  return res.render("members/index", { members: data.members });
};

exports.create = (req, res) => {
  return res.render("members/create");
};

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por Favor preencha todos os campos ");
    }
  }

  birth = Date.parse(req.body.birth);

  let id = 1;
  const lastMember = data.members[data.members.length - 1];

  if (lastMember) {
    id = lastMember.id + 1;
  }

  data.members.push({
    id,
    ...req.body,
    birth,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Erro");

    return res.redirect(`/members/${id}`);
  });
};

exports.show = (req, res) => {
  const { id } = req.params;

  const foundInstruction = data.members.find((member) => {
    return id == member.id;
  });

  if (!foundInstruction) return res.send("Member Not Found");

  const verifyGender = () => {
    if (foundInstruction.gender == "M") {
      return "Masculino";
    } else {
      return "Feminino";
    }
  };

  const member = {
    ...foundInstruction,
    birth: date(foundInstruction.birth).birthDay,
    gender: verifyGender(),
  };

  return res.render("members/show", { member });
};

exports.edit = (req, res) => {
  const { id } = req.params;

  const foundMember = data.members.find((member) => {
    return id == member.id;
  });

  if (!foundMember) return res.send("Member Not Found");

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).iso,
  };

  return res.render("members/edit", { member });
};

exports.put = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundMember = data.members.find((member, foundIndex) => {
    if (id == member.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundMember) return res.send("Member Not Found");

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };

  data.members[index] = member;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Erro");

    return res.redirect(`/members/${id}`);
  });
};

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredMembers = data.members.filter((member) => {
    return member.id != id;
  });

  data.members = filteredMembers;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Erro");

    return res.redirect("/members");
  });
};
