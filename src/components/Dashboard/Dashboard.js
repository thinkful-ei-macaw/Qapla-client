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
                <h2>{language.name}</h2>
                <h2>the Warrior's Tongue</h2>
                <p className='total-score'>Total correct answers: {language.total_score}</p>
                <Link to='/learn'>
                    <Button className='link-button' type='button'>Start practicing</Button>
                </Link>
                <h3 className='sub-title'>Words to practice</h3>
                <ul className='current-words'>
                    {words.map(({
                        id, original, word_correct, word_incorrect,
                    }) => (
                        <li key={id} className='single-word'>
                            <h4 className='count'>{original}</h4>
                            <div className='word-results'>
                                <span className='count'>correct answer count: {word_correct}</span>
                                <span className='count'>incorrect answer count: {word_incorrect}</span>
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