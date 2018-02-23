import React, { Component, Fragment } from 'react';
import TextField from 'material-ui/TextField/TextField';
import Grid from 'material-ui/Grid/Grid';
import { number } from 'prop-types';
import { Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getWeek } from '../ducks/Week';

const mapStateToProps = (state, props) => {
    return {
        week: getWeek(state)
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

const RFTextField = field => <TextField fullWidth {...field.input} />;

class Lesson extends Component {
    static propTypes = {
        lesson: number.isRequired,
        day: number.isRequired
    };
    render() {
        const { props: { day, lesson, week } } = this;
        const prefix = `tasks.${week}.${day}.${lesson}`;
        const lessonNameKey = `${prefix}.lessonName`;
        const taskTextKey = `${prefix}.taskText`;
        return (
            <Fragment>
                <Grid item xs={3}>
                    <Field
                        week={week}
                        name={lessonNameKey}
                        component={RFTextField}
                    />
                </Grid>
                <Grid item xs={9}>
                    <Field
                        week={week}
                        name={taskTextKey}
                        component={RFTextField}
                    />
                </Grid>
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lesson);
