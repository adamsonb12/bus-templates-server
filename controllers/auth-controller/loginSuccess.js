module.exports = async (req, res) => {
    const { user } = req;
    // const { attributes } = user;
    if (user) {
        res.status(200).send({ user });
    } else {
        res.status(401).send({ login: 'failed' });
    }
};
