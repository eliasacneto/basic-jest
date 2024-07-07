const app = require("./app");

app.listen(7000, (err) => {
    if (err) console.error(err);
    console.log("Servidor rodando na porta 3000");
});
