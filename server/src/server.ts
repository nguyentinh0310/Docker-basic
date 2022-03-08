import 'dotenv/config';
import { IndexRoute } from '@modules/index';
import App from './app';
import { validateEnv } from '@core/utils';
import UsersRoute from '@modules/users/users.route';
import AuthRoute from '@modules/auth/auth.route';

validateEnv();
const routes = [new IndexRoute(), new UsersRoute(), new AuthRoute()];

const app = new App(routes);

app.listen();