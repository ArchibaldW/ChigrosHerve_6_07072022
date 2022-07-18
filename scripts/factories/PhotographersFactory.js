class PhotographersFactory {
    constructor(data, type){
        if (type === "oldJson"){
            return new OldPhotographer(data)
        } else if (type === "newJson") {
            return new Photographer(data)
        } else {
            throw 'Unknown type format'
        }
    }
}