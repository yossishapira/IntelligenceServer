import fs from "fs/promises"

async function getReportsFromFile() {
    try {
        const data = await fs.readFile("./io/reports.json", "utf8")
        return JSON.parse(data)
    } catch {
        return []
    }
}

async function saveReportsFile(report) {
   try {
     await fs.writeFile("./io/agents.json",JSON.stringify(report, null, 2)
     );
   } catch (error) {
    console.error(error);
        return null;
   }
}



export {
    getReportsFromFile,
    saveReportsFile
}


