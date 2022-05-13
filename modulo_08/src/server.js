import 'dotenv/config';
import express from 'express';
import methodOverride from 'method-override';
import nunjucks from 'nunjucks';
import session from './config/session';
import { routes } from './routes';

const server = express();
const port = process.env.PORT || 8080;

server.use(session);
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));
server.use(methodOverride('_method'));

server.use(routes);

server.set('view engine', 'njk');

nunjucks.configure('src/app/views', {
  express: server,
  autoescape: false,
  noCache: true,
});

server.listen(port, () => {
  console.log(`Server is running http://localhost:${port}`);
});
