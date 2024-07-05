import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  const body = c.req.parseBody()
  console.log(body)
  return c.json({
    message: 'Hello Hono!'
  })
})

export default app
