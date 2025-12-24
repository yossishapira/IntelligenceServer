export const validateUser = async (req, res, next) => {
    try {
        const { username, password } = req.headers
        if(username === "yossi" && password === 123){
            res.json({ok:true})
        next()
    }
    } catch (err) {
        console.error(err)

    }
}