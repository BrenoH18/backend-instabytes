import { MongoClient } from 'mongodb'; // Importa a classe MongoClient do MongoDB

export default async function conectarAoBanco(stringConexao) { 
  let mongoClient;

  try {
      mongoClient = new MongoClient(stringConexao); // Cria uma instância do MongoClient com a string de conexão fornecida
      console.log('Conectando ao cluster do banco de dados...'); // Exibe uma mensagem no console informando que a conexão está sendo realizada
      await mongoClient.connect(); // Conecta ao banco de dados de forma assíncrona
      console.log('Conectado ao MongoDB Atlas com sucesso!'); // Exibe uma mensagem de sucesso no console

      return mongoClient; // Retorna o cliente conectado para que possa ser usado em outras partes da aplicação
  } catch (erro) {
      console.error('Falha na conexão com o banco!', erro); // Exibe uma mensagem de erro no console caso a conexão falhe
      process.exit(); // Encerra o processo em caso de falha na conexão
  }
}
