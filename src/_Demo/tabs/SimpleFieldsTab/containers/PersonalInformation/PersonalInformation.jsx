                                             
import React from 'react'
import {observer, inject} from 'mobx-react'

import Input from '../../../../../Fields/Input';
import Textarea from '../../../../../Fields/Textarea';
import Select from '../../../../../Fields/Select';
import Checkbox from '../../../../../Fields/Checkbox';
import { getPropsInject } from '../../../../../core/inject'

@inject("applicationData")
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
    }
    currentResources = function(){
        return this.texts[this.props.applicationData.formLanguage.name];
    };        


    render(){
        const FirstName = getPropsInject(Input,this.props,'firstName');
        const LastName = getPropsInject(Input,this.props,'lastName');
        const Age = getPropsInject(Input,this.props,'age');
        const FatherAge = getPropsInject(Input,this.props,'fatherAge');
        const Comments = getPropsInject(Textarea,this.props,'comments');
        const Status = getPropsInject(Select,this.props,'status');
        const Agreement = getPropsInject(Checkbox,this.props,'agreement');

        return(
            <div> 
                <div className="row">
                    <div className="col-md-4">
                        <FirstName label={this.currentResources().firstName} />
                    </div> 
                    <div className="col-md-4">
                        <LastName label={this.currentResources().lastName} />
                    </div>
                    <div className="col-md-4">
                        <Age label={this.currentResources().age} />
                    </div>
                    <div className="col-md-4">
                        <FatherAge label={this.currentResources().fatherAge} />
                    </div>
                    <div className="col-md-4">
                        <Comments label={this.currentResources().comments} rows={4} isAutoResize={false}/>
                    </div>
                    <div className="col-md-4">
                        <Status label={this.currentResources().status} options={this.statusOptions} />
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-md-4">
                        <Agreement label={this.currentResources().agreement} />
                    </div>
                </div> */}
           
            </div>
        );
    }
}
export default PersonalInformation

