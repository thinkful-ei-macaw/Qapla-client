import config from '../config'
import TokenService from './token-service'

const LangApiService ={
    getLanguage(){
        return fetch(`${config.API_ENDPOINT}/language`, {
          headers: {
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
          }
        })
            .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
      },
    getHead() {
        return fetch(`${config.API_ENDPOINT}/language/head`, {
            headers: {
              'Authorization': 'Bearer ' + TokenService.getAuthToken(),
            },
        })
            .then(res => 
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
    },
    postGuess(guess) {
        console.log(guess)
        return fetch(`${config.API_ENDPOINT}/language/guess`, {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + TokenService.getAuthToken(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ guess })
        })
            .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            )
    }
}

export default LangApiService