import express from 'express';
import { PrismaClient} from "@prisma/client";

const app = express();

app.use(express.json());
const prisma = new PrismaClient();

app.get('/customers', async (req, res) => {
  const customers = await prisma.customers.findMany();
  res.json(customers);
});

app.get('/customers/:id', async (req, res) => {
  const id = req.params.id;
  const costumer = await prisma.customers.findUnique({
    where: { id: id }
  });

  if (costumer == null) {
    res.status(404).json({ error: "Could not find customer" });
  } else {
    res.json(costumer);
  }

})

app.post('/customers', async (req, res) => {
  const {name, email, document} = req.body;
  const customer = await prisma.customers.create({
    data: {
      name,
      email,
      document
    }
  })
  res.status(201).json(customer);
})

app.put('/customers/:id', async (req, res) => {
  const {name, email, document} = req.body;
  const id = req.params.id;
  const costumer = await prisma.customers.findUnique({
    where: { id: id }
  });

  if (costumer == null) {
    return res.status(404).json({error: "Could not find costumer"});
  }

  const costumerUpdate = await prisma.customers.update({
    where: {id: id},
    data: {
      name: name,
      email: email,
      document: document
    }
  });

   return res.json({message:"Costumer has been updated", costumer:costumerUpdate});
})

app.delete('/customers/:id', async (req, res) => {
  const id = req.params.id;
  const costumer = await prisma.customers.findUnique({
    where: { id: id }
  });

  if (costumer == null) {
    return res.status(404).json({error: "Could not find customer"});
  }

  await prisma.customers.delete({
    where: {id: id}
  });

  return res.status(204).json({message: "Costumer has been deleted"});
})

app.listen(4000, () => {console.log(`App is running on port 4000`)});