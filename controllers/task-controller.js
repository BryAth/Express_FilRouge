const Task = require ('../models/task-model')

const taskController  = {
    getAll : async(req,res) => {
    const tasks = await Task.find()
    .populate({
        path : 'categoryId',
        select : { name : 1 , icon : 1 }
    })
    .populate({
        path : 'senderUserId',
        select : {firstname : 1 , lastname : 1,pseudo : 1 }
    })
    .populate({
        path : 'receiver',
        select : {firstname : 1,lastname : 1,pseudo : 1 }
    })
    res.status(200).json(tasks); //!Status > envoie du json 
    
    },
    
    getById : async(req,res) => {
        const id =  req.params.id;
        const task = await Task.findById(id)
        .populate({
        path : 'categoryId',
        select : { name : 1 , icon : 1 }
    })
    .populate({
        path : 'senderUserId',
        select : {firstname : 1 , lastname : 1,pseudo : 1 }
    })
    .populate({
        path : 'receiver',
        select : {firstname : 1,lastname : 1,pseudo : 1 }
    })

    if(!task){
     return   res.sendStatus(404); //Not found
    }
    res.status(200).json(task)
    },
    
    getByCategory : () => {},
    
    getByUser : () => {},
    
    
    //Création
    create : async(req,res) => {
        const taskToAdd = Task(req.body);
        await taskToAdd.save();
        res.status(200).json(taskToAdd);
    },
    
    
    //Modification 
    update : async(req,res) => {
        const id = req.params.id
        
        const { name,description,categoryId,receiver,status,expectedEndingDate} = req.body;
        const taskUpdated = await Task.findByIdAndUpdate(id,{
            name,
            categoryId,
            receiver,
            status,
            description: description ? description : undefined,
            expectedEndingDate : expectedEndingDate ? expectedEndingDate : undefined 
        }, {returnDocument : 'after'});
            if(!taskUpdated){
            return res.sendStatus(404); //Not found
        }
        
        res.sendStatus(204)
    },
    
    
    //Suppresion
    delete : async (req,res) => {
        const id = req.params.id;
        const taskToDelete = await Task.findByIdAndDelete(id);
        if (!taskToDelete){
            return res.sendStatus(404);
        }
        res.sendStatus(204);
    }
};

module.exports = taskController;