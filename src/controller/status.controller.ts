import { Request, Response } from "express";
import { Status } from "../entity/Status.entity";
import { EmailNotif } from "../entity/EmailNotif.entity";
import { SmsNotif } from "../entity/SmsNotif.entity";
import { getRepository } from "typeorm";
import { Agency } from "../entity/Agency.entity";
import { AgencyType } from "../entity/AgencyType.entity";

// Entity Repository
const agencyRepo = getRepository(Agency);
const statusRepo = getRepository(Status);
const agencyTypeRepo = getRepository(AgencyType);
const emailRepo = getRepository(EmailNotif);
const smsRepo = getRepository(SmsNotif);

// Transum Generator

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let aaa = Math.floor(Math.random() * (999 - 100 + 1) + 100);
let sn = Math.floor(Math.random() * 90 + 10);

// Query builder

let statusQuery = async () => {
	return await statusRepo.find({
		relations: ["email", "sms"],
	});
};

// Controllers
export const createNotif = async (req: Request, res: Response) => {
	let statusNum = await statusRepo.find();
	let nnn = String(statusNum.length + 1).padStart(3, "0");
	let statusId = `DICT-${year}-${month}-${nnn}-${aaa}`;
	let batchId = `DICT-${year}-${month}-${nnn}`;
	let emailId = `DICT-${year}-${month}-${nnn}-${aaa}-EN-${sn}`;
	let smsId = `DICT-${year}-${month}-${nnn}-${aaa}-SN-${sn}`;

	const notif = req.body.notif;

	try {
		let agencyFound = await agencyRepo.findOne({
			where: { agency_id: req.body.agencyId },
		});

		if (agencyFound) {
			let statusArr = [];

			for (let i = 0; i < notif.length; i++) {
				let statusToAdd = statusRepo.create({
					status_id: statusId,
					batch_id: batchId,
					status: notif[i].status,
					mapping: notif[i].mapping,
					agency: agencyFound,
					email: [
						{
							email_id: emailId,
							notification: notif[i].email,
							agency: agencyFound,
						},
					],
					sms: [
						{
							sms_id: smsId,
							notification: notif[i].sms,
							agency: agencyFound,
						},
					],
				});
				statusArr.push(statusToAdd);
			}
		}

		const agencyToCreate = agencyRepo.create({
			name: req.body.agencyName,
			agency_id: req.body.agencyId,
			mnemonic: req.body.mnemonic,
			type: req.body.agencyType,
			workgroup: req.body.workgroupId,
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

		let statusArr = [];

		for (let i = 0; i < notif.length; i++) {
			let statusToAdd = statusRepo.create({
				status_id: statusId,
				batch_id: batchId,
				status: notif[i].status,
				mapping: notif[i].mapping,
				agency: agencyToCreate,
				email: [
					{
						email_id: emailId,
						notification: notif[i].email,
						agency: agencyToCreate,
					},
				],
				sms: [
					{
						sms_id: smsId,
						notification: notif[i].sms,
						agency: agencyToCreate,
					},
				],
			});
			statusArr.push(statusToAdd);
		}

		// console.log("--------->", statusArr);
		await statusRepo.save(statusArr);

		return res.send(`ok`);
	} catch (error) {
		console.error(error);
		return res.status(500).send(`Server error`);
	}
};

export const deleteStatus = async (req: Request, res: Response) => {
	try {
		let statusToDelete = await statusRepo.findOneOrFail({
			where: { id: req.params.statusId },
			relations: ["email", "sms"],
		});

		if (!statusToDelete) {
			return res.status(404).json({ error: "Status not found" });
		}

		await statusRepo.softRemove(statusToDelete);

		return res.send("status has been deleted");
	} catch (error) {
		console.error(error);
		return res.status(500).send(`Server error`);
	}
};
