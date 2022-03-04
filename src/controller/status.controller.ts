import { Request, Response } from "express";
import { Status } from "../entity/Status.entity";
import { EmailNotif } from "../entity/EmailNotif.entity";
import { SmsNotif } from "../entity/SmsNotif.entity";
import { getRepository } from "typeorm";
import { Agency } from "../entity/Agency.entity";

// Entity Repository
const agencyRepo = getRepository(Agency);
const statusRepo = getRepository(Status);
const emailRepo = getRepository(EmailNotif);
const smsRepo = getRepository(SmsNotif);

// Transum Generator

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let aaa = Math.floor(Math.random() * (999 - 100 + 1) + 100);
let sn = Math.floor(Math.random() * 90 + 10);

// Controllers
export const createNotif = async (req: Request, res: Response) => {
	let statusNum = await statusRepo.find();
	let nnn = String(statusNum.length + 1).padStart(3, "0");
	let statusId = `DICT-${year}-${month}-${nnn}-${aaa}`;
	let batchId = `DICT-${year}-${month}-${nnn}`;
	let emailId = `DICT-${year}-${month}-${nnn}-${aaa}-EN-${sn}`;
	let smsId = `DICT-${year}-${month}-${nnn}-${aaa}-SN-${sn}`;

	let notif = req.body.notif;

	try {
		let agencyFound = await agencyRepo.findOne({
			where: { id: req.body.agencyId },
		});

		if (!agencyFound) {
			return res.status(404).json({ error: "Agency not found" });
		}

		let statusArr = [];
		let emailArr = [];
		let smsArr = [];

		for (let i = 0; i < notif.length; i++) {
			let statusToAdd = statusRepo.create({
				status_id: statusId,
				batch_id: batchId,
				status: notif[i].status,
				mapping: notif[i].mapping,
				agency: agencyFound,
			});

			let emailToAdd = emailRepo.create({
				email_id: emailId,
				notification: notif[i].email,
				status: statusToAdd,
				agency: agencyFound,
			});

			let smsToAdd = smsRepo.create({
				sms_id: smsId,
				notification: notif[i].sms,
				status: statusToAdd,
				agency: agencyFound,
			});
			statusArr.push(statusToAdd);
			emailArr.push(emailToAdd);
			smsArr.push(smsToAdd);
		}

		await statusRepo.save(statusArr);
		await emailRepo.save(emailArr);
		await smsRepo.save(smsArr);

		return res.send("ok");
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
