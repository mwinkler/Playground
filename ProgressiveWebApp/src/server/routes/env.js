
exports.route = (req, res) => {

    res.send(JSON.stringify(process.env));

}