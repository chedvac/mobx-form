
export default function property(settings = {}) {
    return function (target, name, descriptor) {
        target[name] = {};
        const self = target[name];
        self.value= settings.defaultValue
        self.validations = settings.validations
        self.isValid = true
        self.message=''
        self.defaultValue= settings.defaultValue
       
       Object.defineProperty(target, name, { get: function() { return self.value } });

        //todo:isRequired
   
        self.setValue = (newValue)=> {
            this.validate()
            if(this.isValid) { this.value = newValue}
        //todo: public value to parent
        }
        self.getValue=()=>{
            return this.value;
        }

        self.validate=()=>{
            var failedValidation= this.validations.find(item =>((!item.condition || item.condition()) && item.rule.validator(this.value,item.params)=== false) )
            if(! failedValidation){
                return
            }
            this.message = failedValidation.message 
            this.isValid = false
        }
        self.map=(value)=>{
            return value;
        }
        self.reset=()=>{
            this.setValue(this.defaultValue)   
        }
    }
}
