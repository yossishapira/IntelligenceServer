import { getUsersFromFile } from "../servicess/usersS.js";



const getAllUsers = async (req, res) => {
    try {
        const users = await getUsersFromFile();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to read users file" });
    }
}


const getAllUsersId = async (req, res) => {
    try {
        const users = await getUsersFromFile();
        const id = Number(req.params.id);
        const user = users.find(u => u.id === id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to read users file" });
    }
}
const addUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const users = await getUsersFromFile();


        for (let i = 0; i < users.length; i++) {
            if (users[i].username === username && users[i].password === password) {
                const newUser = {
                    username: username,
                    password: password
                };
                await creatingUsersForFile(newUser)
            }
        }




        res.status(201).json(newUser);

    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
};


export {
    getAllUsers,
    getAllUsersId,
    addUser
}