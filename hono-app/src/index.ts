import { Hono } from 'hono'

const app = new Hono()

async function authMiddleware(c:any,next:any){
    if(c.req.header("Authorization")){
      // Validation stuff
      await next()
    } else {
      return c.text("You are not Authorized");
    }
  
}

app.use(authMiddleware)  // run for every req

// app.get('/', authMiddleware, async(c) => {  // run for specific req
app.get('/', async(c) => {
  console.log(c.req.header("Authorization"));
  console.log(c.req.query('param'));

  return c.text("Hello Hono!")
})


app.post('/submit', async (c) => {
  const body = await c.req.json() 
  console.log(body)  

  return c.json({ message: "Data received", data: body })
})


export default app

