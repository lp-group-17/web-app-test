// const app_name = 'web-app-kf2me'
exports.buildPath = function buildPath(route) {
    // if (process.env.NODE_ENV === 'production') {
    //     return 'https://' + app_name + '.ondigitalocean.app/' + route;
    // }
    // else {
    //     return 'http://localhost:5000/' + route;
    // }

    return 'http://137.184.153.148/' + route;
}