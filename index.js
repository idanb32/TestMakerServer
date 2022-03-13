const express = require('express');
const cors = require('cors');

const container = require('./containerConfig');
const config = container.resolve('config');
const PORT = config.get('DevServer.port');
const origin  = config.get('DevServer.originAllowed');



const userRouter  = require('./routers/UsersRouter');
const questionRouter  = require('./routers/QuestionsRouter');
const quizRouter  = require('./routers/QuizesRouter');
const solvedQuestionRouter  = require('./routers/SolvedQuizesRouter');
const subjectRouter = require('./routers/SubjectRouter')
const companyRouter  = require('./routers/CompanyRouter');


const repContainer = require('./repContainer');


const app = express();
app.use(express.json());
app.use(cors ({
    origin: origin
}));

app.use('/user',userRouter);
app.use('/question',questionRouter);
app.use('/quiz',quizRouter);
app.use('/solvedQuestion',solvedQuestionRouter);
app.use('/company',companyRouter);
app.use('/subject',subjectRouter);


app.listen(PORT, ()=>{
    console.log(`server is running on PORT : ${PORT}`);
});

