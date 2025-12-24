export const validateUser = async (req, res, next) => {
    try {
        const { username, password } = req.headers
        const dataUsers = await readFile(pathUsers)
        const foundName = dataUsers.find(user => user.username === username && user.password === parseInt(password))
        console.log(foundName);
        if (!foundName) {
            return res.status(403).json("")
        }
        next()
    } catch (err) {
        console.error(err)

    }
}