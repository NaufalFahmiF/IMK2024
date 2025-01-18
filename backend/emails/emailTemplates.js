export function createWelcomeEmailTemplate(name, profileUrl) {
	return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Selamat Datang di UGCorner</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #763996, #b76cb7); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <img src="https://raw.githubusercontent.com/NaufalFahmiF/IMK2024/refs/heads/second/frontend/public/ugcorner.png" alt="UGCorner Logo" style="padding: 10px; background-color: white; width: 150px; margin-bottom: 20px;border-radius: 10px;">
      <h1 style="color: white; margin: 0; font-size: 28px;">Selamat Datang di UGCorner!</h1>
    </div>
    <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <p style="font-size: 18px; color: #763996;"><strong>Hai ${name},</strong></p>
      <p>Selamat bergabung di UGCorner! Kami sangat senang menyambut Anda di komunitas seru tempat mahasiswa Gunadarma berkumpul untuk berdiskusi, bertanya, dan berbagi pengalaman selama berkuliah.</p>
      <p>Jangan ragu untuk berbagi cerita, bertanya, atau berdiskusi seputar kehidupan kampus. Mari bersama-sama menciptakan lingkungan yang positif dan inspiratif!</p>
      <p>Yuk, lengkapi profil Anda dan mulai terhubung dengan teman-teman seangkatan, kakak tingkat, dan alumni Gunadarma lainnya.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${profileUrl}" style="background-color: #763996; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">Lengkapi Profil Anda</a>
      </div>
      <p>Jika Anda memiliki pertanyaan atau membutuhkan bantuan, tim dukungan kami selalu siap membantu.</p>
      <p>Salam hangat,<br>UGCorner</p>
    </div>
  </body>
  </html>
  `;
}

export const createConnectionAcceptedEmailTemplate = (senderName, recipientName, profileUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Permintaan Koneksi Diterima</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #763996, #b76cb7); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <img src="https://raw.githubusercontent.com/NaufalFahmiF/IMK2024/refs/heads/second/frontend/public/ugcorner.png" alt="UGCorner Logo" style="padding: 10px; background-color: white; width: 150px; margin-bottom: 20px;border-radius: 10px;"/>
    <h1 style="color: white; margin: 0; font-size: 28px;">Berhasil Terhubung!</h1>
  </div>
  <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <p style="font-size: 18px; color: #763996;"><strong>Halo ${senderName},</strong></p>
    <p>Kabar gembira! <strong>${recipientName}</strong> telah menerima permintaan koneksi Anda di UGCorner.</p>
    <div style="background-color: #f3f6f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="font-size: 16px; margin: 0;"><strong>Apa yang bisa dilakukan selanjutnya?</strong></p>
      <ul style="padding-left: 20px;">
        <li>Lihat profil lengkap dari ${recipientName}.</li>
        <li>Mulai berinteraksi</li>
        <li>Jelajahi koneksi dengan minat yang sama</li>
      </ul>
    </div>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${profileUrl}" style="background-color: #763996; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">Lihat Profil ${recipientName}</a>
    </div>
    <p>Selamat menjelajah koneksi~</p>
    <p>Salam hangat,<br>UGCorner</p>
  </div>
</body>
</html>
`;

export const createCommentNotificationEmailTemplate = (recipientName, commenterName, postUrl, commentContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Komentar Baru di Postingan Anda</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #763996, #b76cb7); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <img src="https://raw.githubusercontent.com/NaufalFahmiF/IMK2024/refs/heads/second/frontend/public/ugcorner.png" alt="UGCorner Logo" style="padding: 10px; background-color: white; width: 150px; margin-bottom: 20px;border-radius: 10px;"/>
    <h1 style="color: white; margin: 0; font-size: 28px;">Komentar Baru di Postingan Anda</h1>
  </div>
  <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
    <p style="font-size: 18px; color: #763996;"><strong>Halo ${recipientName},</strong></p>
    <p>${commenterName} mengomentari postingan Anda:</p>
    <div style="background-color: #f3f6f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="font-style: italic; margin: 0;">"${commentContent}"</p>
    </div>
    <div style="text-align: center; margin: 30px 0;">
      <a href=${postUrl} style="background-color: #763996; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; transition: background-color 0.3s;">Lihat Komentar</a>
    </div>
    <p>Selamat berinteraksi dengan jaringan Anda! Tanggapi komentar dan ciptakan diskusi yang menarik.</p>
    <p>Salam hangat,<br>UGCorner</p>
  </div>
</body>
</html>
`;
