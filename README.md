# Incident Agent Claude Code Lab

A small TypeScript project for learning and experimenting with **Claude Code and AI agent concepts** through practical examples.

## What This Project Demonstrates

* Claude Code agent workflow
* Agent loops and tool calling
* `CLAUDE.md` project instructions
* Claude Code permissions and settings
* Project, user, and local settings scopes
* Rules
* Skills
* Subagents
* Git worktrees
* Agent Teams concepts
* MCP server and custom tools

## Incident Desk

The demo application manages simple incidents with:

* ID
* Title
* Severity: `LOW`, `MEDIUM`, `HIGH`
* Status: `OPEN`, `INVESTIGATING`, `CLOSED`

It supports operations such as:

* List incidents
* Get incident by ID
* Create incident
* Update incident status
* Delete incident
* Filter high-severity incidents
* Filter open incidents

## Claude Code Structure

```text
.claude/
├── agents/
│   └── security-reviewer.md
├── rules/
│   └── tests.md
├── skills/
│   └── add-feature/
│       └── SKILL.md
└── settings.json

CLAUDE.md
```

`CLAUDE.md` contains general project instructions.

`.claude/rules/` contains instructions for specific parts of the project.

`.claude/skills/` contains reusable workflows.

`.claude/agents/` contains specialized subagents.

`.claude/settings.json` contains shared Claude Code settings and permissions.

`settings.local.json` is ignored because it is user-specific.

## MCP Demo

The project includes a small MCP server:

```text
src/mcp.ts
```

It exposes the Incident Desk functionality to AI applications through MCP.

Example tool:

```text
list-incidents
```

Test the MCP server:

```bash
npx @modelcontextprotocol/inspector npx tsx src/mcp.ts
```

Connect it to Claude Code:

```bash
claude mcp add incident-desk -- npx tsx src/mcp.ts
```

Then inside Claude Code:

```text
Use the incident-desk MCP tool to list all incidents.
```

Flow:

```text
Claude Code
    ↓
MCP
    ↓
Incident MCP Server
    ↓
list-incidents tool
    ↓
Incident application
```

## Run Tests

```bash
npx vitest run
```

## Main Learning Idea

The project helped connect the main AI-agent concepts:

```text
LLM → reasoning

Tools → actions

Agent loop → reason → act → observe → repeat

Harness → manages the LLM, tools, context and permissions

Agent → the complete working system

MCP → standard way to connect AI applications with external tools and data
```
