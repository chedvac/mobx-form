export default class Validation {   
    constructor(settings) {
        Object.assign(this, settings);
        if(!this.name || !this.validator || ! this.message){
            throw 'missing required paramerer';
        }
    }          
}
