import fs from "fs/promises"

async function getReportsFromFile() {
    try {
        const data = await fs.readFile("./io/reports.json", "utf8")
        return JSON.parse(data)
    } catch {
        return []
    }
}

async function creatingReportsForFile(newReport) {
    try {
        const data = await fs.readFile("./io/reports.json", "utf8");
        const reports = JSON.parse(data);

        reports.push(newReport);


        await fs.writeFile("./io/reports.json", JSON.stringify(reports, null, 2));

        return newReport;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export {
    getReportsFromFile,
    creatingReportsForFile
}


