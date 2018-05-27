import React from 'react'
export default class TabSettings{
    constructor(settings) {
        const {number, name, path, component} = settings;
        this.number = number;
        this.name = name;
        this.path = path;
        this. component = component;
    }
   
}
