import React from 'react'
import {observer} from 'mobx-react'
import {getChildType} from 'mobx-state-tree'
import Input from '../../../../../Fields/Input';
import Textarea from '../../../../../Fields/Textarea';
import Select from '../../../../../Fields/Select';
import Checkbox from '../../../../../Fields/Checkbox';
import injectWrapper from '../../../../../core/inject'
import getPropsInject from '../../../../../core/getPropsInject'
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
                fatherAge:'גיל האב', 
                comments: 'הערות',
                status: 'מצב משפחתי',
                agreement:'אני מצהיר...'

            },
            english: {
                firstName: 'first name',
                lastName:'last name',
                age:'age',
                fatherAge:'fatherAge',
                comments: 'comments',
                status: 'status',
                agreement:'I Agree...'

            },
            arabic: {
                firstName: 'first name',
                lastName:'last name',
                age:'age',
                fatherAge:'fatherAge',
                comments: 'comments',
                status: 'status',
                agreement:'I Agree...'

            }
        }
        this.currentResources = this.currentResources.bind(this);
        this.statusOptions=[{key:'1',value:'נשוי'},{key:'2',value:'רווק'},{key:'3',value:'גרוש'}]
        this.getProps =this.getProps.bind(this);
        this.validations =this.validations.bind(this);
    }
    currentResources = function(){
        return this.texts[this.props.generalStore.formLanguage.name];
    };        

    getProps =(name)=>{
        return {
            field: this.props.store[name],
            update: this.props.store["set_"+name],
            type: getChildType(this.props.store, name),
            language: this.props.generalStore.formLanguage.name,
            label:this.currentResources()[name],
            validations:this.validations()[name]
        }
    }

    render(){
        const FirstName = getPropsInject(Input,this.props.store,'firstName');
        const LastName = getPropsInject(Input,this.props.store,'lastName');
        const Age = getPropsInject(Input,this.props.store,'age');
        const FatherAge = getPropsInject(Input,this.props.store,'fatherAge');

        return(
            <div> 
                <div className="row">
                    <div className="col-md-4">
                        <FirstName label={this.currentResources().firstName}/>
                    </div>
                    <div className="col-md-4">
                        <LastName label={this.currentResources().lastName}/>
                    </div>
                    <div className="col-md-4">
                        <Age label={this.currentResources().age}/>
                    </div>
                    <div className="col-md-4">
                        <FatherAge label={this.currentResources().fatherAge}/>
                    </div>
                    <div className="col-md-4">
                        <Textarea {...this.getProps('comments')} rows={4} isAutoResize={false}/>
                    </div>
                    <div className="col-md-4">
                        <Select {...this.getProps('status')} options={this.statusOptions} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <Checkbox {...this.getProps('agreement')} />
                    </div>
                </div>
            </div>
        );
    }
}
export default PersonalInformation