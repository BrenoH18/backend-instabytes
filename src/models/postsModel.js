import 'dotenv/config'; // Carrega as variáveis de ambiente do arquivo .env
import { ObjectId } from "mongodb"; // Importa a classe ObjectId do MongoDB para trabalhar com IDs de objetos
import conectarAoBanco from "../config/dbConfig.js" // Importa a função para conectar ao banco de dados

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() { 
    const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados "imersao-instabytes" 
    const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados
    return colecao.find().toArray(); // Retorna um array com todos os documentos da coleção
}

// Função assíncrona para inserir um novo post no banco de dados
export async function criarPost(novoPost) { 
    const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados "imersao-instabytes"
    const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados
    return colecao.insertOne(novoPost); // Insere um novo post na coleção e retorna o resultado da operação
}

// Função assíncrona para atualizar o novo post do banco de dados
export async function atualizarPost(id, novoPost) { 
    const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados "imersao-instabytes"
    const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados
    const objID = ObjectId.createFromHexString(id); // Converte o ID do post para o tipo ObjectId do MongoDB
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost}); // Atualiza o post com o novo conteúdo utilizando o ID
}
