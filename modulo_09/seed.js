const { faker } = require('@faker-js/faker');
const { hash } = require('bcryptjs');
const UserModel = require('./src/app/models/UserModel');
const ProductModel = require('./src/app/models/ProductModel');
const FileModel = require('./src/app/models/FileModel');

let usersIds = [];
let totalUsers = 3;
let totalProducts = 10;

async function createUsers() {
  const users = [];
  const password = await hash('1234', 8);

  while (users.length < totalUsers) {
    users.push({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password,
      cpf_cnpj: faker.random.numeric(999),
      cep: faker.random.numeric(999),
      address: faker.address.streetAddress(),
    });
  }

  const userPromises = users.map((user) => {
    UserModel.create(user);
  });

  usersIds = await Promise.all(userPromises);
}

async function createProducts() {
  let products = [];

  while (products.length < totalProducts) {
    products.push({
      category_id: Math.ceil(Math.random() * 3),
      user_id: usersIds[Math.floor(Math.random() * totalUsers)],
      name: faker.name.findName(),
      description: faker.lorem.paragraph(Math.ceil(Math.random() * 10)),
      old_price: faker.random.numeric(999),
      price: faker.random.numeric(999),
      quantity: faker.random.numeric(999),
      status: Math.round(Math.random()),
    });
  }

  const productsPromise = products.map((product) =>
    ProductModel.create(product),
  );

  productsIds = await Promise.all(productsPromise);

  let files = [];

  while (files.length < 10) {
    files.push({
      name: faker.image.imageUrl(),
      path: `public/images/placeholder.png`,
      product_id: productsIds[Math.floor(Math.random() * totalProducts)],
    });
  }

  const filesPromise = files.map((file) => FileModel.create(file));

  await Promise.all(filesPromise);
}

async function init() {
  await createUsers();
  await createProducts();
}

init();
