import fs from "fs"; // Importa o módulo fs (file system) para manipulação de arquivos
import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js"; // Importa funções do modelo para manipulação dos posts
import gerarDescricaoComGemini from "../services/geminiService.js" // Importa o serviço Gemini para gerar descrições de imagens

export async function listarPosts(req, res) { 
    const posts = await getTodosPosts(); // Chama a função para buscar os posts no banco de dados
    res.status(200).json(posts); // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
}

export async function postarNovoPost(req, res) { 
    const novoPost = req.body; // Extrai o novo post do corpo da requisição
    try {
        const postCriado = await criarPost(novoPost); // Cria o novo post no banco de dados
        res.status(200).json(postCriado);  // Envia uma resposta com status 200 e o post criado
    } catch(erro) {
        console.error(erro.message); // Exibe o erro no console
        res.status(500).json({"Erro":"Falha na requisição"}); // Envia um erro 500 (interno do servidor) caso ocorra um problema
    }
}

export async function uploadImagem(req, res) { 
    const novoPost = {
        descricao: "", // A descrição é inicializada como uma string vazia
        imgUrl: req.file.originalname, // Obtém o nome original do arquivo de imagem enviado
        alt: "" // O texto alternativo também é inicializado como uma string vazia
    };

    try {
        const postCriado = await criarPost(novoPost); // Cria um novo post no banco de dados
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`; // Define o caminho da nova imagem
        fs.renameSync(req.file.path, imagemAtualizada); // Renomeia a imagem para o novo caminho
        res.status(200).json(postCriado);  // Envia uma resposta com o post criado
    } catch(erro) {
        console.error(erro.message); // Exibe o erro no console
        res.status(500).json({"Erro":"Falha na requisição"}); // Envia um erro 500 caso algo falhe
    }
}

export async function atualizarNovoPost(req, res) { 
    const id = req.params.id; // Extrai o ID do post a ser atualizado da URL
    const urlImagem = `http://localhost:3000/${id}.png`; // Cria a URL da imagem com base no ID

    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`); // Lê a imagem do disco
        const descricao = await gerarDescricaoComGemini(imgBuffer); // Gera uma descrição para a imagem usando o serviço Gemini

        const post = {
            imgUrl: urlImagem, // Atualiza o campo de URL da imagem
            descricao: descricao, // Atualiza a descrição da imagem
            alt: req.body.alt // Atualiza o texto alternativo da imagem
        }

        const postCriado = await atualizarPost(id, post); // Atualiza o post no banco de dados
        res.status(200).json(postCriado);  // Envia uma resposta com o post atualizado
    } catch(erro) {
        console.error(erro.message); // Exibe o erro no console
        res.status(500).json({"Erro":"Falha na requisição"}); // Envia um erro 500 se ocorrer uma falha
    }
}
