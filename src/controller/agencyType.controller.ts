import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Agency } from "../entity/Agency";
import { AgencyType } from "../entity/AgencyType";

export const agencyTypeCreate = async (req: Request, res: Response) => {
	const agencyRepo = getRepository(Agency);
	const agencyTypeRepo = getRepository(AgencyType);

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
		console.error(error);
		return res.status(500).send(`Server error`);
	}
};

export const agencyToDelete = async (req: Request, res: Response) => {
	const agencyRepo = getRepository(Agency);

	try {
		let agencyToDelete = await agencyRepo.findOne({
			where: { id: req.params.agencyId },
		});

		if (!agencyToDelete) {
			return res.status(404).json({ error: "Agency not found" });
		}

		agencyRepo
			.createQueryBuilder("agency")
			.where("agency.id = agency_id", { agency_id: req.params.agencyId })
			.softDelete();

		return res.send(`${agencyToDelete.name} deleted`);
	} catch (error) {
		console.error(error);
		return res.status(500).send(`Server error`);
	}
};
