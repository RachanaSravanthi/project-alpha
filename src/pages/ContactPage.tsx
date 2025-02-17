
// Form page to submit response

import { motion } from "framer-motion";
import { useState } from "react";
import {Helmet} from "react-helmet-async";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmited, setFormSubmited] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormSubmited(false);
try{
  //docs.google.com/forms/d/e/1FAIpQLScRfX75cDYXlfPQR2WIhBMVSlOI00OEyzfYxG4mphS_PUb5tg/viewform?usp=pp_url&entry.154228335=Rachana&entry.458940791=rachana@gmail.com&entry.1170359642=999999999&entry.1286022249=I+would+like+collaborate
  const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScRfX75cDYXlfPQR2WIhBMVSlOI00OEyzfYxG4mphS_PUb5tg/formResponse'  
  const formResponse = await fetch(GOOGLE_FORM_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      "entry.154228335": formData.name, // Replace with your form field IDs
      "entry.458940791": formData.email, // Replace with your form field IDs
      "entry.1170359642": formData.mobile, // Replace with your form field IDs
      "entry.1286022249": formData.subject, // Replace with your form field IDs
    }),
  });
  if(formResponse)
  {
    console.log('res',formResponse);
    setFormData({ name: "", email: "", subject: "",mobile:"" });
    setFormSubmited(true);
    setTimeout(() => {
      setFormSubmited(false);
    }, 4000);
    
  }
  setIsSubmitting(false);
}
catch(err){
console.log(err);

}

  };

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-16 lg:p-24">
       <Helmet>
        {/* Meta tags for SEO and sharing */}
        <title>Contact Page</title>
              <title>Contact Page</title>
              <meta name="description" content="contact page to contact author" />
              <meta property="og:title" content="contact Page | Rachana sravanthi" />
              <meta property="og:description" content="contact page to contact author" />
          </Helmet>

       {/* Main container with responsive grid layout */}    
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column Introduction */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h1>
          <p className="text-gray-400 text-xl">
            Let's make your vision a reality. Contact me today and let's discuss
            how I can help you innovate and grow.
          </p>
        </motion.div>

        {/* Right Column Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-semibold mb-2">
                Let's create together
              </h2>
              <p className="text-gray-400">
                Break the ice!  Let me help you out
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Name Input */}
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="What's your name? *"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full bg-transparent border-b border-gray-700 focus:border-white py-2 outline-none transition-colors"
                />
              </div>
                  {/* Email Input */}
              <div className="space-y-1">
                <input
                  type="email"
                  placeholder="What's your email? *"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full bg-transparent border-b border-gray-700 focus:border-white py-2 outline-none transition-colors"
                />
              </div>
               {/* Mobile Input */}
              <div className="space-y-1">
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  pattern="^(\+\d{1,3}[- ]?)?\d{10}$"
                  placeholder="What’s your contact number?"
                  
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, mobile: e.target.value }))
                  }
                  className="w-full bg-transparent border-b border-gray-700 focus:border-white py-2 outline-none transition-colors"
                />
              </div>

              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Describe your subject"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  className="w-full bg-transparent border-b border-gray-700 focus:border-white py-2 outline-none transition-colors"
                />
              </div>
              {formSubmited && (
                <div className="w-full text-center">
                  <h1 className="text-green-400">
                    Successfully saved the response
                  </h1>
                </div>
              )}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black rounded-full py-4 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
