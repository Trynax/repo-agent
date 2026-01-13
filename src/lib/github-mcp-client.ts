import { Client } from "@modelcontextprotocol/sdk/client";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio";

/**
 * Creates a GitHub MCP client with user-specific authentication.
 * Uses Docker to run the official GitHub MCP server image.
 *
 * @param token - GitHub Personal Access Token or GitHub App Installation Token
 * @returns MCP client instance
 */
export async function createGitHubMCPClient(token: string) {
  try {
    const transport = new StdioClientTransport({
      command: "docker",
      args: [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server",
      ],
      env: {
        GITHUB_PERSONAL_ACCESS_TOKEN: token,
      },
    });

    const client = new Client(
      { name: "github-mcp-client", version: "1.0.0" },
      { capabilities: {} }
    );
    await client.connect(transport);

    return client;
  } catch (error) {
    console.error("Error initializing Github MCP:", error);
    throw error;
  }
}
