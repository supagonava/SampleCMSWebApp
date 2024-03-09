import App from './src/app';
import AuthRoute from './src/routes/auth.route';
import PostRoute from './src/routes/post.route';

const postRoute = new PostRoute();
const authRoute = new AuthRoute();

const routes = [postRoute, authRoute]

const app = new App(routes);

app.listen();
