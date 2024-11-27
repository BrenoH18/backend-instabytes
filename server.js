// Importa o módulo express para criar o servidor web
import express from "express";
// Importa as rotas definidas no arquivo postsRoutes.js
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância do aplicativo express
const app = express();

// Define um diretório estático "uploads" para que arquivos estáticos (como imagens ou documentos) possam ser acessados via URL
app.use(express.static("uploads"))

// Chama a função routes passando o aplicativo express, para que as rotas sejam configuradas
routes(app)

// Inicia o servidor na porta 3000 e exibe uma mensagem no console para indicar que o servidor está ativo
app.listen(3000, () => {
    console.log("Servidor escutando...");
});
