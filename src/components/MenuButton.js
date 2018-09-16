import React, { Component, Fragment } from 'react';
import Menu from '@material-ui/core/Menu';

export default class MenuButton extends Component {
    state = { anchor: null };

    handleButtonClick = e => {
        this.setState({
            anchor: e.currentTarget
        });
    };

    handleClose = () => {
        this.setState({
            anchor: null
        });
    };

    withClose = cb => e => {
        cb(e);
        this.handleClose();
    };

    render() {
        const {
            props: { button, children },
            state: { anchor },
            handleButtonClick,
            withClose,
            handleClose
        } = this;

        return (
            <Fragment>
                {button(handleButtonClick)}
                <Menu anchorEl={anchor} open={!!anchor} onClose={handleClose}>
                    {children(withClose)}
                </Menu>
            </Fragment>
        );
    }
}

// Usage example:
//
// <MenuButton button={onClick => <button onClick={onClick}>aaa</button>}>
//     {withClose => {
//         <Fragment>
//             <MenuItem onClick={withClose(hhh)}>nnn</MenuItem>;
//         </Fragment>;
//     }}
// </MenuButton>;
