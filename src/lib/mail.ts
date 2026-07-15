import nodemailer from 'nodemailer'

interface InquiryData {
  name: string
  email: string
  phone: string
  message: string
  propertyId?: string | null
}

export async function sendInquiryEmail(data: InquiryData) {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'dealriterealtyoperations@gmail.com'

  const hasCredentials = smtpHost && smtpPort && smtpUser && smtpPass

  const subject = `New Website Inquiry from ${data.name}`
  const text = `
    New Inquiry Received:
    Name: ${data.name}
    Email: ${data.email}
    Phone: ${data.phone}
    Message: ${data.message}
    Property ID: ${data.propertyId || 'None'}
  `
  
  // Clean up phone number for WhatsApp URL (digits only, e.g. 2348110191956)
  const cleanPhone = data.phone.replace(/[^0-9]/g, '')
  // If the number doesn't start with country code, default prefix 234 (Nigeria)
  const whatsappPhone = cleanPhone.startsWith('0') 
    ? '234' + cleanPhone.substring(1) 
    : cleanPhone.startsWith('234') 
      ? cleanPhone 
      : '234' + cleanPhone

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #334155; max-width: 600px; margin: 0 auto; border: 1px solid #f1f5f9; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);">
      <div style="background-color: #0c1d33; padding: 32px 24px; text-align: center; border-bottom: 4px solid #FC6600;">
        <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 0.05em;">DEALRITE REALTY LIMITED</h2>
        <p style="color: #ff8533; margin: 8px 0 0 0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em;">New Customer Inquiry Alert</p>
      </div>
      <div style="padding: 32px 24px; background-color: #ffffff;">
        <p style="font-size: 15px; font-weight: 600; color: #1e293b; margin: 0 0 16px 0;">Hello Operations Team,</p>
        <p style="font-size: 14px; color: #64748b; margin: 0 0 24px 0; leading-relaxed;">A visitor has just submitted the contact form on your website. The entry has been saved to the database. Below are the inquiry details:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #0c1d33; width: 30%;">Full Name</td>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #0c1d33;">Email Address</td>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;"><a href="mailto:${data.email}" style="color: #FC6600; text-decoration: none; font-weight: 600;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #0c1d33;">Phone Number</td>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;"><a href="tel:${data.phone}" style="color: #FC6600; text-decoration: none; font-weight: 600;">${data.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #0c1d33;">Interested In</td>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155; font-weight: 700; text-transform: uppercase;">${data.propertyId || 'General Inquiry'}</td>
          </tr>
        </table>

        <div style="background-color: #f8fafc; border-left: 4px solid #FC6600; padding: 20px; border-radius: 0 16px 16px 0; margin-bottom: 32px;">
          <h4 style="margin: 0 0 8px 0; color: #0c1d33; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">Message Payload:</h4>
          <p style="margin: 0; font-size: 14px; color: #475569; white-space: pre-wrap; font-style: italic; line-height: 1.5;">"${data.message || 'No message content provided.'}"</p>
        </div>
        
        <div style="text-align: center; margin-top: 10px;">
          <a href="mailto:${data.email}" style="background-color: #0c1d33; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 12px; display: inline-block; text-transform: uppercase; letter-spacing: 0.05em; margin-right: 10px; border: 1px solid #0c1d33; box-shadow: 0 4px 6px -1px rgba(12, 29, 51, 0.15);">Reply via Email</a>
          <a href="https://wa.me/${whatsappPhone}" target="_blank" style="background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 700; font-size: 12px; display: inline-block; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid #16a34a; box-shadow: 0 4px 6px -1px rgba(22, 163, 74, 0.15);">WhatsApp Client</a>
        </div>
      </div>
      <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 11px; color: #94a3b8; font-weight: 500;">
        This notification was automatically dispatched from the DealRite Realty portal server.
      </div>
    </div>
  `

  if (!hasCredentials) {
    console.log('--- LOCAL SMTP FALLBACK LOG ---')
    console.log('Recipient:', receiverEmail)
    console.log('Subject:', subject)
    console.log('Content:', text)
    console.log('--------------------------------')
    return { success: true, logged: true }
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: parseInt(smtpPort),
    secure: parseInt(smtpPort) === 465, // true for port 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  try {
    const info = await transporter.sendMail({
      from: `"DealRite Inquiries Portal" <${smtpUser}>`,
      to: receiverEmail,
      subject,
      text,
      html,
      replyTo: data.email
    })
    console.log('Inquiry email successfully delivered:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (err) {
    console.error('SMTP email transmission failed:', err)
    throw err
  }
}
