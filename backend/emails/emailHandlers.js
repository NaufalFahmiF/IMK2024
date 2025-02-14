import { mailtrapClient, sender } from "../lib/mailtrap.js";
import {
	createCommentNotificationEmailTemplate,
	createConnectionAcceptedEmailTemplate,
	createWelcomeEmailTemplate,
} from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, profileUrl) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Selamat Datang di UGCorner",
			html: createWelcomeEmailTemplate(name, profileUrl),
			category: "welcome",
		});

		console.log("Email berhasil dikirim", response);
	} catch (error) {
		throw error;
	}
};

export const sendCommentNotificationEmail = async (
	recipientEmail,
	recipientName,
	commenterName,
	postUrl,
	commentContent
) => {
	const recipient = [{ email: recipientEmail }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Komentar Baru pada Postingan Anda",
			html: createCommentNotificationEmailTemplate(recipientName, commenterName, postUrl, commentContent),
			category: "comment_notification",
		});
		console.log("Email notifikasi komentar berhasil dikirim", response);
	} catch (error) {
		throw error;
	}
};

export const sendConnectionAcceptedEmail = async (senderEmail, senderName, recipientName, profileUrl) => {
	const recipient = [{ email: senderEmail }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: `${recipientName} menerima permintaan koneksi Anda`,
			html: createConnectionAcceptedEmailTemplate(senderName, recipientName, profileUrl),
			category: "connection_accepted",
		});
	} catch (error) {}
};
