
export default function complexType(validations = []) {//todo: rename
    return function (target) {
    // target.toJSON = function () {
    //     return mobx.toJS(this.getModel());
    // };
        target.validations = validations
        target.isValid = true
        target.message=''

        Object.assign(target.actions||{},{//todo: pure?
            getModel : function(){
                return target.model
            },
            getPureModel : function(){
                var pureModel = {};
                var model = target.model;
                for (var prop in model) {
                    if (model.hasOwnProperty(prop) && !model[prop].ignore) {
                        pureModel[prop] = getDeepModel(model[prop]);
                    }
                }
                return pureModel;
            },
            setModel : function(){
                target.model
                //map
            },
            validate : function(){
                const validateItself=()=>{
                    var failedValidation= this.validations.find(item =>((!item.condition || item.condition()) && item.rule.validator(this.value)=== false) )
                   if(!failedValidation){
                        return
                    }
                    this.message = failedValidation.message 
                    this.isValid = false
                }
                const validateChilds=()=>{
                    applyChildAction('validate')
                }
                validateItself()
                validateChilds()
                
            },
            map : function(){

            },
            reset : function(){
                applyChildAction('reset')
            }
        } )
        var getDeepModel = function (prop) {
            return prop.getPureModel ? prop.getPureModel() : prop.getValue();
        };
        const applyChildAction =(action)=>{
            var model = target.model;
            for (var prop in model) {
                if (model.hasOwnProperty(prop)) {
                    model[prop][action]()
                }
            }
        }
    }
}