import { createObjectCsvWriter } from 'csv-writer';
import fs from 'fs';

let diretorio = './txtagestado/Arquivos';
let listaAno = fs.readdirSync(diretorio);
let dadosTodosArquivos = [];

listaAno.forEach(ano => {
  let caminhoArquivo = fs.readdirSync(`${diretorio}/${ano}`);
  caminhoArquivo.forEach(arquivo => {
    let dadosArquivo = fs.statSync(`${diretorio}/${ano}/${arquivo}`);   
    let conteudoArquivo = fs.readFileSync(`${diretorio}/${ano}/${arquivo}`, { encoding: 'binary' });
    let conteudoArquivoLinha = conteudoArquivo.replace(/(\r\n|\r|\n)/g, ''); 
    let produto = arquivo.split('_');
    produto = produto[0];

    if (produto == 'diario') {
      produto = 'diario cafe';
    }
                
    let titulo = conteudoArquivo.split('\n');
    titulo = titulo[0];

    dadosTodosArquivos.push({
      data: dadosArquivo.birthtime,
      nomeArquivo: arquivo,
      produto: produto,
      conteudoArquivo: conteudoArquivoLinha,
      titulo: titulo
    });    
  });
});

const header = [
  { id: 'data', title: 'Data' },
  { id: 'nomeArquivo', title: 'Nome do Arquivo' },
  { id: 'produto', title: 'Produto' },
  { id: 'conteudoArquivo', title: 'Conteúdo' },
  { id: 'titulo', title: 'Título' }
];

const csvWriter = createObjectCsvWriter({
  path: 'arquivo.csv',
  header,
  fieldDelimiter: ';',
  encoding: 'binary'
});

csvWriter.writeRecords(dadosTodosArquivos)
.then(() => {
  console.log('Arquivo CSV gerado com sucesso!');
})
.catch((err) => {
  console.error('Erro ao escrever o arquivo CSV:', err);
});  
