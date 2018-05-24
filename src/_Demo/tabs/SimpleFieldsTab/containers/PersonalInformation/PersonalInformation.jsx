import React from 'react'
import {observer} from 'mobx-react'
import {getChildType} from 'mobx-state-tree'
import {lessThan, differentThan} from '../../../../../validations/number'
import Input from '../../../../../Fields/Input';
import Textarea from '../../../../../Fields/Textarea';
import Select from '../../../../../Fields/Select';
import Checkbox from '../../../../../Fields/Checkbox';
import injectWrapper from '../../../../../core/inject'
import control from '../../../../../Fields/hocs/control'
@observer
 class PersonalInformation extends React.Component{
    
    constructor(props) {
        super(props);

        this.texts = {
            hebrew: {
                firstName: ' שם פרטי',
                lastName: ' שם משפחה',
                age:'גיל',
                comments: 'הערות',
                status: 'מצב משפחתי',
                agreement:'אני מצהיר...'

            },
            english: {
                firstName: 'first name',
                lastName:'last name',
                age:'age',
                comments: 'comments',
                status: 'status',
                agreement:'I Agree...'

            },
            arabic: {
                firstName: 'first name',
                lastName:'last name',
                age:'age',
                comments: 'comments',
                status: 'status',
                agreement:'I Agree...'

            }
        }
        this.currentResources = this.currentResources.bind(this);
        this.statusOptions=[{key:'1',value:'נשוי'},{key:'2',value:'רווק'},{key:'3',value:'גרוש'}]
        this.validations ={
            age: {
                lessThan: lessThan({number:30}),
                differentThan: differentThan({number:22})
            }
        }    
    }
    currentResources = function(){

        return this.texts[this.props.generalStore.formLanguage.name];
    };        
   
  

   
    render(){
      
        return(
            <div> 
                <div className="row">
                <div className="col-md-4">
                    <Input field={this.props.store.firstName} update={this.props.store.updateFirstName}
                        label={this.currentResources().firstName} type={getChildType(this.props.store, "firstName")}/>
                </div>
                <div className="col-md-4">
                    <Input field={this.props.store.lastName} update={this.props.store.updateLastName}
                        label={this.currentResources().lastName} type={getChildType(this.props.store, "lastName")}/>
                </div> 
                <div className="col-md-4">
                    <Input field={this.props.store.age} update={this.props.store.updateAge}
                        label={this.currentResources().age} type={getChildType(this.props.store, "age")}
                        validations={this.validations.age}/>
                </div> 
                <div className="col-md-4">
                    <Textarea field= {this.props.store.comments} update={this.props.store.updateComments} label={this.currentResources().comments} rows={4} isAutoResize={false}/>
                </div> 
                
                <div className="col-md-4">
                    <Select field= {this.props.store.status} label={this.currentResources().status} update={this.props.store.updateStatus} options={this.statusOptions} />
                </div>  
                    
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <Checkbox field= {this.props.store.agreement} label={this.currentResources().agreement} update={this.props.store.updateAgreement} />
                    </div>     
                </div>
            </div>
           
        );
    }
}
export default PersonalInformation