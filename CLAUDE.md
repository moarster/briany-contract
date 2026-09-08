# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**bpm-api** — API contract for the Briany platform. Source of truth for the REST API.
Spec is authored in OpenAPI 3.1 (`openapi-v1.yaml`); from it the consumer generates Kotlin
server interfaces and a Scalar reference is rendered for humans.


## Repository Structure

| File                                 | Role                                                                                                                                              |
|--------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `rest/openapi-v1.yaml`               | The contract itself. OpenAPI 3.1.                                                                                                                 |
| `.spectral.cjs`                      | Spectral ruleset — extends `oas:recommended`, enforces `operationId`, `tags`, `x-audience` values, `x-implemented` type, PascalCase schema names. |
| `package.json` / `package-lock.json` | npm deps and scripts (`lint`, `lint:ci`, `preview`, `changelog`).                                                                                 |
| `commitlint.config.js`               | Conventional Commits validation (types: feat, fix, docs, refactor, chore, ci; PascalCase scope).                                                  |
| `.editorconfig`                      | Editor formatting defaults (UTF-8, LF, 2-space YAML/JSON indent).                                                                                 |
| `docker-compose.yml`                 | Scalar container for the dev stand (`scalar.briany.ru`, Traefik-routed).                                                                          |
| `.vscode/extensions.json`            | Recommended VS Code extensions (OpenAPI, Spectral).                                                                                               |
| `.gitignore`                         | Ignores `node_modules/`, `.spectral-cache/`, `spectral-report.xml`, IDE/build noise.                                                              |

## Tech Stack

- OpenAPI 3.1 (spec format)
- Node.js 22 (CI image: `node:22-slim`)
- Spectral CLI 6.15.1 (`@stoplight/spectral-cli`) for linting
- `openapi-generator-cli` 7.21.0 for schema validation (and consumer-side codegen)
- Scalar (`scalarapi/api-reference:latest`) for rendered documentation



## Rules

- Descriptions are in **English**.
- Do not invent descriptions — anchor every description in official documentation.
- New operations must carry `operationId` and exactly one `tag` (Spectral enforces this).
- Schema names must be PascalCase (Spectral warns).
- If you add a new vendor extension, document it in the table above.

## Vendor extensions

| Extension | Where | Meaning |
|---|---|---|
| `x-audience` | tag | Intended consumer of the tag's operations. |
| `x-implemented` | tag | Whether the backend implements the tag's operations yet. |
| `x-spring-paginated` | operation | Generate Spring `Pageable` for the operation. |
| `x-with-principal` | operation | The operation resolves against the authenticated principal. |
| `x-kotlin-implements` / `-fields` | schema | Generated DTO implements the named Kotlin interface. |

### Modelling-time XML namespaces

Not part of this contract's payloads, but produced by clients of it and recorded here so
the shape is not reinvented: `http://briany.ru/bpmn` (prefix `briany`) carries
`briany:descriptorId` and `briany:descriptorVersion` on a BPMN element, pinning it to the
`BpmnElementDescriptor` revision it was configured with. Flowable ignores attributes in
unknown namespaces, so these are inert at runtime.
- Commit messages must follow Conventional Commits format (commitlint enforces this).
