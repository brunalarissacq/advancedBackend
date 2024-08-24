import {NextFunction, Request, Response} from "express";
import { prisma } from "../prisma";

class CustomerController {

  async verifyIfExist(req: Request, res: Response, next: NextFunction){
    try{
      const id = req.params.id;
      const customer = await prisma.customers.findUnique({
        where: { id: id }
      });

      if(customer == null){
        return res.status(404).json({error: "Could not find costumer"});
      }
      return next();
    } catch (error){
      console.log(error);
      return res.status(500).json({ message: "Internal error", error: error });
    }
  }

  async create(req: Request, res: Response) {
    try {

      const {name, email, document} = req.body;
      const customer = await prisma.customers.create({
        data: {
          name,
          email,
          document
        }
      })
      res.status(201).json({ message: "Costumer has been created", customer: customer});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal error", error: error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {name, email, document} = req.body;
      const id = req.params.id;

      const costumerUpdate = await prisma.customers.update({
        where: {id: id},
        data: {
          name: name,
          email: email,
          document: document
        }
      });

      return res.json({message: "Costumer has been updated", costumer: costumerUpdate});
    } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Internal error", error: error});
    }
  }

  async delete(req: Request, res: Response){
    try {
      const id = req.params.id;

      await prisma.customers.delete({
        where: {id: id}
      });

      return res.status(204).json({message: "Costumer has been deleted"});
    } catch (error){
      console.log(error);
      return res.status(500).json({ message: "Internal error", error: error });
    }
  }

  async findAll(req: Request, res: Response){
    try {
      const customers = await prisma.customers.findMany();
      res.json({customers: customers});
    } catch (error){
      console.log(error);
      return res.status(500).json({ message: "Internal error", error: error });
    }
  }

  async findById(req: Request, res: Response){
    try {
      const id = req.params.id;
      const costumer = await prisma.customers.findUnique({
        where: { id: id }
      });

      res.json({costumer: costumer});

    } catch (error){
      console.log(error);
      return res.status(500).json({ message: "Internal error", error: error });
    }
  }
}

export { CustomerController }