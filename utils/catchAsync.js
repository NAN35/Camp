module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

// above code is same as this code
// module.exports = fn => {
//     return (req, res, next) => {
//         fn(req, res, next).catch(e => next(e));
//     }
// }