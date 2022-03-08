import { Workgroup } from "../entity/Workgroup.entity";
import { Agency } from "../entity/Agency.entity";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { resolve } from "url";

// Entity Repo
const agencyRepo = getRepository(Agency);
const workgroupRepo = getRepository(Workgroup);

// Controller
export const createWorkgroup = async (req: Request, res: Response) => {
	try {
		let foundWorkgroup = await workgroupRepo.findOne({
			where: { name: req.body.workgroup },
		});

		if (foundWorkgroup) {
			return res.status(409).send(`Conflict: workgroup already exist`);
		}

		let workgroupToAdd = workgroupRepo.create({
			name: req.body.workgroup,
		});

		await workgroupRepo.save(workgroupToAdd);
	} catch (error) {
		console.error(error);
		return res.status(500).send(`Server error`);
	}
};

export const getAllWorkgroup = async (req: Request, res: Response) => {
	try {
		return res.send(
			await workgroupRepo.find({
				relations: ["agency"],
			})
		);
	} catch (error) {
		console.error(error);
		return res.status(500).send(`Server error`);
	}
};

export const getWorkgroup = async (req: Request, res: Response) => {
	try {
		let foundWorkgroup = await workgroupRepo.findOne({
			where: { name: req.body.workgroup },
		});

		if (!foundWorkgroup) {
			return res.status(404).send(`Workgroup not found`);
		}

		return res.send(
			await workgroupRepo.findOne({
				where: { id: req.params.workgroupId },
				relations: ["agency"],
			})
		);
	} catch (error) {
		console.error(error);
		return res.status(500).send(`Server error`);
	}
};
