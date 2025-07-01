import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    console.log('Contact form submission received')
    const { name, email, phone, subject, message } = await request.json()
    
    console.log('Form data:', { name, email, phone: phone || 'Not provided', subject })

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Validation failed - missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    console.log('Validation passed, creating email transporter...')

    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
      },
    })

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'supunrandika4@gmail.com', // Lahiru's email
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #555; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h3 style="color: #555; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #666;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background-color: #f0f8ff; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              This email was sent from the contact form on Lahiru Laddusinghe Photography website.
            </p>
          </div>
        </div>
      `,
      // Also send a plain text version
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Subject: ${subject}
        
        Message:
        ${message}
        
        This email was sent from the contact form on Lahiru Laddusinghe Photography website.
      `,
    }

    // Send email
    console.log('Sending email...')
    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully!', result.messageId)

    return NextResponse.json(
      { message: 'Email sent successfully', messageId: result.messageId },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    
    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Detailed error:', errorMessage)
    
    return NextResponse.json(
      { 
        error: 'Failed to send email', 
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
} 