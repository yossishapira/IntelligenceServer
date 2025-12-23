import { getAgentsFromFile,saveAgentsToFile} from "../servicess/agentsS.js"; 


const getAgents = async (req, res) => {
    try {
        const users = await getAgentsFromFile();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to read agents file" });
    }
}

const getAgentById = async (req, res) => {
    try {
        const agents = await getAgentsFromFile();
        const id = Number(req.params.id);
        const agent = agents.find(u => u.id === id);

        if (!agent) {
            return res.status(404).json({ error: "Agents not found" });
        }

        res.json(agent);
    } catch (error) {
        res.status(500).json({ error: "Failed to read agents file" });
    }
}

const addAgent = async (req, res) => {
    try {
        const { name,nickname } = req.body;

        const agents = await getAgentsFromFile();

        let maxId = 0;

        if (agents.length > 0) {
            maxId = 0;
            for (let i = 0; i < agents.length; i++) {
                if (agents[i].id > maxId) {
                    maxId = agents[i].id;
                }
            }
        }
        const newAgent = {
            id: maxId + 1,
            name: name,
            nickname:nickname,
            reportsCount:0
        };
        agents.push(newAgent)
        await saveAgentsToFile(agents)
    
        res.status(201).json(newAgent);

    } catch (error) {
        res.status(500).json({ error: "Failed to create agent" });
    }
};

const updateAgent = async (req, res) => {
    try {
        const agents = await getAgentsFromFile();
        const id = Number(req.params.id);
        const { name,nickname,reportsCount } = req.body;
        const agentIndex = agents.findIndex(agent => agent.id === id);
        if (agentIndex === -1) {
            return res.status(404).json({ error: "Agent not found" });
        }

        
        agents[agentIndex] = {
            ...agents[agentIndex],
            id: id,
            name: name,
            nickname:nickname,
            reportsCount:reportsCount
        };
        
        await saveAgentsToFile(agents)

        res.status(200).json(agents[agentIndex]);

    } catch (error) {
        res.status(500).json({ error: "Failed to create agent" });
    }
};


const deleteAgent = async (req, res) => {
    try {
        const agents = await getAgentsFromFile();
        const id = Number(req.params.id);
        const agentIndex = agents.findIndex(agent => agent.id === id);
        if (agentIndex === -1) {
            return res.status(404).json({ error: "Agent not found" });
        }

        
     
        const deletedAgent = agents.splice(agentIndex, 1)[0];
        await saveAgentsToFile(agents)

        res.status(200).json(deletedAgent);

    } catch (error) {
        res.status(500).json({ error: "Failed to delete agent" });
    }
};


export {
    getAgents,
    getAgentById,
    addAgent,
    updateAgent,
    deleteAgent

}