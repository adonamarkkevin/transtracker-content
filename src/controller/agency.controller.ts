import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Agency } from "../entity/Agency.entity";
import { AgencyType } from "../entity/AgencyType.entity";
import { paginateResponse } from "../helper/paginate.helper";

// Entity Repo
const agencyRepo = getRepository(Agency);
const agencyTypeRepo = getRepository(AgencyType);

export const agencyTypeCreate = async (req: Request, res: Response) => {
	try {
		const agencyToCreate = agencyRepo.create({
			name: req.body.agencyName,
			mnemonic: req.body.mnemonic,
			type: req.body.agencyType,
		});

		await agencyRepo.save(agencyToCreate);

		if (agencyToCreate.type === "localized") {
			const agencyTypeToCreate = agencyTypeRepo.create({
				region: req.body.region,
				province: req.body.province,
				municipality: req.body.municipality,
				agency: agencyToCreate,
			});

			await agencyTypeRepo.save(agencyTypeToCreate);
		}

		return res.send(agencyToCreate);
	} catch (error) {
		console.log(error);
		return res.status(500).send(`Server error`);
	}
};

export const agencyToDelete = async (req: Request, res: Response) => {
	try {
		let agencyToDelete = await agencyRepo.findOneOrFail({
			where: { id: req.params.agencyId },
			relations: ["status"],
		});

		if (!agencyToDelete) {
			return res.status(404).json({ error: "Agency not found" });
		}

		await agencyRepo.softRemove(agencyToDelete);

		return res.send(`agency has been deleted`);
	} catch (error) {
		console.error(error);
		return res.status(500).send(`Server error`);
	}
};

export const getAllAgencies = async (req: Request, res: Response) => {
	try {
		const take: any = req.query.take || 10;
		const page: any = req.query.page || 1;
		const skip = (page - 1) * take;

		const allAgency = await agencyRepo.findAndCount({
			relations: ["agency_type", "email", "sms", "status"],
			take: take,
			skip: skip,
		});

		return res.send(paginateResponse(allAgency, page, take));
	} catch (error) {
		console.error(error);
		return res.status(500).send(`Server error`);
	}
};

export const getAgency = async (req: Request, res: Response) => {
	try {
		let foundAgency = await agencyRepo.findOne({
			where: { id: req.params.agencyId },
			relations: ["agency_type", "email", "sms"],
		});

		if (!foundAgency) {
			return res.status(404).json({ error: "Agency not found" });
		}

		return res.send(foundAgency);
	} catch (error) {
		console.error(error);
		return res.status(500).send(`Server error`);
	}
};

export const updateAgency = async (req: Request, res: Response) => {
	try {
		let foundAgency = await agencyRepo.findOne({
			where: { id: req.params.agencyId },
		});

		if (!foundAgency) {
			return res.status(404).json({ error: "Agency not found" });
		}

		foundAgency.name = req.body.agencyName;
		foundAgency.type = req.body.agencyType;
		foundAgency.mnemonic = req.body.mnemonic;

		if (foundAgency.type == "localized") {
			let foundAgencyType = await agencyTypeRepo.findOne({
				where: { agency: foundAgency },
			});

			foundAgencyType.region = req.body.region;
			foundAgencyType.province = req.body.province;
			foundAgencyType.municipality = req.body.municipality;

			await agencyTypeRepo.save(foundAgencyType);
		}

		await agencyRepo.save(foundAgency);

		return res.send(foundAgency);
	} catch (error) {
		console.error(error);
		return res.status(500).send(`Server error`);
	}
};
