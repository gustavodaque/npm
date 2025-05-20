const express = require('express');
const fs = require('fs');

const PORTA = 8000
//inicializar o servidor
const server = express();
server.use(express.json()); //para o servidor entender o formato json

//criar uma rota simples
server.options('/', (req, res) => {
    res.status(200).json({msg: "tudo ok"})
});

server.get('/tarefas', (req, res) => { 
        fs.readFile('./banco.json','utf-8', (err, data) => {
           if(err){
            res.status(500).json({erro:err});
           }
           res.status(200).json(JSON.parse(data));
        })
    
    })

    //listar UMA tarefa especifica, caso nao existir, retornar 404
   server.get('/tarefas/:id', (req, res) => {
     const tarefa_id = req.params.id;   
     res.send('ok')
     //ler o arquivo banco.json
     fs.readFile('./banco.json', 'utf-8', (err, data) => {
    if (err) {
         res.status(500).json({ erro: err });
    }
    // procurar pela tarefa com o id informado
        const lista_de_tarefas = JSON.parse(data);
        const tarefa = lista_de_tarefas.find((item) => item.id === tarefa_id);
        res.send('ok')
     // retornar 404 caso nao ache
     if (!tarefa) {
         cod_err = 404;
            msg = 'tarefa não encontrada';
     } 
     res.status(cod_err).json({msg: msg});
       
     
     // retornar 200 e os dados da tarefa caso ache
});
})
 

//criar uma tarefa
server.post('/tarefas', (req, res) => {
    const {titulo, descricao, dificuldade, user_id} = req.body;
    fs.readFile('./banco.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ erro: err });
        }
        const lista_de_tarefas = JSON.parse(data);
        lista_de_tarefas.push({
            id: Date.now(), 
            titulo: titulo,
            descricao: descricao,
            dificuldade: dificuldade,
            user_id: user_id
        })
        fs.writeFile('./banco.json', JSON.stringify(lista_de_tarefas), (err) => {
            if (err) {
                return res.status(500).json({ msg: err });
            }
            res.status(200).json(JSON.parse(data));
        })




//pegar as informa~oes da nova tarefa, do body da requisição
//lendo meu arquivo(readFile)
//inserir a nova tarefa, no arquivo
//salvar o arquivo(writeFile, appendFile)
    
    // Verifica se todos os campos obrigatórios foram preenchidos
    
    // Ler o arquivo banco.json

        // Parsear o conteúdo do arquivo
        const listaDeTarefas = JSON.parse(data);

        // Adicionar a nova tarefa à lista
        listaDeTarefas.push(novaTarefa);

        // Salvar a lista atualizada no arquivo
        fs.writeFile('./banco.json', JSON.stringify(listaDeTarefas, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ erro: err });
            }

            // Retornar a nova tarefa criada
            res.status(201).json(novaTarefa);
        });
    });
});




//atualizar uma tarefa
//deletar uma tarefa
//criar uma CRUD em um arquivo json utilizando Restful






// mandar o servidor ouvir na porta 8000
server.listen(PORTA, () => {
    console.log('Servidor rodando na porta 8000');
});