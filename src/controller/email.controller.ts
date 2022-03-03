import { Request, Response } from "express";
import { EmailNotif } from "../entity/EmailNotif.entity";
import { getRepository } from "typeorm";

// Email entity repo
const emailRepo = getRepository(EmailNotif);

// Controller
export const updateEmail = async (req: Request, res: Response) => {
	try {
		let emailFound = await emailRepo.findOne({
			where: { id: req.params.emailId },
		});

		if (!emailFound) {
			return res.status(404).json({ error: "Email not found" });
		}

		emailFound.notification = req.body.email;

		await emailRepo.save(emailFound);

		return res.send(emailFound);
	} catch (error) {
		console.error(error);
		return res.status(500).send(`Server error`);
	}
};
