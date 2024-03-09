import App from './src/app';
import PostRoute from './src/routes/post.route';

const postRoute = new PostRoute();
const app = new App([postRoute]);

app.listen();
