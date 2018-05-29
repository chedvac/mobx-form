import {observable, autorun, action, computed} from "mobx";
import {HebrewName,require} from "../../../../../validations/validationsEnum"
import property from "../../../../../core/property"
import ComplexType from '../../../../../core/ComplexType'

class PersonalInformation extends ComplexType {
  
    constructor(){
        super();
        
        console.log(this)
    } 
    condition = function(){return true}
    @observable aaa="aaa"
    @property
    ({ 
      validations:[{rule:HebrewName,condition:this.condition, params:{}}],
    }) 
    firstName= 'Yossef';
    @property
    ({ 
      validations:[{rule:HebrewName,condition:this.condition, params:{}}],
    }) 
    lastName = 'Levi';
    @property
    ({ 
      validations:[{rule:HebrewName,condition:this.condition, params:{}}],
    }) 
    age=15;
    @property
    ({ 
      validations:[{rule:HebrewName,condition:this.condition, params:{}}],
    }) 
    fatherAge=35;
    @property() comments=undefined;
    @property() status=undefined;
    @property() agreement=false;
    //todo region
    @computed
    fullName =()=>{
        return this.firstName + this.lastName
    }
   
    @action
    set_firstName(value){
        this.model.firstName=value;
    }
    @action
    set_lastName=(value)=>{
        this.model.lastName=value;
    }
    @action
    set_fatherAge=(value)=>{
        this.model.fatherAge=value;
    }
    @action
    set_age=(value)=>{
        this.model.age=value;
    }
    @action
    set_comments=(value)=>{
        this.model.comments=value;
    }
    @action
    set_status=(value)=>{
        this.model.status=value;
    }
    @action
    set_agreement=(value)=>{
        this.model.agreement=value;
    }
     
    
}
export default PersonalInformation;
