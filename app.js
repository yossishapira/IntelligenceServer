import { getUsersFromFile, creatingUsersForFile} from "./servicess/usersS.js" 


await creatingUsersForFile({"name":"yossi"})
console.log(await getUsersFromFile())