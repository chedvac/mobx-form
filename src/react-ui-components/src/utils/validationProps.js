
const validationProps = props => {
    if ( !'field' in props /*|| !props.field.type==='BaseStoreValue'*/){
        throw new Error('Field should get a field parameter of BaseStoreValue type');
    }
}
export default validationProps;