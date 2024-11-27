import { GoogleGenerativeAI } from "@google/generative-ai"; // Importa a classe GoogleGenerativeAI para usar a API Gemini

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Cria uma instância do GoogleGenerativeAI com a chave da API fornecida
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Obtém o modelo de IA generativa específico do Gemini

export default async function gerarDescricaoComGemini(imageBuffer) { 
  const prompt = "Gere uma breve descrição em português do brasil para a seguinte imagem e não cite o que está retornando"; // Define o prompt que será enviado para o modelo gerar a descrição

  try {
    const image = { 
      inlineData: { 
        data: imageBuffer.toString("base64"), // Converte o buffer da imagem para base64
        mimeType: "image/png", // Define o tipo MIME da imagem
      },
    };

    const res = await model.generateContent([prompt, image]); // Chama o método de geração de conteúdo com o prompt e a imagem
    return res.response.text() || "Alt-text não disponível."; // Retorna o texto gerado ou uma mensagem padrão caso não tenha sido gerado texto

  } catch (erro) {
    console.error("Erro ao obter alt-text:", erro.message, erro); // Exibe um erro no console caso algo falhe
    throw new Error("Erro ao obter o alt-text do Gemini."); // Lança um erro para indicar falha na obtenção da descrição
  }
}
