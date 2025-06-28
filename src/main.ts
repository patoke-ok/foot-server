import express from 'express'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

const mcp = new McpServer({
  name: 'Foot MCP Server',
  version: '1.0.0',
})

// Ejemplo de herramienta mínima (podés eliminar esto si querés)
mcp.tool(
  'say_hello',
  'Devuelve un saludo personalizado',
  z.object({
    name: z.string().describe('Nombre de la persona'),
  }),
  async ({ name }) => {
    return {
      type: 'text',
      content: `¡Hola, ${name}! Bienvenido a Tadis.`,
    }
  }
)

const app = express()
app.use(express.json())

// Este es el endpoint requerido por OpenAI
app.post('/mcp', async (req, res) => {
  const result = await mcp.handleRequest(req.body)
  res.json(result)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`✅ MCP server is running on http://localhost:${PORT}/mcp`)
})

