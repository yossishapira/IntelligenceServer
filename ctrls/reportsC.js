import { getReportsFromFile, saveReportsToFile } from "../servicess/agentsS.js";


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
            return res.status(404).json({ error: "Agents not found" });
        }

        res.json(report);
    } catch (error) {
        res.status(500).json({ error: "Failed to read agents file" });
    }
}

const addReports = async (req, res) => {
    try {
        const { content, agentId } = req.body;
        const agents = await getAgentsFromFile();
        const id = agentId
        const agent = agents.find(u => u.id === id);

        if (!agent) {
            return res.status(404).json({ error: "Agents not found" });
        }

        const reports = await getReportsFromFile();


        let maxId = 0;

        if (agents.length > 0) {
            maxId = 0;
            for (let i = 0; i < agents.length; i++) {
                if (agents[i].id > maxId) {
                    maxId = agents[i].id;
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
        await saveReportsToFile(reports)

        res.status(201).json(newReport);

    } catch (error) {
        res.status(500).json({ error: "Failed to create agent" });
    }
};

const updateReport = async (req, res) => {
    try {
        const reports = await getReportsFromFile();
        const id = Number(req.params.id);
        const { content, agentId } = req.body;
        const reportIndex = agents.findIndex(agent => agent.id === id);
        if (agentIndex === -1) {
            return res.status(404).json({ error: "Agent not found" });
        }


        reports[reportIndex] = {
            ...reports[reportIndex],
            id: id,
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            content: content,
            agentId: agentId
        };

        await saveReportsToFile(agentss)

        res.status(200).json(agentss[reportIndex]);

    } catch (error) {
        res.status(500).json({ error: "Failed to create agent" });
    }
};


const deleteReport = async (req, res) => {
    try {
        const reports = await getReportsFromFile();
        const id = Number(req.params.id);
        const reporttIndex = agents.findIndex(report => reports.id === id);
        if (reporttIndex === -1) {
            return res.status(404).json({ error: "Report not found" });
        }



        const deletedReport = reports.splice(reporttIndex, 1)[0];
        await saveAgentsToFile(reports)

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