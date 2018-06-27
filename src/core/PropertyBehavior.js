import {observable} from 'mobx';
import ValidationState from './ValidationState';

export default class PropertyBehavior {
    constructor(){
        this.ValidationState = new ValidationState();
    };
    setReset = function(reset){
        this.reset = reset;
    };
    getReset = function(){
       return this.reset;
    };
    setValidate = function(validate){
        this.validate = validate;
    };
    getValidationsManager = function(validationsManager){
        return this.validationsManager;
    };
    setValidationsManager = function(validationsManager){
        this.validationsManager = validationsManager;
    };
    getValidate = function(validate){
        return this.validate;
    };
    setMap = function(map){
        this.map = map;
    };
    getMap= function(){
        return this.map;
    };
    setRef = function(ref){
        this.ref = ref;
    };
    getRef = function(){
        return this.ref;
    };

};