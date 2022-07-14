const express = require('express');
const errorHandlerMiddleware = require('./middleware/error-handler-middleware');
const { loginRoute, userRoutes } = require('./routes');

const app = express();

app.use(express.json());

app.use('/login', loginRoute);
app.use('/user', userRoutes);

app.use(errorHandlerMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;