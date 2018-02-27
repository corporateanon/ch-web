const all = (...args) => {
    return args.map(expr => `(${expr})`).join(' && ');
};

const any = (...args) => {
    return args.map(expr => `(${expr})`).join(' || ');
};

const authenticated = () => {
    return 'auth !== null';
};

const hasPermission = permission => {
    return `root.child('/users/' + auth.uid + '/permissions/${permission}').val() === true`;
};

module.exports = { all, any, authenticated, hasPermission };
