#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { logger } from './utils/logger.js';

// Import tool registration functions
import { registerAddTodoTool } from './tools/add-todo.js';
import { registerAddProjectTool } from './tools/add-project.js';
import { registerUpdateTodoTool } from './tools/update-todo.js';
import { registerUpdateProjectTool } from './tools/update-project.js';
import { registerThingsSummaryTool } from './tools/things-summary.js';
import { registerExportJsonTool } from './tools/export-json.js';

const server = new McpServer({
  name: 'things-mcp',
  version: '1.0.0'
});

// Register all tools
registerAddTodoTool(server);
registerAddProjectTool(server);
registerUpdateTodoTool(server);
registerUpdateProjectTool(server);
registerThingsSummaryTool(server);
registerExportJsonTool(server);

// Add a resource that provides information about the server
server.resource(
  'server-info',
  'things-mcp://info',
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: JSON.stringify({
        name: 'Things MCP Server',
        version: '1.0.0',
        description: 'MCP server for Things.app integration on macOS',
        platform: process.platform,
        authTokenRequired: !!process.env.THINGS_AUTH_TOKEN,
        availableTools: [
          'add_todo',
          'add_project', 
          'update_todo',
          'update_project',
          'things_summary',
          'export_json',
        ]
      }, null, 2)
    }]
  })
);

async function main(): Promise<void> {
  try {
    // Check if running on macOS
    if (process.platform !== 'darwin') {
      logger.warn('Things URL scheme is only supported on macOS', { platform: process.platform });
    }
    
    // Check for auth token (required for update operations)
    const hasAuthToken = !!process.env.THINGS_AUTH_TOKEN;
    if (!hasAuthToken) {
      logger.warn('THINGS_AUTH_TOKEN not set - update operations will fail');
    }
    
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    logger.info('Things MCP server started successfully', {
      platform: process.platform,
      hasAuthToken,
      toolCount: 6
    });
  } catch (error) {
    logger.error('Failed to start server', { error: error instanceof Error ? error.message : error });
    process.exit(1);
  }
}

// Handle process termination gracefully
process.on('SIGINT', () => {
  logger.info('Received SIGINT, shutting down gracefully');
  process.exit(0);
});

process.on('SIGTERM', () => {
  logger.info('Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

main().catch((error) => {
  logger.error('Unhandled error in main', { error: error instanceof Error ? error.message : error });
  process.exit(1);
});