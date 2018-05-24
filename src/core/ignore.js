
export function ignore(isIgnore = true) {
    return function (target) {
        target.ignore = isIgnore
    }
 }