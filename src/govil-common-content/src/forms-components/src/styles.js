import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const { createElement, forwardRef } = React

const withPropsStyles = (style, withThemeValue) => {

    const withPropsStyles = (component) => {

        return forwardRef((props, ref) => {

            const proxy = (theme) => style(props, theme)

            const hoc = withStyles(proxy, { withTheme: withThemeValue })(component)

            return props.children ?
                createElement(hoc, { ...props, ref }, props.children) :
                createElement(hoc, { ...props, ref })
        })
    }

    return withPropsStyles
}

export default withPropsStyles