module.exports = (app) => {
    /* example 用户登录 */
    let commonToken = `${new Date().getTime()}-admin`;
    app.post('/login', (req, res) => {
        setTimeout(() => {
            const token = `${new Date().getTime()}-admin`;
            commonToken = token;
            res.cookie('access-token', token, { maxAge: 60000 });
            res.status(200).json({
                token,
                userName: '普通管理员A',
                userRole: 'admin'
            });
        }, 1500);
    });
};
