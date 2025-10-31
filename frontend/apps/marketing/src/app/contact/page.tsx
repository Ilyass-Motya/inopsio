'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ReCAPTCHA from 'react-google-recaptcha'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact'
import { countries, getCountryByName } from '@/data/countries'
import { contactConfig, industries } from '@/config/contact'

export default function ContactPage() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [phoneCode, setPhoneCode] = useState('')
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState<string>('')

  const formSectionRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const [imageHeight, setImageHeight] = useState<number | null>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      businessEmail: '',
      company: '',
      industry: '',
      countryRegion: '',
      city: '',
      phone: '',
      phoneCode: '',
      message: '',
      agreeToTerms: false,
      recaptchaToken: undefined
    }
  })

  const agreeToTerms = watch('agreeToTerms')
  const formData = watch()

  // Match image height to form section (heading + form card) height
  useEffect(() => {
    const updateImageHeight = () => {
      if (formSectionRef.current) {
        const formSectionHeight = formSectionRef.current.offsetHeight
        setImageHeight(formSectionHeight)
      }
    }

    const timer = setTimeout(updateImageHeight, 100)
    
    let resizeObserver: ResizeObserver | null = null
    if (formSectionRef.current) {
      resizeObserver = new ResizeObserver(updateImageHeight)
      resizeObserver.observe(formSectionRef.current)
    }

    window.addEventListener('resize', updateImageHeight)

    return () => {
      clearTimeout(timer)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      window.removeEventListener('resize', updateImageHeight)
    }
  }, [formData, submitStatus, selectedCountry, phoneCode, agreeToTerms])

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryName = e.target.value
    setSelectedCountry(countryName)
    
    const selectedCountryData = getCountryByName(countryName)
    if (selectedCountryData) {
      setPhoneCode(selectedCountryData.code)
      setValue('phoneCode', selectedCountryData.code)
    } else {
      setPhoneCode('')
      setValue('phoneCode', '')
    }

    setValue('countryRegion', countryName, { shouldValidate: true })
    setSubmitStatus('idle')
  }

  const onRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
    setValue('recaptchaToken', token || undefined)
  }

  const onSubmit = async (data: ContactFormData) => {
    if (!agreeToTerms) {
      setSubmitError('You must agree to the privacy policy')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setSubmitError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          phoneCode,
          recaptchaToken: recaptchaToken || undefined
        })
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      setSubmitStatus('success')
      reset()
      setSelectedCountry('')
      setPhoneCode('')
      setRecaptchaToken(null)
      recaptchaRef.current?.reset()

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      setSubmitStatus('error')
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'An error occurred while submitting your form. Please try again later.'
      )
      
      // Reset reCAPTCHA on error
      recaptchaRef.current?.reset()
      setRecaptchaToken(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Build Google Maps embed URL with configurable address
  const buildMapsUrl = () => {
    const { officeAddress } = contactConfig
    const address = `${officeAddress.street}, ${officeAddress.city}, ${officeAddress.state} ${officeAddress.zip}, ${officeAddress.country}`
    const encodedAddress = encodeURIComponent(address)
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    
    if (apiKey) {
      // Use Google Maps Embed API with API key (more reliable)
      return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedAddress}`
    }
    
    // Fallback to basic embed URL
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.83543450904!2d-122.4194155846814!3d37.774929279759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2s${encodedAddress}!5e0!3m2!1sen!2sus!4v1234567890`
  }

  // Build image source with CDN support
  const imageSrc = process.env.NEXT_PUBLIC_CDN_URL 
    ? `${process.env.NEXT_PUBLIC_CDN_URL}/images/contact-img.jpg`
    : '/images/contact-img.jpg'

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Two Column Layout - 75% Form, 25% Image */}
        <section 
          id="contact-form" 
          className="min-h-[calc(100vh-5rem)] py-12 lg:py-16"
          aria-label="Contact form"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              {/* Form Section - 75% */}
              <div ref={formSectionRef} className="w-full lg:w-3/4 flex flex-col">
                <div className="mb-8">
                  <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                    Get in Touch
                  </h1>
                  <p className="text-lg text-gray-700 dark:text-gray-200">
                    Reach out and we&apos;ll get in touch within {contactConfig.responseTime}.
                  </p>
                </div>

                <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 lg:p-10 shadow-xl border-2 border-gray-200 dark:border-gray-700">
                  {/* L-shaped corner brackets */}
                  <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-tl-2xl"></div>
                  <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-tr-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-bl-2xl"></div>
                  <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-br-2xl"></div>

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <div 
                      className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                      role="alert"
                      aria-live="polite"
                    >
                      <p className="text-green-800 dark:text-green-200 font-medium">
                        ✓ Thank you! We&apos;ll get back to you within {contactConfig.responseTime}.
                      </p>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div 
                      className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                      role="alert"
                      aria-live="assertive"
                    >
                      <p className="text-red-800 dark:text-red-200 font-medium">
                        ✗ {submitError || 'An error occurred. Please try again.'}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label 
                          htmlFor="firstName" 
                          className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5"
                        >
                          First name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          {...register('firstName')}
                          aria-invalid={errors.firstName ? 'true' : 'false'}
                          aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                          className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors ${
                            errors.firstName 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="First name"
                        />
                        {errors.firstName && (
                          <p 
                            id="firstName-error" 
                            className="mt-1 text-sm text-red-600 dark:text-red-400"
                            role="alert"
                          >
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label 
                          htmlFor="lastName" 
                          className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5"
                        >
                          Last name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          {...register('lastName')}
                          aria-invalid={errors.lastName ? 'true' : 'false'}
                          aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                          className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors ${
                            errors.lastName 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="Last name"
                        />
                        {errors.lastName && (
                          <p 
                            id="lastName-error" 
                            className="mt-1 text-sm text-red-600 dark:text-red-400"
                            role="alert"
                          >
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Job Title */}
                    <div>
                      <label 
                        htmlFor="jobTitle" 
                        className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5"
                      >
                        Job Title *
                      </label>
                      <input
                        type="text"
                        id="jobTitle"
                        {...register('jobTitle')}
                        aria-invalid={errors.jobTitle ? 'true' : 'false'}
                        aria-describedby={errors.jobTitle ? 'jobTitle-error' : undefined}
                        className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors ${
                          errors.jobTitle 
                            ? 'border-red-500 dark:border-red-500' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="Job title"
                      />
                      {errors.jobTitle && (
                        <p 
                          id="jobTitle-error" 
                          className="mt-1 text-sm text-red-600 dark:text-red-400"
                          role="alert"
                        >
                          {errors.jobTitle.message}
                        </p>
                      )}
                    </div>

                    {/* Business Email */}
                    <div>
                      <label 
                        htmlFor="businessEmail" 
                        className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="businessEmail"
                        {...register('businessEmail')}
                        aria-invalid={errors.businessEmail ? 'true' : 'false'}
                        aria-describedby={errors.businessEmail ? 'businessEmail-error' : undefined}
                        className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors ${
                          errors.businessEmail 
                            ? 'border-red-500 dark:border-red-500' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="Email address"
                      />
                      {errors.businessEmail && (
                        <p 
                          id="businessEmail-error" 
                          className="mt-1 text-sm text-red-600 dark:text-red-400"
                          role="alert"
                        >
                          {errors.businessEmail.message}
                        </p>
                      )}
                    </div>

                    {/* Company & Industry */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label 
                          htmlFor="company" 
                          className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5"
                        >
                          Company *
                        </label>
                        <input
                          type="text"
                          id="company"
                          {...register('company')}
                          aria-invalid={errors.company ? 'true' : 'false'}
                          aria-describedby={errors.company ? 'company-error' : undefined}
                          className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors ${
                            errors.company 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="Company name"
                        />
                        {errors.company && (
                          <p 
                            id="company-error" 
                            className="mt-1 text-sm text-red-600 dark:text-red-400"
                            role="alert"
                          >
                            {errors.company.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label 
                          htmlFor="industry" 
                          className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5"
                        >
                          Industry *
                        </label>
                        <select
                          id="industry"
                          {...register('industry')}
                          aria-invalid={errors.industry ? 'true' : 'false'}
                          aria-describedby={errors.industry ? 'industry-error' : undefined}
                          className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-gray-900 dark:text-white transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-no-repeat bg-[length:20px] bg-[right_0.75rem_center] pr-10 ${
                            errors.industry 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          <option value="">Please select</option>
                          {industries.map((industry) => (
                            <option key={industry.value} value={industry.value}>
                              {industry.label}
                            </option>
                          ))}
                        </select>
                        {errors.industry && (
                          <p 
                            id="industry-error" 
                            className="mt-1 text-sm text-red-600 dark:text-red-400"
                            role="alert"
                          >
                            {errors.industry.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Country & City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label 
                          htmlFor="countryRegion" 
                          className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5"
                        >
                          Location *
                        </label>
                        <select
                          id="countryRegion"
                          value={selectedCountry}
                          onChange={handleCountryChange}
                          aria-invalid={errors.countryRegion ? 'true' : 'false'}
                          aria-describedby={errors.countryRegion ? 'countryRegion-error' : undefined}
                          className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-gray-900 dark:text-white transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27currentColor%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-no-repeat bg-[length:20px] bg-[right_0.75rem_center] pr-10 ${
                            errors.countryRegion 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          <option value="">Select a country</option>
                          {countries.map((country) => (
                            <option key={country.name} value={country.name}>
                              {country.flag} {country.name}
                            </option>
                          ))}
                        </select>
                        {errors.countryRegion && (
                          <p 
                            id="countryRegion-error" 
                            className="mt-1 text-sm text-red-600 dark:text-red-400"
                            role="alert"
                          >
                            {errors.countryRegion.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label 
                          htmlFor="city" 
                          className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5"
                        >
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          {...register('city')}
                          aria-invalid={errors.city ? 'true' : 'false'}
                          aria-describedby={errors.city ? 'city-error' : undefined}
                          className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors ${
                            errors.city 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="City"
                        />
                        {errors.city && (
                          <p 
                            id="city-error" 
                            className="mt-1 text-sm text-red-600 dark:text-red-400"
                            role="alert"
                          >
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label 
                        htmlFor="phone" 
                        className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5"
                      >
                        Phone Number *
                      </label>
                      <div className="flex">
                        {phoneCode && (
                          <span className="inline-flex items-center px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg text-gray-600 dark:text-gray-300 text-sm font-medium">
                            {phoneCode}
                          </span>
                        )}
                        <input
                          type="tel"
                          id="phone"
                          {...register('phone')}
                          aria-invalid={errors.phone ? 'true' : 'false'}
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                          className={`flex-1 px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors ${
                            phoneCode ? 'rounded-l-none' : ''
                          } ${
                            errors.phone 
                              ? 'border-red-500 dark:border-red-500' 
                              : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder={phoneCode ? "(555) 000-0000" : "Phone number"}
                        />
                      </div>
                      {errors.phone && (
                        <p 
                          id="phone-error" 
                          className="mt-1 text-sm text-red-600 dark:text-red-400"
                          role="alert"
                        >
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label 
                        htmlFor="message" 
                        className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5"
                      >
                        Please describe the question you would like to ask (within {contactConfig.messageMaxLength} characters).
                      </label>
                      <textarea
                        id="message"
                        {...register('message')}
                        maxLength={contactConfig.messageMaxLength}
                        rows={4}
                        aria-invalid={errors.message ? 'true' : 'false'}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={`w-full px-4 py-2.5 bg-white dark:bg-gray-800 border rounded-lg focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors resize-none ${
                          errors.message 
                            ? 'border-red-500 dark:border-red-500' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="Leave us a message..."
                      />
                      {errors.message && (
                        <p 
                          id="message-error" 
                          className="mt-1 text-sm text-red-600 dark:text-red-400"
                          role="alert"
                        >
                          {errors.message.message}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {formData.message?.length || 0} / {contactConfig.messageMaxLength} characters
                      </p>
                    </div>

                    {/* reCAPTCHA */}
                    {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                      <div>
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                          onChange={onRecaptchaChange}
                          theme="light"
                        />
                        {errors.recaptchaToken && (
                          <p 
                            className="mt-1 text-sm text-red-600 dark:text-red-400"
                            role="alert"
                          >
                            {errors.recaptchaToken.message}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Terms and Conditions Checkbox */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        {...register('agreeToTerms')}
                        aria-invalid={errors.agreeToTerms ? 'true' : 'false'}
                        aria-describedby={errors.agreeToTerms ? 'agreeToTerms-error' : undefined}
                        className={`mt-0.5 h-4 w-4 text-primary-500 dark:text-primary-400 focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 border-gray-300 dark:border-gray-600 rounded cursor-pointer transition-colors ${
                          errors.agreeToTerms ? 'border-red-500 dark:border-red-500' : ''
                        }`}
                      />
                      <label 
                        htmlFor="agreeToTerms" 
                        className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                      >
                        You agree to our friendly{' '}
                        <a 
                          href={contactConfig.privacyPolicyUrl} 
                          className="text-gray-900 dark:text-white underline hover:no-underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          privacy policy
                        </a>
                        .
                      </label>
                    </div>
                    {errors.agreeToTerms && (
                      <p 
                        id="agreeToTerms-error" 
                        className="text-sm text-red-600 dark:text-red-400"
                        role="alert"
                      >
                        {errors.agreeToTerms.message}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !agreeToTerms}
                      className="w-full px-6 py-3 bg-primary-500 dark:bg-primary-400 hover:bg-primary-600 dark:hover:bg-primary-500 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2"
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send message'}
                    </button>
                  </form>
                </div>
              </div>

              {/* Image Section - 25% */}
              <div className="w-full lg:w-1/4 flex flex-col">
                <div 
                  ref={imageContainerRef}
                  className="relative rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl"
                  style={{ height: imageHeight ? `${imageHeight}px` : 'auto', minHeight: imageHeight ? '0' : '880px' }}
                >
                  {/* L-shaped corner brackets */}
                  <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-tl-2xl z-20"></div>
                  <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-tr-2xl z-20"></div>
                  <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-bl-2xl z-20"></div>
                  <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-br-2xl z-20"></div>
                  
                  <Image
                    src={imageSrc}
                    alt="Contact us"
                    fill
                    className="object-cover"
                  />
                  
                  {/* Social Links Overlay */}
                  <div className="absolute top-6 left-6 right-6 z-30">
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Follow Us</h3>
                      {contactConfig.socialMedia.facebook && (
                        <a 
                          href={contactConfig.socialMedia.facebook} 
                          className="flex items-center gap-3 text-gray-900 hover:text-primary-600 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Follow us on Facebook: ${contactConfig.socialMediaHandles.facebook}`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                          </svg>
                          <span className="text-sm font-medium">{contactConfig.socialMediaHandles.facebook}</span>
                        </a>
                      )}
                      {contactConfig.socialMedia.twitter && (
                        <a 
                          href={contactConfig.socialMedia.twitter} 
                          className="flex items-center gap-3 text-gray-900 hover:text-primary-600 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Follow us on Twitter: ${contactConfig.socialMediaHandles.twitter}`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                          <span className="text-sm font-medium">{contactConfig.socialMediaHandles.twitter}</span>
                        </a>
                      )}
                      {contactConfig.socialMedia.linkedin && (
                        <a 
                          href={contactConfig.socialMedia.linkedin} 
                          className="flex items-center gap-3 text-gray-900 hover:text-primary-600 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Follow us on LinkedIn: ${contactConfig.socialMediaHandles.linkedin}`}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          <span className="text-sm font-medium">{contactConfig.socialMediaHandles.linkedin}</span>
                        </a>
                      )}
                      {contactConfig.socialMedia.github && (
                        <a 
                          href={contactConfig.socialMedia.github} 
                          className="flex items-center gap-3 text-gray-900 hover:text-primary-600 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Follow us on GitHub: ${contactConfig.socialMediaHandles.github}`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          <span className="text-sm font-medium">{contactConfig.socialMediaHandles.github}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visit Us - Google Maps Section */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Visit us
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-200">
                Come and see us at our headquarters
              </p>
            </div>
            
            <div className="relative w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
              {/* L-shaped corner brackets */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-tl-2xl z-10"></div>
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-tr-2xl z-10"></div>
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary-500 dark:border-primary-400 rounded-bl-2xl z-10"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-primary-500 dark:border-primary-400 rounded-br-2xl z-10"></div>
              
              <div className="aspect-[2/1] w-full">
                <iframe
                  src={buildMapsUrl()}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="Inopsio Office Location"
                  aria-label={`Map showing Inopsio office location at ${contactConfig.officeAddress.street}, ${contactConfig.officeAddress.city}`}
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
