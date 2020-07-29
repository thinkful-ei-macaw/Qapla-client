import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LangContext from '../../contexts/LangContext'
import Button from '../Button/Button'
import './Dashboard.css'

class Dashboard extends Component {
    static contextType = LangContext;

    render() {
        const { language, words} = this.context
        return (
            <div className='dash-wrapper'>
                <p>Total Correct Answers: {language.total_score}</p>
                <Link to='/learn'>
                    <Button className='link-button' type='button'>Start your training</Button>
                </Link>
                <h3>Make your ancestors proud!</h3>
                <ul className='current-words'>
                    {words.map(({
                        id, original, word_correct, word_incorrect,
                    }) => (
                        <li key={id} className='single-word'>
                            <h4 className='count'>{original}</h4>
                            <div className='scores'>
                                <span className='count'>Correct: {word_correct}</span>
                                <span className='count'>Incorrect: {word_incorrect}</span>
                            </div>
                        </li>
                    )
                    )}
                </ul>
            </div>
        )
    }
}

export default Dashboard