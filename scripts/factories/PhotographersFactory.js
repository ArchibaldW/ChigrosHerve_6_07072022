/* eslint-disable no-throw-literal */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
class PhotographersFactory {
  constructor (data, type = 'newJson') {
    if (type === 'oldJson') {
      return new OldPhotographer(data)
    } else if (type === 'newJson') {
      return new Photographer(data)
    } else {
      throw 'Unknown type format'
    }
  }
}
