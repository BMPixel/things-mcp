# Things MCP Server

[![npm version](https://badge.fury.io/js/@wenbopan%2Fthings-mcp.svg)](https://badge.fury.io/js/@wenbopan%2Fthings-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![macOS](https://img.shields.io/badge/Platform-macOS-blue.svg)](https://www.apple.com/macos/)

Control your Things.app tasks directly from Claude Code, Claude Desktop, Cursor, and other AI assistants using the Model Context Protocol (MCP).

<a href="https://glama.ai/mcp/servers/@BMPixel/things-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@BMPixel/things-mcp/badge" alt="Things Server MCP server" />
</a>

## What It Does

This MCP server lets AI assistants interact with your Things.app tasks on macOS. You can:

- **Create** new tasks and projects
- **Update** existing items 
- **View** your task database with detailed summaries
- **Schedule** tasks for specific dates
- **Organize** with areas, tags, and deadlines

## Quick Start

### 1. Get Things Authorization Token

For updating existing tasks, you need an authorization token:

1. Open **Things.app** on macOS
2. Go to **Things → Preferences → General** 
3. Check **"Enable Things URLs"**
4. Copy the authorization token that appears

### 2. Configure Your AI Assistant

<details>
<summary><strong>Claude Desktop</strong></summary>

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):

```json
{
  "mcpServers": {
    "things": {
      "command": "npx",
      "args": ["@wenbopan/things-mcp"],
      "env": {
        "THINGS_AUTH_TOKEN": "your-token-here"
      }
    }
  }
}
```
</details>

<details>
<summary><strong>Cursor IDE</strong></summary>

Create `.cursor/mcp.json` in your project or `~/.cursor/mcp.json` globally:

```json
{
  "things": {
    "command": "npx",
    "args": ["@wenbopan/things-mcp"],
    "env": {
      "THINGS_AUTH_TOKEN": "your-token-here"
    }
  }
}
```
</details>

### 3. Restart Your AI Assistant

After configuration, restart your AI assistant to load the MCP server.

## Use Cases

### Daily Planning
"Show me my today's tasks and create a project for the new marketing campaign with initial tasks for research, design, and content creation."

### Project Management  
"Update the mobile app project to add design review and testing tasks, then schedule the design review for next Monday."

### Task Organization
"Move all my unscheduled shopping tasks to the 'Personal' area and tag them with 'weekend'."

### Progress Tracking
"Give me a summary of all active projects with their deadlines and completion status."

### Quick Capture
"Create a task to call the dentist, schedule it for tomorrow, and set a deadline for end of week."


## License

MIT

## Contributing

Issues and pull requests welcome! Please ensure all tests pass before submitting.