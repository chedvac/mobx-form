
import {observable} from "mobx";

export default function complexType() {//todo: rename
    return function (target) {
        target.prototype.isValid = true;
        target.prototype.message = '';
        target.prototype.propertiesManager = {};

        const getDeepModel = function (prop) {
            return prop.getPureModel ? prop.getPureModel() : prop.getValue();
        };
        // const applyChildAction =(action)=>{
        //     var model = target.model;
        //     for (var prop in model) {
        //         if (model.hasOwnProperty(prop)) {
        //             model[prop][action]()
        //         }
        //     }
        // }
        const applyChildAction =(action)=>{
            var propertiesManager = target.propertiesManager;
            for (var property in propertiesManager) {
                if (propertiesManager.hasOwnProperty(property)) {
                    propertiesManager[property][action]()
                }
            }
        }
        target.prototype.getModel =function(){
            return this.model
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
            const validateChildren =()=>{
                // const failedChildValidation = Object.values(propertiesManager).find(function(obj){
                //     obj.validationsManager.validate()
                // })
                let childrenValid = true;
                const model = target.prototype.getModel()
                Object.keys(model).forEach(function(key){
                    if(model[key].validate){
                        model[key].validate()
                    } else{
                         target.propertiesManager[key].validationsManager.validate()
                    }
                })
                // if(failedChildValidation){
                //     this.isValid = false
                // }
            }  

            // const validateChildren =()=>{
            //     let childrenValid = true;
            //     var propertiesManager = target.propertiesManager;
            //     for (var property in propertiesManager) {
            //         if (propertiesManager.hasOwnProperty(property)) {
            //             !propertiesManager[property].validationsManager.validate()?
            //             childrenValid = false : childrenValid = childrenValid
            //         }
            //     }
            //     this.isValid = false
            //     return childrenValid
            // }
            const validateItself=()=>{
                var failedValidation= this.validations.find(item =>((!item.condition || item.condition()) && item.rule.validator(this.value)=== false) )
                if(!failedValidation){
                    this.message = ""
                    this.isValid = true
                }

                this.message = failedValidation.message 
                this.isValid = false

            }
            
           // validateItself()
            validateChildren()
            return this.isValid
            
        };
        target.prototype.map = function(){

        };
        target.prototype.reset = function(){
            applyChildAction('reset')
        }
            
    };   
    
}