'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, CheckCircle2, ShieldCheck, Mail, Phone, User, Star } from 'lucide-react';

const TIME_SLOTS = [
  "10:00 AM WAT",
  "12:30 PM WAT",
  "03:00 PM WAT",
  "05:30 PM WAT"
];

const INTEREST_TYPES = [
  "Solid 22K Investment Chains",
  "Signature Signet & Dress Rings",
  "Heavy Atelier Cuff Bracelets",
  "Sovereign Bullion Allocation",
  "Custom Bridal Atelier Consult"
];

// Generate next 5 business days beautifully
const getNextBusinessDays = () => {
  const days = [];
  const today = new Date();
  let count = 0;
  
  while (count < 5) {
    today.setDate(today.getDate() + 1);
    const dayOfWeek = today.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip Sat/Sun
      days.push({
        date: new Date(today),
        formattedDay: today.toLocaleDateString('en-US', { weekday: 'short' }),
        formattedDate: today.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
        isoString: today.toISOString().split('T')[0]
      });
      count++;
    }
  }
  return days;
};

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedInterest, setSelectedInterest] = useState<string>(INTEREST_TYPES[0]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [businessDays, setBusinessDays] = useState<Array<{date: Date, formattedDay: string, formattedDate: string, isoString: string}>>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBusinessDays(getNextBusinessDays());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.name = "Name is required.";
    if (!email.trim() || !email.includes('@')) newErrors.email = "A valid email is required.";
    if (!phone.trim()) newErrors.phone = "Phone number is required for secure courier coordination.";
    if (!selectedDate) newErrors.date = "Please select an appointment date.";
    if (!selectedTime) newErrors.time = "Please choose a preferred time slot.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate high-end server validation & storage
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <section id="book" className="w-full bg-white py-24 md:py-36 border-t border-lux-sand/15 overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Text Detail Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="block text-[9px] tracking-[0.3em] text-black uppercase mb-6 font-semibold">
                REQUEST AN AUDIENCE • SALON
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-lux-dark mb-8 font-normal tracking-tight">
                Secure a private <br /> viewing at our <i className="font-serif font-light text-black">Lagos Salon</i>.
              </h2>
              <div className="w-12 h-[1px] bg-black/20 mb-8" />
              <p className="text-black/85 text-[15px] leading-[1.8] font-light mb-6">
                To maintain complete discretion and optimal security, visits to our Victoria Island showroom are strictly by advance appointment. Our private registrars coordinate safe courier transfers, individual advisory viewings, and confidential estate portfolio consultancies.
              </p>
              <p className="text-black/80 text-[15px] leading-[1.8] font-light mb-10">
                Please complete the encrypted request ledger. An exclusive liaison from our Lagos counsel will reach out within two hours to formalize your private invitation.
              </p>
            </div>

            {/* Secure Badges */}
            <div className="space-y-4 border-t border-lux-sand/20 pt-8 mt-4">
              <div className="flex items-center gap-3 text-lux-dark">
                <ShieldCheck className="w-4 h-4 stroke-[1.5] text-black" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium">MILITARY-GRADE VAULT DISCRETION</span>
              </div>
              <div className="flex items-center gap-3 text-lux-dark">
                <Star className="w-4 h-4 stroke-[1.5] text-black" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium">CERTIFIED ASSAY OFFICERS</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Form Column */}
          <div className="lg:col-span-7">
            <div className="w-full bg-[#FAF9F6] border border-lux-sand/15 p-8 md:p-12 lg:p-16 relative">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form 
                    key="booking-form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleBook}
                    className="space-y-8"
                  >
                    {/* Step 1: Select Interest */}
                    <div className="space-y-3">
                      <label className="block text-[9px] uppercase tracking-[0.25em] font-semibold text-lux-taupe">
                        01 / Select Primary Metal Interest
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {INTEREST_TYPES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setSelectedInterest(type)}
                            suppressHydrationWarning
                            className={`px-4 py-3 border text-left text-[11px] uppercase tracking-wider transition-all duration-300 focus:outline-none ${
                              selectedInterest === type 
                                ? 'bg-lux-dark text-white border-lux-dark' 
                                : 'bg-white text-lux-dark/80 border-lux-sand/30 hover:border-lux-warm/50'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Select Date & Time (Custom interactive Calendar) */}
                    <div className="space-y-4">
                      <label className="block text-[9px] uppercase tracking-[0.25em] font-semibold text-lux-taupe">
                        02 / Schedule Showroom Appointment Slot
                      </label>
                      
                      {/* Date list */}
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {businessDays.map((day) => (
                          <button
                            key={day.isoString}
                            type="button"
                            onClick={() => {
                              setSelectedDate(day.isoString);
                              setErrors(prev => ({ ...prev, date: '' }));
                            }}
                            suppressHydrationWarning
                            className={`flex-1 min-w-[70px] py-3.5 px-2 border flex flex-col items-center justify-center gap-1 transition-all duration-300 focus:outline-none ${
                              selectedDate === day.isoString
                                ? 'bg-lux-dark text-white border-lux-dark'
                                : 'bg-white text-lux-dark border-lux-sand/30 hover:border-lux-warm/50'
                            }`}
                          >
                            <span className="text-[8px] uppercase tracking-widest text-lux-taupe group-hover:text-white">
                              {day.formattedDay}
                            </span>
                            <span className="text-[11px] font-mono font-medium">
                              {day.formattedDate}
                            </span>
                          </button>
                        ))}
                      </div>
                      {errors.date && <p className="text-red-600 text-[10px] uppercase tracking-widest">{errors.date}</p>}

                      {/* Time list */}
                      <AnimatePresence>
                        {selectedDate && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2"
                          >
                            {TIME_SLOTS.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => {
                                  setSelectedTime(time);
                                  setErrors(prev => ({ ...prev, time: '' }));
                                }}
                                suppressHydrationWarning
                                className={`py-3 px-1.5 border text-center font-mono text-[10px] tracking-wide transition-all duration-300 focus:outline-none ${
                                  selectedTime === time
                                    ? 'bg-lux-warm text-white border-lux-warm'
                                    : 'bg-white text-lux-dark border-lux-sand/20 hover:border-lux-warm/30'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {errors.time && <p className="text-red-600 text-[10px] uppercase tracking-widest">{errors.time}</p>}
                    </div>

                    {/* Step 3: Patron Credentials */}
                    <div className="space-y-4">
                      <label className="block text-[9px] uppercase tracking-[0.25em] font-semibold text-lux-taupe">
                        03 / Enter Patron Credentials
                      </label>
                      
                      <div className="space-y-3.5">
                        {/* Name Input */}
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-lux-taupe/60 stroke-[1.2]" />
                          <input 
                            type="text" 
                            placeholder="FULL PATRON NAME"
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                              setErrors(prev => ({ ...prev, name: '' }));
                            }}
                            suppressHydrationWarning
                            className="w-full h-12 bg-white border border-lux-sand/30 pl-11 pr-4 text-[11px] tracking-wider uppercase focus:outline-none focus:border-lux-warm placeholder-lux-taupe/45 text-lux-dark"
                          />
                          {errors.name && <p className="text-red-600 text-[10px] uppercase tracking-widest mt-1">{errors.name}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-lux-taupe/60 stroke-[1.2]" />
                          <input 
                            type="email" 
                            placeholder="CONFIDENTIAL EMAIL ADDRESS"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setErrors(prev => ({ ...prev, email: '' }));
                            }}
                            suppressHydrationWarning
                            className="w-full h-12 bg-white border border-lux-sand/30 pl-11 pr-4 text-[11px] tracking-wider focus:outline-none focus:border-lux-warm placeholder-lux-taupe/45 text-lux-dark"
                          />
                          {errors.email && <p className="text-red-600 text-[10px] uppercase tracking-widest mt-1">{errors.email}</p>}
                        </div>

                        {/* Phone Input */}
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-lux-taupe/60 stroke-[1.2]" />
                          <input 
                            type="tel" 
                            placeholder="SECURE CONTACT NUMBER (WHATSAPP)"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              setErrors(prev => ({ ...prev, phone: '' }));
                            }}
                            suppressHydrationWarning
                            className="w-full h-12 bg-white border border-lux-sand/30 pl-11 pr-4 text-[11px] tracking-wider focus:outline-none focus:border-lux-warm placeholder-lux-taupe/45 text-lux-dark"
                          />
                          {errors.phone && <p className="text-red-600 text-[10px] uppercase tracking-widest mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      suppressHydrationWarning
                      className="w-full h-14 bg-lux-dark text-white text-center text-[10px] tracking-[0.25em] font-medium uppercase transition-colors hover:bg-lux-espresso flex items-center justify-center gap-3 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                      ) : (
                        <span>TRANSMIT SALON REQUEST</span>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="booking-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center py-12 flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-black/5 border border-black/20 rounded-full flex items-center justify-center text-black mb-8">
                      <CheckCircle2 className="w-8 h-8 stroke-[1.2]" />
                    </div>

                    <span className="block text-[9px] tracking-[0.3em] text-black uppercase mb-4 font-semibold">
                      REQUEST TRANSMITTED SECURELY
                    </span>

                    <h3 className="font-serif text-2xl md:text-3xl text-lux-dark mb-4 font-normal">
                      Welcome, Patron <span className="font-serif font-light italic">{fullName}</span>.
                    </h3>

                    <p className="text-black text-[14px] leading-[1.8] font-light max-w-md mx-auto mb-8">
                      Your viewing credentials have been allocated for <b className="font-medium text-lux-dark">{selectedDate}</b> at <b className="font-medium text-lux-dark">{selectedTime}</b>. Our senior showroom registrar will contact your secure liaison shortly via the provided channel to finalize logistics.
                    </p>

                    <div className="w-full bg-white border border-lux-sand/15 p-5 text-left text-[11px] space-y-2 max-w-sm">
                      <div className="flex justify-between font-mono text-[9px]">
                        <span className="text-lux-taupe">LIAISON DEPT:</span>
                        <span className="text-lux-dark">LAGOS VII COURIER</span>
                      </div>
                      <div className="flex justify-between font-mono text-[9px]">
                        <span className="text-lux-taupe">INTEREST SEGMENT:</span>
                        <span className="text-lux-dark uppercase">{selectedInterest}</span>
                      </div>
                      <div className="flex justify-between font-mono text-[9px]">
                        <span className="text-lux-taupe">STATUS:</span>
                        <span className="text-emerald-700 font-semibold uppercase">PROVISIONAL APPROVAL</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFullName('');
                        setEmail('');
                        setPhone('');
                        setSelectedDate(null);
                        setSelectedTime(null);
                      }}
                      className="mt-10 relative text-[9px] uppercase tracking-[0.2em] text-black hover:text-lux-espresso transition-colors font-semibold pb-1 border-b border-black/20"
                    >
                      Return to Showroom
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
