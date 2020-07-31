import React, { Component } from 'react'
import LangApiService from '../../services/lang-api-service'
import { Link } from 'react-router-dom'
import { Label, Input } from "../Form/Form";
import Button from '../Button/Button'
import './Learning.css'

class Learning extends Component {
    state={
        word: '',
        evaluation: null,
        total_score: 0,
        word_correct: 0,
        word_incorrect: 0,
    }
    guess = React.createRef();

    componentDidMount() {
        LangApiService.getHead()
            .then(data => {
                console.log(data)
                this.setState({
                    word: data.next_word,
                    total_score: data.total_score,
                    word_correct: data.word_correct,
                    word_incorrect: data.word_incorrect
                })
            })
            .catch()

        this.guess.current.focus()
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const guess = this.guess.current.value;
        console.log(this.guess.current.value);

        LangApiService.postGuess(guess)
            .then(data => {
                console.log('did this reach?')
                this.setState({
                    word: data.next_word,
                    evaluation: {
                        original: this.state.word,
                        total_score: data.total_score,
                        answer: data.answer,
                        isCorrect: data.isCorrect,
                        guess: guess
                    },
                    total_score: data.total_score,
                    word_correct: data.word_correct,
                    word_incorrect: data.word_incorrect
                })
            })
    }

    clearEval = () => {
        this.setState({evaluation: null})
    }

    render() {
        const { evaluation } = this.state;
        console.log('render')
        return(
            <div className='learn-wrapper'>
                {!evaluation
                    ? (
                        <div className='learning-content'>
                            <h2 >Translate the word:</h2>
                            <span>{this.state.word}</span>
                            <form className='learning-form' onSubmit={this.handleSubmit}>
                                <Label htmlFor='learn-guess-input'>What's the translation for this word?</Label>
                                <Input id='learn-guess-input' autoComplete='off' name='guess' placeholder='Translate' ref={this.guess} required />
                                <Button className='solo-button' type='submit'>Submit your answer</Button> 
                            </form>

                            <div className='learning-details'>
                                <p className='counter'>Your total score is: {this.state.total_score}</p>
                                <p>You have answered this word correctly {this.state.word_correct} times.</p>
                                <p>You have answered this word incorrectly {this.state.word_incorrect} times.</p>
                            </div>

                            <Link to='/'>
                                <Button className='link-button' type='button'>Return to Dashboard</Button>
                            </Link>
                        </div>
                    )
                    : (
                        <div className='eval-content'>
                            <h2>{evaluation.isCorrect ? 'You were correct! :D' : 'Good try, but not quite right :('}</h2>
                            <div className='DisplayFeedback'>
                                <p>The correct translation for {evaluation.original} was {evaluation.answer} and you chose {evaluation.guess}!</p>
                            </div>
                            <div className='DisplayScore'>
                                <p className='total'>Your total score is: {evaluation.total_score}</p>
                            </div>
                            <Button className='solo-button' type='click' onClick={this.clearEval}>Try another word!</Button>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Learning