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
                            <h3 className='sub-title'>Translate!</h3>
                            <p>{this.state.word}</p>
                            <form className='learning-form' onSubmit={this.handleSubmit}>
                                <Label htmlFor='guess'>What is the meaning of this?</Label>
                                <Input id='guess' autoComplete='off' name='guess' placeholder='Translate' ref={this.guess} required />
                                <Button className='solo-button' type='submit'>Answer</Button> 
                            </form>

                            <div className='learning-details'>
                                <h4>Total Correct: {this.state.total_score}</h4>
                                <p>Correct translations on this word: {this.state.word_correct}</p>
                                <p>Incorrect translations on this word: {this.state.word_incorrect}</p>
                            </div>

                            <Link to='/'>
                                <Button className='link-button' type='button'>Return to Dashboard</Button>
                            </Link>
                        </div>
                    )
                    : (
                        <div className='eval-content'>
                            <h3>{evaluation.isCorrect ? 'Correct!' : 'Incorrect, try again!'}</h3>
                            <div className='eval-details'>
                                <span>Correct translation of {evaluation.original} is {evaluation.answer} and you said {evaluation.guess}.</span>
                                <h4>Total score is currently: {evaluation.total_score}</h4>
                            </div>
                            <Button className='solo-button' type='click' onClick={this.clearEval}>Next Word</Button>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Learning