import { getReportsFromFile, saveReportsFile } from "../servicess/reportsS.js";
import { getAgentsFromFile, saveAgentsToFile } from "../servicess/agentsS.js";

const getReports = async (req, res) => {
    try {
        const users = await getReportsFromFile();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to read reports file" });
    }
}

const getReportsById = async (req, res) => {
    try {
        const reports = await getReportsFromFile();
        const id = Number(req.params.id);
        const report = reports.find(u => u.id === id);

        if (!report) {
            return res.status(404).json({ error: "Reports not found" });
        }

        res.json(report);
    } catch (error) {
        res.status(500).json({ error: "Failed to read reports file" });
    }
}

const addReports = async (req, res) => {
    try {
        const { content, agentId } = req.body;
        const agents = await getAgentsFromFile();
        const id = Number(agentId)
        const agent = agents.find(u => u.id === id);

        if (!agent) {
            return res.status(404).json({ error: "Agents not found" });
        }

        const reports = await getReportsFromFile();


        let maxId = 0;

        if (reports.length > 0) {
            maxId = 0;
            for (let i = 0; i < reports.length; i++) {
                if (reports[i].id > maxId) {
                    maxId = reports[i].id;
                }
            }
        }
        const date = new Date()
        const newReport = {
            id: maxId + 1,
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            content: content,
            agentId: agentId
        };
        reports.push(newReport)
        await saveReportsFile(reports)
        const agentIndex = agents.findIndex(agent => agent.id === id);
        if (agentIndex === -1) {
            return res.status(404).json({ error: "Reports not found" });
        }

        res.status(201).json(newReport);
        agents[agentIndex].reportsCount += 1
        await saveAgentsToFile(agents)
    } catch (error) {
        res.status(500).json({ error: "Failed to create report" });
    }
};

const updateReport = async (req, res) => {
    try {
        const reports = await getReportsFromFile();
        const id = Number(req.params.id);
        const { content, agentId } = req.body;
        const agents = await getAgentsFromFile();
        const idAgent = Number(agentId)
        const agent = agents.find(u => u.id === idAgent);

        if (!agent) {
            return res.status(404).json({ error: "Agents not found" });
        }
        const reportIndex = reports.findIndex(report => report.id === id);
        if (reportIndex === -1) {
            return res.status(404).json({ error: "Report not found" });
        }

        const date = new Date()
        reports[reportIndex] = {
            ...reports[reportIndex],
            id: id,
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            content: content,
            agentId: agentId
        };

        await saveReportsFile(reports)

        res.status(200).json(reports[reportIndex]);

    } catch (error) {
        res.status(500).json({ error: "Failed to update reports" });
    }
};


const deleteReport = async (req, res) => {
    try {
        const reports = await getReportsFromFile();
        const id = Number(req.params.id);
        const reportIndex = reports.findIndex(report => report.id === id);
        if (reportIndex === -1) {
            return res.status(404).json({ error: "Report not found" });
        }
       
        const agents = await getAgentsFromFile();
        const agentIndex = agents.findIndex(agent => agent.id === Number(reports[reportIndex].agentId));
        if (agentIndex === -1) {
            return res.status(404).json({ error: "Agent not found" });
        }


        agents[agentIndex].reportsCount -= 1
        await saveAgentsToFile(agents)
        const deletedReport = reports.splice(reportIndex, 1)[0];
        await saveReportsFile(reports)
        res.status(200).json(deletedReport);

    } catch (error) {
        res.status(500).json({ error: "Failed to delete report" });
    }
};


export {
    getReports,
    getReportsById,
    addReports,
    updateReport,
    deleteReport

}