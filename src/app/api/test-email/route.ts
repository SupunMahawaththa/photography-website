import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function GET() {
  try {
    console.log('Testing email configuration...')
    
    // Check if environment variables are loaded
    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASS
    
    console.log('EMAIL_USER:', emailUser ? 'Set' : 'Not set')
    console.log('EMAIL_PASS:', emailPass ? 'Set (length: ' + emailPass.length + ')' : 'Not set')
    
    if (!emailUser || !emailPass) {
      return NextResponse.json({
        error: 'Environment variables not set',
        emailUser: !!emailUser,
        emailPass: !!emailPass
      }, { status: 500 })
    }
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })
    
    // Test the connection
    await transporter.verify()
    
    console.log('Email configuration is working!')
    
    return NextResponse.json({
      message: 'Email configuration is working!',
      emailUser: emailUser,
      emailPassLength: emailPass.length
    })
    
  } catch (error) {
    console.error('Email test failed:', error)
    return NextResponse.json({
      error: 'Email test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 