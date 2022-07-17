class Api {
    /**
     * @param {string} url 
     */
    constructor(url) {
        this._url = url
    }

    async get(key = null) {
        return fetch(this._url)
            .then(res => res.json())
            .then(res => {
                return key ? res[key] : res
            })
            .catch(err => console.log('an error occurs', err))
    }
}