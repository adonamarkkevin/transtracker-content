import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Agency } from "../entity/Agency";
import { AgencyType } from "../entity/AgencyType";

// Paginate function
const paginateResponse = (data: any, page: any, limit: any) => {
	const [result, total] = data;
	const lastPage = Math.ceil(total / Number(limit));
	const nextPage = Number(page) + 1 > lastPage ? null : Number(page) + 1;
	const prevPage = Number(page) - 1 < 1 ? null : Number(page) - 1;
	return {
		data: [...result],
		count: total,
		perPage: Number(limit),
		currentPage: Number(page),
		nextPage: nextPage,
		prevPage: prevPage,
		lastPage: lastPage,
	};
};

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

export const getAllAgencies = async (req: Request, res: Response) => {
	try {
		const agencyRepo = getRepository(Agency);
		const take: any = req.query.take || 10;
		const page: any = req.query.page || 1;
		const skip = (page - 1) * take;

		const allAgency = await agencyRepo.findAndCount({
			relations: ["agency_type"],
			take: take,
			skip: skip,
		});

		return res.send(paginateResponse(allAgency, page, take));
	} catch (error) {
		console.error(error);
		return res.status(500).send(`Server error`);
	}
};
