import { Request, Response } from "express";
import { SmsNotif } from "../entity/SmsNotif.entity";
import { getRepository } from "typeorm";

// SMS entity repository
const smsRepo = getRepository(SmsNotif);

// Controller
export const smsUpdate = async (req: Request, res: Response) => {
	try {
		let smsFound = await smsRepo.findOne({
			where: { id: req.params.smsId },
		});

		if (!smsFound) {
			return res.status(404).json({ error: "SMS not found" });
		}

		smsFound.notification = req.body.sms;

		await smsRepo.save(smsFound);

		return res.send(smsFound);
	} catch (error) {
		console.error(error);
		return res.status(500).send(`Server error`);
	}
};
