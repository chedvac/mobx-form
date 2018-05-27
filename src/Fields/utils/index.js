// export const  getEventValue = (e) => {
//     return e && (e.constructor.name==='SyntheticFocusEvent'||e.constructor.name==='SyntheticEvent')?e.target.value:e
// }
export const  getEventValue = (e) => {
    return e.target.type === "checkbox"? e.target.checked : e.target.value
}
