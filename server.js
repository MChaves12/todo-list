const app = require('./app.js');

//Port Configs
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server on port: ${PORT}`));