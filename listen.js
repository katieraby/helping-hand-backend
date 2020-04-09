const { PORT = 8080 } = process.env;
const { app } = require('../helping-hand-backend/app');

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
