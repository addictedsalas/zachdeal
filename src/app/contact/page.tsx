"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (you can integrate with your preferred form service)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-bbd-black pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-bebas text-5xl sm:text-6xl text-bbd-ivory mb-6">
              GET IN <span className="text-bbd-orange">TOUCH</span>
            </h1>
            <p className="text-xl text-bbd-ivory/80 max-w-3xl mx-auto mb-8">
              Ready to transform your fitness journey? Have questions about our programs or supplements? 
              We&apos;re here to help you achieve your goals.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-bbd-ivory/60">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-bbd-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@zachdeal.com
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-bbd-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Response within 24 hours
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-bbd-charcoal/40 to-bbd-charcoal/60 rounded-2xl p-8 border border-bbd-charcoal/50 backdrop-blur-sm shadow-xl">
              {!submitted ? (
                <>
                  <h2 className="font-bebas text-3xl text-bbd-ivory mb-8 text-center">SEND MESSAGE</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-bold text-bbd-ivory mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-bbd-black/80 border border-bbd-charcoal/40 rounded-lg text-bbd-ivory placeholder-bbd-ivory/50 focus:border-bbd-orange focus:outline-none focus:ring-2 focus:ring-bbd-orange/20 transition-all"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-bold text-bbd-ivory mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-bbd-black/80 border border-bbd-charcoal/40 rounded-lg text-bbd-ivory placeholder-bbd-ivory/50 focus:border-bbd-orange focus:outline-none focus:ring-2 focus:ring-bbd-orange/20 transition-all"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-bold text-bbd-ivory mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-bbd-black/80 border border-bbd-charcoal/40 rounded-lg text-bbd-ivory focus:border-bbd-orange focus:outline-none focus:ring-2 focus:ring-bbd-orange/20 transition-all"
                      >
                        <option value="">Select a subject</option>
                        <option value="program-question">Program Question</option>
                        <option value="supplement-question">Supplement Question</option>
                        <option value="technical-support">Technical Support</option>
                        <option value="billing">Billing & Payments</option>
                        <option value="partnership">Partnership Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-bbd-ivory mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-bbd-black/80 border border-bbd-charcoal/40 rounded-lg text-bbd-ivory placeholder-bbd-ivory/50 focus:border-bbd-orange focus:outline-none focus:ring-2 focus:ring-bbd-orange/20 resize-none transition-all"
                        placeholder="Tell us how we can help you achieve your fitness goals..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center px-8 py-4 bg-bbd-orange text-bbd-black font-bold text-lg rounded-lg hover:bg-bbd-gold transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-bbd-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          SENDING MESSAGE...
                        </>
                      ) : (
                        <>
                          SEND MESSAGE
                          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-bbd-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-bbd-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bebas text-3xl text-bbd-ivory mb-3">MESSAGE SENT!</h3>
                  <p className="text-bbd-ivory/70 mb-8 text-lg">
                    Thanks for reaching out! We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="inline-flex items-center px-6 py-3 bg-bbd-charcoal/60 text-bbd-ivory font-bold rounded-lg hover:bg-bbd-charcoal/80 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-bbd-orange/10 via-bbd-gold/10 to-bbd-orange/10 rounded-2xl p-12 border border-bbd-orange/20">
              <h2 className="font-bebas text-4xl text-bbd-ivory mb-4">
                READY TO START YOUR <span className="text-bbd-orange">TRANSFORMATION?</span>
              </h2>
              <p className="text-lg text-bbd-ivory/80 mb-8 max-w-2xl mx-auto">
                Don&apos;t wait for the perfect moment. Your fitness journey starts today with Built By Deal&apos;s proven programs and premium supplements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/programs"
                  className="inline-flex items-center px-8 py-4 bg-bbd-orange text-bbd-black font-bold text-lg rounded-lg hover:bg-bbd-gold transition-all duration-200 transform hover:scale-105"
                >
                  BROWSE PROGRAMS
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/supplements"
                  className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-bbd-ivory text-bbd-ivory font-bold text-lg rounded-lg hover:bg-bbd-ivory hover:text-bbd-black transition-all duration-200 transform hover:scale-105"
                >
                  SHOP SUPPLEMENTS
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-8 mt-12 max-w-lg mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-bbd-orange mb-1">30-Day</div>
                  <div className="text-sm text-bbd-ivory/70">Money Back</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-bbd-gold mb-1">Instant</div>
                  <div className="text-sm text-bbd-ivory/70">Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-bbd-orange mb-1">24/7</div>
                  <div className="text-sm text-bbd-ivory/70">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
