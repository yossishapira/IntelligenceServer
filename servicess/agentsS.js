import fs from "fs/promises"

async function getAgentsFromFile() {
    try {
        const data = await fs.readFile("./io/agents.json", "utf8")
        return JSON.parse(data)
    } catch {
        return []
    }
}


async function saveAgentsToFile(agents) {
   try {
     await fs.writeFile("./io/agents.json",JSON.stringify(agents, null, 2)
     );
   } catch (error) {
    console.error(error);
        return null;
   }
}


export {
    getAgentsFromFile,
    saveAgentsToFile
}