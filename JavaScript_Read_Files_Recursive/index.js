const fs = require('fs').promises;
const path = require('path');

//Identifica pasta para leitura e chama o metodo de leitura.
async function readdir(rootDir) {
  rootDir = rootDir || path.resolve(__dirname);
  const files = await fs.readdir(rootDir);
  walk(files, rootDir);
}

//Percorre os arquivos e pastas, caso seja pasta aplica a recursividade.
async function walk(files, rootDir) {

  for(let file of files) {
    //Obtem o caminho absoluto do arquivo/pasta
    const fileFullPath = path.resolve(rootDir, file);
    //Retorna informações sobre o arquivo/pasta.
    const stats = await fs.stat(fileFullPath);

    //Elimina arquivos .git ou pasta node_modules;
    if (/\.git/g.test(fileFullPath)) continue;
    if (/node_modules/g.test(fileFullPath)) continue;

    //Se o alvo for um diretorio, utilizamos recursividade.
    if(stats.isDirectory()) {
      readdir(fileFullPath);
      continue;
    }

    //Elimina arquivos no formato .html
    if (
      !/\.html$/g.test(fileFullPath)
    ) continue;
    console.log(fileFullPath);
  }
}

//Le o diretorio informado.
readdir('/media/luizotavio/Externo/JS/');
