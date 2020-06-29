const express = require('express');

const server = express();

server.use(express.json());

const notes = [];

function verifyData(req,res,next){

    const{title,date,hour,content} = req.body;

    if(!title){
        return res.json({
            error:'Título é obrigatório!'
        });
    } else if(!date){
        return res.json({
            error: 'Data é obrigatório!'
        });
    }else if(!hour){
        return res.json({
            error: 'Horário é obrigatório!'
        });
    }else if(!content){
        return res.json({
            error: 'Conteúdo é obrigatório!'
        });
    }

    next();

}




server.get('/',(req,res)=>{
    return res.json({
        result:'Bem-vindo a página de registro de notas!'
    });
});



server.post('/notes',(req,res)=>{
    const {title,date,hour,content} = req.body;
    const note = {
        title, 
        date, 
        hour, 
        content,
    } 

    const {id} = req.params;

    notes.push(note);

    return res.json({note});
});

    server.get('/notes',(req,res)=>{
        
        return res.json({notes});
});

    
    server.put('/notes/:id',verifyData,(req,res)=>{
        const {title,date,hour,content} = req.body;
        const {id} = req.params;

        const note = {
            title, 
            date, 
            hour, 
            content,
        }

        notes[id] = note;

        return res.json({
            result:'Nota atualizada com sucesso!',
            note: note
        })
    });

    server.get('/notes/:id', (req,res)=> {
        const {id} = req.params;
    
        return res.json({
            result:'Nota encontrada com sucesso!',
            note: notes[id]
        });
    });

    server.delete('/notes/:id',(req,res)=>{
        const {id} = req.params;
        notes.splice(id,1);
        return res.json({
            result:'Nota deletada com sucesso!'
        });
    });


    server.listen(3000);