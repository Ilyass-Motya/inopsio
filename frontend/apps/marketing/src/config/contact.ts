export interface ContactConfig {
  responseTime: string
  messageMaxLength: number
  submissionTimeout: number
  officeAddress: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  privacyPolicyUrl: string
  socialMedia: {
    facebook?: string
    twitter?: string
    linkedin?: string
    github?: string
  }
  socialMediaHandles: {
    facebook?: string
    twitter?: string
    linkedin?: string
    github?: string
  }
}

export const contactConfig: ContactConfig = {
  responseTime: process.env.NEXT_PUBLIC_CONTACT_RESPONSE_TIME || '24 hours',
  messageMaxLength: parseInt(process.env.NEXT_PUBLIC_CONTACT_MESSAGE_MAX_LENGTH || '100', 10),
  submissionTimeout: parseInt(process.env.NEXT_PUBLIC_CONTACT_SUBMISSION_TIMEOUT || '2000', 10),
  officeAddress: {
    street: process.env.NEXT_PUBLIC_OFFICE_STREET || '100 Technology Drive',
    city: process.env.NEXT_PUBLIC_OFFICE_CITY || 'San Francisco',
    state: process.env.NEXT_PUBLIC_OFFICE_STATE || 'CA',
    zip: process.env.NEXT_PUBLIC_OFFICE_ZIP || '94105',
    country: process.env.NEXT_PUBLIC_OFFICE_COUNTRY || 'USA'
  },
  privacyPolicyUrl: process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL || '/legal/terms',
  socialMedia: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_URL || '#',
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER_URL || '#',
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN_URL || '#',
    github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB_URL || '#'
  },
  socialMediaHandles: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_HANDLE || '@Inopsio',
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER_HANDLE || '@Inopsio',
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN_HANDLE || '@Inopsio',
    github: process.env.NEXT_PUBLIC_SOCIAL_GITHUB_HANDLE || '@Inopsio'
  }
}

export const industries = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'retail', label: 'Retail' },
  { value: 'government', label: 'Government' },
  { value: 'other', label: 'Other' }
]

