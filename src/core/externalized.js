export default function externalized(settings = {}) {
    return function (target, name, descriptor) {
       // target.getParent[name] = descriptor;
    }
}
