import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o Multer para lidar com uploads de arquivos
import cors from "cors"; // Importa o CORS para habilitar requisições de diferentes origens
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Importa as funções controladoras para lidar com a lógica dos posts

// Define as opções de CORS
const corsOptions = { 
  origin: "http://localhost:8000", // Permite requisições da origem especificada
  optionsSuccessStatus: 200 // Define o status de sucesso das opções CORS
}

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
  // Função que define o destino do arquivo
  destination: function (req, file, cb) { 
    cb(null, 'uploads/'); // Especifica o diretório para armazenar as imagens enviadas
  },

  // Função que define o nome do arquivo
  filename: function (req, file, cb) { 
    cb(null, file.originalname); // Mantém o nome original do arquivo
  }
});

// Cria uma instância do middleware Multer
const upload = multer({ storage: storage }); // Instancia o Multer com a configuração de armazenamento

// Define as rotas usando o objeto Express app
const routes = (app) => {
  app.use(express.json()); // Permite que o servidor interprete corpos de requisições no formato JSON
  app.use(cors(corsOptions)); // Aplica as configurações de CORS no app
  
  app.get("/posts", listarPosts); // Rota para recuperar uma lista de todos os posts

  app.post("/posts", postarNovoPost); // Rota para criar um novo post

  app.post("/upload", upload.single("imagem"), uploadImagem); // Rota para upload de uma imagem, chamada "imagem"

  app.put("/upload/:id", atualizarNovoPost); // Rota para atualizar um post com a imagem
};

export default routes; // Exporta as rotas definidas
