import App from './app';
import AuthRoute from './routes/auth.route';
import PostRoute from './routes/post.route';

const postRoute = new PostRoute();
const authRoute = new AuthRoute();

const routes = [postRoute, authRoute]

const app = new App(routes);

app.listen();
