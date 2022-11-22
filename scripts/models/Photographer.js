/* eslint-disable no-unused-vars */
class Photographer {
  constructor (data) {
    this._name = data.name
    this._id = data.id
    this._location = data.location
    this._tagline = data.tagline
    this._price = data.price
    this._portrait = data.portrait
  }

  get name () {
    return this._name
  }

  get id () {
    return this._id
  }

  get location () {
    return `${this._location.city}, ${this._location.country}`
  }

  get tagline () {
    return this._tagline
  }

  get price () {
    return `${this._price}€/jour`
  }

  get picture () {
    return `/assets/photographers/${this._portrait}`
  }
}
