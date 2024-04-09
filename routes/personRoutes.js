const router = require('express').Router();
const Person = require('../models/Person');

// CRUD

router.post('/', async (req,res) => {
    const {name, salary, approved} = req.body;

    if (!name) {
        res.status(400).json({message: 'O nome é obrigatório!'});
        return;
    }

    const person = {
        name,
        salary,
        approved
    }

    try {
        await Person.create(person);
        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'});

    } catch (error) {
        res.status(500).json({error: error});
    }
});

router.get('/', async (req, res) => {
    try {
        const people = await Person.find();

        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({ error: error});
    }
});

//pegando pelo id padrão do mongoDB
router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id });
        
        if (!person) {
            res.status(404).json({message: 'O usuário não foi encontrado!'});
            return;
        }
        
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ error: error});
    }
});

router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    const { name, salary, approved } = req.body;

    const person = {
        name,
        salary,
        approved,
    }

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person);

        if(updatedPerson.matchedCount === 0) {
            res.status(404).json({message: 'Usuário não encontrado!'});
            return;
        }

        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ error: error});
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deletedPerson = await Person.deleteOne({ _id: id });

        if(deletedPerson.deletedCount === 0) {
            res.status(404).json({message: 'Usuário não encontrado!'});
            return;
        }

        res.status(200).json({message: `O usuário ${id} foi deletado`});
    } catch (error) {
        res.status(500).json({ error: error});
    }
});

router.get('/name/find', async (req, res) => {
    const nameParam = req.query.name;

    try {
        const person = await Person.findOne({ name: nameParam });

        if (!person) {
            res.status(404).json({message: 'O usuário não foi encontrado pelo nome'});
        }

        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ error: error});
    }
});

module.exports = router;