import React, { Component } from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isDialogOpen, CloseDialog } from '../ducks/History';

const mapStateToProps = (state, props) => {
    return {
        isOpen: isDialogOpen(state)
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            onClose: CloseDialog
        },
        dispatch
    );
};

class HistoryDialog extends Component {
    render() {
        const { props: { isOpen, onClose } } = this;
        return (
            <Dialog open={isOpen} onClose={onClose}>
                <DialogTitle>История правок</DialogTitle>
                asd
            </Dialog>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDialog);
