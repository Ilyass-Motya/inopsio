import { z } from 'zod'
import { isValidPhoneNumber } from 'libphonenumber-js'

export const contactFormSchema = z.object({
  firstName: z.string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  lastName: z.string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  jobTitle: z.string()
    .min(1, 'Job title is required')
    .min(2, 'Job title must be at least 2 characters')
    .max(100, 'Job title must be less than 100 characters'),
  
  businessEmail: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
    .refine((email) => {
      // Reject common free email domains that might be spam
      const blockedDomains = ['tempmail.com', 'throwaway.com']
      const domain = email.split('@')[1]?.toLowerCase()
      return !blockedDomains.includes(domain || '')
    }, {
      message: 'Please use a business email address'
    }),
  
  company: z.string()
    .min(1, 'Company name is required')
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name must be less than 100 characters'),
  
  industry: z.string()
    .min(1, 'Industry is required'),
  
  countryRegion: z.string()
    .min(1, 'Country is required'),
  
  city: z.string()
    .min(1, 'City is required')
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'City can only contain letters, spaces, hyphens, and apostrophes'),
  
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine((phone) => {
      // Accept E.164 format (e.g., +1234567890) or formatted phone
      const cleanPhone = phone.replace(/\s|-|\(|\)/g, '')
      // E.164 format: + followed by 1-15 digits
      const e164Regex = /^\+?[1-9]\d{1,14}$/
      return e164Regex.test(cleanPhone) || phone.length >= 7
    }, {
      message: 'Please enter a valid phone number'
    })
    .refine((phone) => {
      // Use libphonenumber-js for validation if phone is in E.164 format
      try {
        if (phone.startsWith('+')) {
          return isValidPhoneNumber(phone)
        }
        return true // Allow formatted numbers, will validate on submit
      } catch {
        return true
      }
    }, {
      message: 'Invalid phone number format'
    }),
  
  phoneCode: z.string()
    .optional(),
  
  message: z.string()
    .min(1, 'Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(100, 'Message must be less than 100 characters'),
  
  agreeToTerms: z.boolean()
    .refine((val) => val === true, {
      message: 'You must agree to the privacy policy'
    }),
  
  recaptchaToken: z.string()
    .optional()
}).superRefine((data, ctx) => {
  // Enhanced phone validation - react-phone-number-input provides E.164 format
  if (data.phone) {
    try {
      // If phone is in E.164 format (starts with +), validate directly
      if (data.phone.startsWith('+')) {
        if (!isValidPhoneNumber(data.phone)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid phone number format',
            path: ['phone']
          })
        }
      } else if (data.phoneCode) {
        // Legacy support: combine code + number if not E.164
        const fullNumber = `${data.phoneCode}${data.phone.replace(/\s|-|\(|\)/g, '')}`
        if (!isValidPhoneNumber(fullNumber)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Invalid phone number format for selected country',
            path: ['phone']
          })
        }
      }
    } catch {
      // If validation fails, allow it (basic format already validated)
    }
  }
})

export type ContactFormData = z.infer<typeof contactFormSchema>

