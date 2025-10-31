import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  firstName: string
  lastName: string
  jobTitle: string
  businessEmail: string
  company: string
  industry: string
  countryRegion: string
  city: string
  phone: string
  phoneCode: string
  message: string
  recaptchaToken?: string
}

// Rate limiting: simple in-memory store (for production, use Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5 // Max 5 requests per window

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  record.count++
  return true
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY
  if (!secretKey) {
    // In development, skip verification if secret not set
    if (process.env.NODE_ENV === 'development') {
      return true
    }
    return false
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `secret=${secretKey}&response=${token}`
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('reCAPTCHA verification error:', error)
    return false
  }
}

async function sendToEmailService(formData: ContactFormData): Promise<void> {
  const emailServiceUrl = process.env.EMAIL_SERVICE_URL || process.env.NEXT_PUBLIC_API_URL
  if (!emailServiceUrl) {
    console.warn('Email service URL not configured')
    return
  }

  try {
    await fetch(`${emailServiceUrl}/email/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EMAIL_SERVICE_API_KEY || ''}`
      },
      body: JSON.stringify({
        to: process.env.CONTACT_EMAIL || 'contact@inopsio.com',
        subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
        template: 'contact-form',
        data: formData
      })
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Email service error:', error)
    // Don't fail the request if email fails
  }
}

async function sendToCRMService(formData: ContactFormData): Promise<void> {
  const crmServiceUrl = process.env.CRM_SERVICE_URL || process.env.NEXT_PUBLIC_API_URL
  if (!crmServiceUrl) {
    // eslint-disable-next-line no-console
    console.warn('CRM service URL not configured')
    return
  }

  try {
    await fetch(`${crmServiceUrl}/crm/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CRM_SERVICE_API_KEY || ''}`
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.businessEmail,
        phone: `${formData.phoneCode}${formData.phone}`,
        company: formData.company,
        jobTitle: formData.jobTitle,
        industry: formData.industry,
        location: {
          country: formData.countryRegion,
          city: formData.city
        },
        message: formData.message,
        source: 'website-contact-form'
      })
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('CRM service error:', error)
    // Don't fail the request if CRM fails
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown'

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body: ContactFormData = await request.json()

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'jobTitle', 'businessEmail', 'company', 'industry', 'countryRegion', 'city', 'phone', 'message']
    for (const field of requiredFields) {
      if (!body[field as keyof ContactFormData]?.trim()) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Verify email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.businessEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA if provided
    if (body.recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(body.recaptchaToken)
      if (!isValidRecaptcha) {
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed' },
          { status: 400 }
        )
      }
    }

    // Send to email service and CRM (non-blocking)
    Promise.all([
      sendToEmailService(body),
      sendToCRMService(body)
    ]).catch(err => {
      // eslint-disable-next-line no-console
      console.error('Background service errors:', err)
    })

    return NextResponse.json(
      { 
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon.' 
      },
      { status: 200 }
    )

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again later.' },
      { status: 500 }
    )
  }
}

