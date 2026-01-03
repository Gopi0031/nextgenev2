import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { fullName, email, phone, city, state, businessName, experience, investment, message } = await request.json();

    // Validate fields
    if (!fullName || !email || !phone || !city || !state || !businessName || !experience || !investment) {
      return new Response(
        JSON.stringify({ error: "All required fields must be filled" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify env vars exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("❌ Email credentials not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Test connection
    try {
      await transporter.verify();
      console.log("✓ SMTP connection verified");
    } catch (verifyError) {
      console.error("❌ SMTP verification failed:", verifyError.message);
      return new Response(
        JSON.stringify({ error: "Email authentication failed" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Email to admin (you)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `🏢 New Dealership Application - ${city}, ${state}`,
      html: `
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #FAF8F1; }
              .container { max-width: 650px; margin: 0 auto; padding: 20px; }
              .card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #007BFF 0%, #A8E600 100%); padding: 40px 24px; text-align: center; }
              .header h1 { margin: 0; color: #F8F9FA; font-size: 28px; font-weight: 700; }
              .header p { margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px; }
              .content { padding: 32px 24px; }
              .section { margin-bottom: 32px; }
              .section-title { font-size: 18px; font-weight: 700; color: #212529; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 3px solid #A8E600; }
              .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
              .field { margin-bottom: 16px; }
              .field-label { display: block; font-size: 12px; font-weight: 700; color: #007BFF; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
              .field-value { font-size: 15px; color: #212529; font-weight: 500; }
              .field-value a { color: #007BFF; text-decoration: none; }
              .field-value a:hover { text-decoration: underline; }
              .highlight-box { background: linear-gradient(135deg, #007BFF 0%, #A8E600 100%); padding: 20px; border-radius: 10px; text-align: center; margin: 24px 0; }
              .highlight-value { font-size: 24px; font-weight: 700; color: #F8F9FA; margin: 8px 0; }
              .highlight-label { font-size: 12px; color: rgba(255,255,255,0.9); text-transform: uppercase; letter-spacing: 1px; }
              .message-box { background: #FAF8F1; border-left: 4px solid #007BFF; padding: 16px; border-radius: 8px; margin-top: 16px; }
              .message-text { font-size: 14px; color: #212529; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word; }
              .footer { background: #212529; padding: 20px 24px; text-align: center; }
              .footer-text { margin: 4px 0; font-size: 12px; color: #F8F9FA; }
              @media (max-width: 600px) {
                .info-grid { grid-template-columns: 1fr; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="card">
                <div class="header">
                  <h1>🏢 New Dealership Application</h1>
                  <p>NextGen EV Partnership Request</p>
                </div>
                
                <div class="content">
                  <div class="section">
                    <div class="section-title">👤 Personal Information</div>
                    <div class="info-grid">
                      <div class="field">
                        <span class="field-label">Full Name</span>
                        <div class="field-value">${fullName}</div>
                      </div>
                      <div class="field">
                        <span class="field-label">Phone Number</span>
                        <div class="field-value">${phone}</div>
                      </div>
                    </div>
                    <div class="field">
                      <span class="field-label">Email Address</span>
                      <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                    </div>
                  </div>

                  <div class="section">
                    <div class="section-title">🏪 Business Information</div>
                    <div class="info-grid">
                      <div class="field">
                        <span class="field-label">Business Name</span>
                        <div class="field-value">${businessName}</div>
                      </div>
                      <div class="field">
                        <span class="field-label">Location</span>
                        <div class="field-value">${city}, ${state}</div>
                      </div>
                      <div class="field">
                        <span class="field-label">Business Experience</span>
                        <div class="field-value">${experience}</div>
                      </div>
                      <div class="field">
                        <span class="field-label">Investment Capacity</span>
                        <div class="field-value" style="color: #A8E600; font-weight: 700;">${investment}</div>
                      </div>
                    </div>
                  </div>

                  ${message ? `
                    <div class="section">
                      <div class="section-title">📝 Additional Information</div>
                      <div class="message-box">
                        <p class="message-text">${message}</p>
                      </div>
                    </div>
                  ` : ''}

                  <div class="highlight-box">
                    <div class="highlight-label">Application Submitted</div>
                    <div class="highlight-value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
                  </div>
                </div>

                <div class="footer">
                  <p class="footer-text">📧 NextGen EV Dealership Management System</p>
                  <p class="footer-text">Reply-To: ${email}</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    const adminResult = await transporter.sendMail(adminMailOptions);
    console.log("✓ Admin email sent:", adminResult.messageId);

    // Email to applicant (confirmation)
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "✅ Dealership Application Received - NextGen EV",
      html: `
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #FAF8F1; }
              .container { max-width: 650px; margin: 0 auto; padding: 20px; }
              .card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
              .header { background: linear-gradient(135deg, #007BFF 0%, #A8E600 100%); padding: 40px 24px; text-align: center; }
              .header h1 { margin: 0; color: #F8F9FA; font-size: 32px; font-weight: 700; }
              .header .icon { font-size: 48px; margin-bottom: 16px; }
              .content { padding: 32px 24px; }
              .greeting { font-size: 18px; color: #212529; margin-bottom: 16px; font-weight: 600; }
              .message-text { font-size: 15px; color: #212529; line-height: 1.8; margin-bottom: 24px; }
              .summary-box { background: linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%); padding: 24px; border-radius: 10px; margin: 24px 0; border-left: 4px solid #007BFF; }
              .summary-title { font-size: 16px; font-weight: 700; color: #212529; margin-bottom: 16px; }
              .summary-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1); }
              .summary-item:last-child { border-bottom: none; }
              .summary-label { font-size: 14px; color: #6b7280; }
              .summary-value { font-size: 14px; color: #212529; font-weight: 600; }
              .next-steps { background: #FAF8F1; padding: 20px; border-radius: 8px; margin: 24px 0; }
              .next-steps-title { font-size: 16px; font-weight: 700; color: #007BFF; margin-bottom: 12px; }
              .next-steps-text { font-size: 14px; color: #212529; line-height: 1.6; }
              .cta-box { text-align: center; margin: 32px 0; }
              .cta-text { font-size: 16px; color: #212529; font-weight: 600; margin-bottom: 16px; }
              .contact-info { font-size: 14px; color: #007BFF; }
              .footer { background: #212529; padding: 24px; text-align: center; }
              .footer-text { margin: 8px 0; font-size: 13px; color: #F8F9FA; }
              .footer-links { margin-top: 16px; }
              .footer-links a { color: #A8E600; text-decoration: none; margin: 0 12px; font-size: 12px; font-weight: 600; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="card">
                <div class="header">
                  <div class="icon">🎉</div>
                  <h1>Thank You for Your Interest!</h1>
                </div>
                
                <div class="content">
                  <p class="greeting">Dear ${fullName},</p>
                  
                  <p class="message-text">
                    We have successfully received your dealership application for <strong>${city}, ${state}</strong>. 
                    Thank you for your interest in partnering with NextGen EV to bring sustainable electric mobility to your region.
                  </p>

                  <div class="summary-box">
                    <div class="summary-title">📋 Application Summary</div>
                    <div class="summary-item">
                      <span class="summary-label">Business Name:</span>
                      <span class="summary-value">${businessName}</span>
                    </div>
                    <div class="summary-item">
                      <span class="summary-label">Location:</span>
                      <span class="summary-value">${city}, ${state}</span>
                    </div>
                    <div class="summary-item">
                      <span class="summary-label">Experience:</span>
                      <span class="summary-value">${experience}</span>
                    </div>
                    <div class="summary-item">
                      <span class="summary-label">Investment:</span>
                      <span class="summary-value" style="color: #A8E600;">${investment}</span>
                    </div>
                  </div>

                  <div class="next-steps">
                    <div class="next-steps-title">⏱️ What Happens Next?</div>
                    <p class="next-steps-text">
                      Our partnerships team will carefully review your application and contact you within <strong>48 hours</strong> at:<br><br>
                      📧 ${email}<br>
                      📞 ${phone}
                    </p>
                  </div>

                  <div class="cta-box">
                    <p class="cta-text">🚀 Join us in revolutionizing electric mobility in India!</p>
                    <div class="contact-info">
                      <strong>Need immediate assistance?</strong><br>
                      📧 partnerships@nextgenev.com<br>
                      📞 +91 9133 913 975
                    </div>
                  </div>
                </div>

                <div class="footer">
                  <p class="footer-text"><strong>NextGen EV - Future of Electric Mobility</strong></p>
                  
                  <div class="footer-links">
                    <a href="http://localhost:3000/products">Our Products</a>
                    <a href="http://localhost:3000/about">About Us</a>
                    <a href="http://localhost:3000/contact">Contact</a>
                  </div>

                  <p class="footer-text" style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #374151;">
                    © 2026 NextGen EV. All rights reserved.<br>
                    <span style="font-size: 11px;">This is an automated confirmation. Please do not reply to this email.</span>
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    const userResult = await transporter.sendMail(userMailOptions);
    console.log("✓ User confirmation sent:", userResult.messageId);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Application submitted successfully. Check your email for confirmation.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Dealership application error:", error.message);
    console.error("Error details:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Failed to submit application",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({ 
      message: "Dealership API endpoint is running",
      status: "OK" 
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
