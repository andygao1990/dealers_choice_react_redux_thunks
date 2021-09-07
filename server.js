const express = require('express');
const app = express();
const path = require('path');

app.use(express.json())

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', async (req, res, next) => {
    try {
        res.send(await User.findAll())
    }
    catch (err) {
        next(err)
    }
})

app.put('/api/users/:id', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id)
        await user.update(req.body)
        res.send(grocery)
    }
    catch (err) {
        next(err)
    }
})

app.post('/api/users', async (req, res, next) => {
    try {
        res.send(await User.create(req.body))
    }
    catch (err) {
        next(err)
    }
})


app.post('/api/users/random', async (req, res, next) => {
    try {
        res.send(await User.createRandom())
    }
    catch (err) {
        next(err)
    }
})


const init = async () => {
    try{
        await syncAndSeed()
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on port ${port}`));
    }
    catch (err) {
        console.log(err)
    }
}

const Sequelize = require('sequelize')
const { STRING, BOOLEAN } = Sequelize
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/redux_hw_db')
const faker = require('faker');

const User = conn.define('user', {
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    attendance: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

User.createRandom = () => {
    return User.create({name: faker.name.firstName()})
}

const syncAndSeed = async () => {
    await conn.sync({ force: true })
    await Promise.all([
        User.create({ name: 'moe' }),
        User.create({ name: 'lucy' }),
        User.create({ name: 'larry', attendance: true })
    ])
}

init()