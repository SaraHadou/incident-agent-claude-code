import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";

import { listIncidents } from "./incidents.js";


function createServer(): McpServer {

    // 1. Create the MCP server
    const server = new McpServer({
        name: "incident-desk",
        version: "1.0.0",
    });


    // 2. Expose one tool to AI clients
    server.registerTool(
        "list-incidents",

        {
            description: "Return all incidents from the Incident Desk",

            // This tool needs no parameters
            inputSchema: z.object({}),
        },

        // 3. What actually happens when Claude calls the tool
        async () => {

            const incidents = listIncidents();

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(incidents, null, 2),
                    },
                ],
            };
        }
    );


    return server;
}


// 4. Start the MCP server using stdin/stdout
void serveStdio(createServer);

// IMPORTANT: use console.error, not console.log
console.error("Incident Desk MCP server running");