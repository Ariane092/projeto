import fs from 'fs';
import knex from 'knex';

const db = knex({
  client: 'pg', 
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'efk89',
    database: 'postgres',
  },
});

const diretorio = './txtagestado/Arquivos';
const listaAno = fs.readdirSync(diretorio);
const dadosTodosArquivos = [];

function removeNullBytes(input) {
  return input.toString().replace(/\0/g, ''); //função para remover bytes nulos, pois o postgres não aceita bytes nulos "\0" na entrada de dados//
}

listaAno.forEach((ano) => {
  const caminhoArquivo = fs.readdirSync(`${diretorio}/${ano}`);
  caminhoArquivo.forEach((arquivo) => {
    const dadosArquivo = fs.statSync(`${diretorio}/${ano}/${arquivo}`);
    const conteudo = fs.readFileSync(`${diretorio}/${ano}/${arquivo}`, { encoding: 'binary' });
    const conteudoArquivo = removeNullBytes(conteudo);

    let produto = arquivo.split('_')[0];
    if (produto === 'diario') {
      produto = 'diario cafe';
    }

    const titulo = conteudoArquivo.split('\n')[0];
    
    dadosTodosArquivos.push({
      data: dadosArquivo.birthtime,
      nomeArquivo: arquivo,
      produto: produto,
      conteudoArquivo: removeNullBytes(conteudo),
      titulo: titulo
    });
  });
});

db('dadosfernando')
  .insert(dadosTodosArquivos)
  .then(() => {
    console.log('Dados inseridos com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao inserir dados no banco de dados:', error);
  });
