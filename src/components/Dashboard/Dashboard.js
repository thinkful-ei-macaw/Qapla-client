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
                <Link to='/learning'>
                    <Button className='link-button' type='button'>Start your training</Button>
                </Link>
                <h3>Make your ancestors proud!</h3>
                <ul className='current-words'>
                    {words.map(({
                        id, original, correct_count, incorrect_count,
                    }) => (
                        <li key={id}>
                            <h4>{original}</h4>
                            <div className='scores'>
                                <p>Correct: {correct_count}</p>
                                <p>Incorrect: {incorrect_count}</p>
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