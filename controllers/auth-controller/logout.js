module.exports = (req, res) => {
    req.logout();
    req.session.destroy(err => {
        if (err) {
            throw new Error(err);
        }
        res.status(200)
            .clearCookie('connect.sid', { path: '/' })
            .send({ status: 'Logged out' });
    });
};
