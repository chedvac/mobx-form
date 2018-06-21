
const innerExtend = function (target, source, prop) {
    if (source[prop] && source[prop].constructor &&
                source[prop].constructor === Object) {
        target[prop] = target[prop] || {};
        deepExtend(target[prop], source[prop]);
    } else if (!target.hasOwnProperty(prop)) {
        target[prop] = source[prop];
    }
    return target;
};

const deepExtend = (target, source) =>{
    for (const property in source) {
        if (source.hasOwnProperty(property)) {
            target = innerExtend(target, source, property);
        }
    }
    return target;
};

const extend = (target, source) =>{
    if (typeof(target) !== 'object') {
        return ((typeof source === 'object') ? source : {});
    }

    if (typeof(source) !== 'object') {
        return target;
    }
    return deepExtend(target, source);
};

export const extendSettingsWithDefaults = (settings, defaultSettings)=> {
    const merged = {};
    return extend(extend(merged, settings), defaultSettings);
};