import fs from "fs/promises"

async function getUsersFromFile() {
    try {
        const data = await fs.readFile("./io/users.json", "utf8")
        return JSON.parse(data)
    } catch {
        return []
    }
}

async function creatingUsersForFile(newUser) {
      try {
          const data = await fs.readFile("./io/users.json", "utf8");
          const users = JSON.parse(data);
  
          users.push(newUser);
  
  
          await fs.writeFile("./io/users.json", JSON.stringify(users, null, 2));
  
          return newUser;
      } catch (error) {
          console.error(error);
          return null;
      }
}


export {
    getUsersFromFile,
    creatingUsersForFile
}