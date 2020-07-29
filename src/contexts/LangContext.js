import React, { Component } from 'react'
import LangApiService from '../services/lang-api-service'

const LangContext = React.createContext({
    language: {},
    words: [],
    error: null,
    setError: () => {},
    clearError: () => {},
})

export class LangProvider extends Component {
    constructor(props) {
        super(props);
        this.state = { language: {}, words: [], error: null };
    }

    setLangData = (langData) => {
        this.setState(langData)
    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }
    
    clearError = () => {
        this.setState({ error: null })
    }

    componentDidMount() {
        LangApiService.getLanguage()
        .then((data) => {
            this.setLangData(data);
        })
    }

    setScore = (score) => {
        this.setState({score})
    }

    render() {
        const value = {
            language: this.state.language,
            words: this.state.words,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setScore: this.setScore
        }
        return (
            <LangContext.Provider value={value}>
                {this.props.children}
            </LangContext.Provider>
        )
    }
}


export default LangContext