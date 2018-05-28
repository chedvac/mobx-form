export default function model(self) {
    return function (target, name, descriptor) {

        const getParent = function(){return self};
        target.getParent = getParent;
        
        // for (var prop in descriptor) {
        //     if (descriptor.hasOwnProperty(prop)) {
        //        self[prop.name] = prop;
        //     }
        // }
    }
}
