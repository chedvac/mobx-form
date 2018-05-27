
import {observable} from "mobx";

export default function complexType() {//todo: rename
    return function (target) {
        target.prototype.isValid = true;
        target.prototype.message = '';
        target.prototype.propertiesManager = {};

        const getDeepModel = function (prop) {
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
        target.prototype.getModel =function(){
            return target.model
        };
        target.prototype.getPureModel = function(){
            var pureModel = {};
            var model = target.model;
            for (var prop in model) {
                if (model.hasOwnProperty(prop) && !model[prop].ignore) {
                    pureModel[prop] = getDeepModel(model[prop]);
                }
            }
            return pureModel;
        };
        // setModel : function(){
        //     type.model
        //     //map
        // },
        target.prototype.validate = function(){
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
            
        };
        target.prototype.map = function(){

        };
        target.prototype.reset = function(){
            applyChildAction('reset')
        }
            
    };   
    
}