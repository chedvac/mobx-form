export default function(target,name){
    return function(){
        console.log(target,name);
        return target.formObservablesManager[name].ref;
    }
}
