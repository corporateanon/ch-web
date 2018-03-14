import mixpanel from 'mixpanel-browser';
import config from './config';

if (config.mixpanel && config.mixpanel.token) {
    mixpanel.init(config.mixpanel.token);
}

const track = (...args) => {
    if (config.mixpanel && config.mixpanel.token) {
        mixpanel.track(...args);
    }
};
export default track;
