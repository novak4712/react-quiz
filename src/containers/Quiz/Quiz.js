import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axios/axios-quiz'
import Loader from "../../components/UI/Loader/Loader";

export default class Quiz extends Component {

    state = {
        result: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true
    };

    onAnswerClickHandler = (answerId) => {

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuestion];
        const result = this.state.result;

        if (question.rightAnswerId === answerId) {
            if (!result[question.id]) {
                result[question.id] = 'success'
            }
            this.setState({
                answerState: {
                    [answerId]: 'success'
                },
                result
            });
            const timeout = window.setTimeout(() => {

                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout);
            }, 1000);

        } else {
            result[question.id] = 'error';
            this.setState({
                answerState: {
                    [answerId]: 'error'
                },
                result
            });
        }


    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }
    onRetry = () => {
      this.setState({
          activeQuestion: 0,
          answerState: null,
          isFinished: false,
          result: {}
      })
    };

    async componentDidMount (){
        try{
           const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
           const quiz = response.data;
            this.setState({
                quiz,
                loading: false
            })
        }catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Вопросы:</h1>

                    {
                        this.state.loading
                        ? <Loader/>
                        :  this.state.isFinished
                            ? <FinishedQuiz
                                result={this.state.result}
                                quiz={this.state.quiz}
                                onRetry={this.onRetry}
                            />
                            : <ActiveQuiz
                                onAnswerClick={this.onAnswerClickHandler}
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }
                </div>
            </div>
        );
    }
}