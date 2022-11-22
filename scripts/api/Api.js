/* eslint-disable no-unused-vars */
class Api {
  /**
     * @param {string} url
     */
  constructor (url) {
    this._url = url
  }

  async get (key = null, id = null) {
    return fetch(this._url)
      .then(res => res.json())
      .then(res => {
        if (key) {
          if (id) {
            if (key === 'photographers') {
              return res[key].filter(data => data.id === id)
            } else {
              return res[key].filter(data => data.photographerId === id)
            }
          } else {
            return res[key]
          }
        } else {
          return res
        }
      })
      .catch(err => console.log('an error occurs', err))
  }
}
