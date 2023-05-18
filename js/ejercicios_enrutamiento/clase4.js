const express = require('express');
const userRouter = express.Router();
const postRouter = express.Router();
const app = express();

userRouter.get('/', (req, res) => {
    res.send('User List');
    });

userRouter.delete('/', (req, res) => {
    "res.send('User deleted');"
    });

postRouter.get('/', (req, res) => {
    res.send('Post List');
    });

app.use('/users', userRouter);
app.use('/posts', postRouter);

app.listen(3000, () => console.log('Listening on port 3000!'));