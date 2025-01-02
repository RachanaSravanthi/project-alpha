
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmited,setFormSubmited]=useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormSubmited(false)

    // Replace with your Google Form URL    
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeZph8LgZHvF4x0ouuRrb69TZFYizQ0xz4TF19N0flyT8XtXw/formResponse'
    const formResponse = await fetch(GOOGLE_FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'entry.1712600641': formData.name,     // Replace with your form field IDs
        'entry.1183213126': formData.email,    // Replace with your form field IDs
        'entry.728623949': formData.subject   // Replace with your form field IDs
      })
    }) 
    if (formResponse.ok) {
      setFormData({ name: '', email: '', subject: '' })
      setFormSubmited(true)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-16 lg:p-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h1>
          <p className="text-gray-400 text-xl">
            Let's make your vision a reality. Contact me today and let's discuss how I can help you innovate and grow.
          </p>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-semibold mb-2">
                Lets create together
              </h2>
              <p className="text-gray-400">
                Break the ice! Let us help you out
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="What's your name?*"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-transparent border-b border-gray-700 focus:border-white py-2 outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <input
                  type="email"
                  placeholder="Whats your email?"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-transparent border-b border-gray-700 focus:border-white py-2 outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Describe your subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full bg-transparent border-b border-gray-700 focus:border-white py-2 outline-none transition-colors"
                />
              </div>
                {formSubmited&&<div className='w-full text-center'>
                    <h1 className='text-green-400'>Successfully saved the response</h1>
                </div>}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black rounded-full py-4 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

