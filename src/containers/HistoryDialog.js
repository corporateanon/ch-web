import React, { Component } from 'react';
import Dialog, { DialogTitle } from 'material-ui/Dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    isDialogOpen,
    CloseDialog,
    getCurrentLessonHistory
} from '../ducks/History';
import HistoryLog from '../components/HistoryLog';

const mapStateToProps = (state, props) => {
    return {
        isOpen: isDialogOpen(state),
        current: getCurrentLessonHistory(state)
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
        const { props: { isOpen, onClose, current } } = this;
        return (
            <Dialog open={isOpen} onClose={onClose}>
                <DialogTitle>История изменений</DialogTitle>
                <HistoryLog history={current} />
            </Dialog>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDialog);
