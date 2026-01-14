import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays, isSunday, isSameDay, isAfter, startOfToday } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock booked slots
const bookedSlots = [
  { date: addDays(startOfToday(), 1), time: '10:00' },
  { date: addDays(startOfToday(), 1), time: '14:00' },
  { date: addDays(startOfToday(), 3), time: '11:00' },
  { date: addDays(startOfToday(), 5), time: '15:00' },
];

// Mock holidays
const holidays = [
  addDays(startOfToday(), 7),
  addDays(startOfToday(), 14),
];

const timeSlots = [
  { time: '10:00', label: '10:00 AM' },
  { time: '11:00', label: '11:00 AM' },
  { time: '12:00', label: '12:00 PM' },
  { time: '14:00', label: '2:00 PM' },
  { time: '15:00', label: '3:00 PM' },
  { time: '16:00', label: '4:00 PM' },
  { time: '17:00', label: '5:00 PM' },
];

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isSlotBooked = (date: Date, time: string) => {
    return bookedSlots.some(
      slot => isSameDay(slot.date, date) && slot.time === time
    );
  };

  const isDateDisabled = (date: Date) => {
    const today = startOfToday();
    return (
      !isAfter(date, today) ||
      isSunday(date) ||
      holidays.some(holiday => isSameDay(holiday, date))
    );
  };

  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];
    return timeSlots.map(slot => ({
      ...slot,
      isBooked: isSlotBooked(selectedDate, slot.time)
    }));
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !formData.name || !formData.email || !agreedToTerms) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setFormData({ name: '', email: '', message: '' });
    setAgreedToTerms(false);
  };

  return (
    <section id="booking" className="py-20 lg:py-28">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-section mb-4">Book Your Consultation</h2>
          <p className="text-body max-w-2xl mx-auto">
            Select your preferred date and time. All sessions are 1 hour via video call.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="bg-card rounded-3xl p-12 shadow-card border border-border/50">
                <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-success" />
                </div>
                <h3 className="font-heading text-2xl font-semibold mb-3">
                  Booking Requested!
                </h3>
                <p className="text-muted-foreground mb-2">
                  {formData.name}, your consultation is scheduled for:
                </p>
                <p className="text-lg font-medium text-foreground mb-6">
                  {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')} at{' '}
                  {timeSlots.find(s => s.time === selectedTime)?.label}
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  A confirmation email will be sent to {formData.email}
                </p>
                <button
                  onClick={handleReset}
                  className="btn-secondary"
                >
                  Book Another Session
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-card rounded-3xl p-6 md:p-10 shadow-card border border-border/50">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Left: Date & Time */}
                  <div>
                    <h3 className="font-heading text-lg font-semibold mb-4">
                      Select Date & Time
                    </h3>
                    
                    <div className="bg-secondary/30 rounded-2xl p-4 mb-6">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          setSelectedDate(date);
                          setSelectedTime(null);
                        }}
                        disabled={isDateDisabled}
                        className="rounded-xl pointer-events-auto"
                        classNames={{
                          day_selected: "bg-accent text-accent-foreground hover:bg-accent/90",
                          day_today: "bg-secondary text-foreground",
                        }}
                      />
                    </div>

                    {selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <p className="text-sm text-muted-foreground mb-3">
                          Available slots for {format(selectedDate, 'MMMM d')}:
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {availableSlots.map(slot => (
                            <button
                              key={slot.time}
                              type="button"
                              disabled={slot.isBooked}
                              onClick={() => setSelectedTime(slot.time)}
                              className={cn(
                                "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                slot.isBooked
                                  ? "bg-muted text-muted-foreground/50 cursor-not-allowed line-through"
                                  : selectedTime === slot.time
                                  ? "bg-accent text-accent-foreground shadow-button"
                                  : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                              )}
                            >
                              {slot.label}
                              {slot.isBooked && (
                                <span className="block text-xs mt-0.5">Booked</span>
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Right: Contact Details */}
                  <div>
                    <h3 className="font-heading text-lg font-semibold mb-4">
                      Your Details
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="input-field"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="input-field"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          What would you like to discuss?
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="input-field min-h-[120px] resize-none"
                          placeholder="Briefly describe your technical challenge or what you'd like guidance on..."
                        />
                      </div>
                    </div>

                    {/* Terms checkbox */}
                    <div className="flex items-start gap-3 mt-6 p-4 bg-secondary/30 rounded-xl">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                        className="mt-0.5"
                      />
                      <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                        I agree to the{' '}
                        <Link to="/terms" className="text-accent hover:underline font-medium" target="_blank">
                          Terms & Conditions
                        </Link>
                        {' '}and understand this is a demo website for educational purposes only.
                      </label>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={!selectedDate || !selectedTime || !formData.name || !formData.email || !agreedToTerms || isSubmitting}
                      className={cn(
                        "btn-primary w-full mt-6 flex items-center justify-center gap-2",
                        (!selectedDate || !selectedTime || !formData.name || !formData.email || !agreedToTerms) && "opacity-50 cursor-not-allowed"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Request Consultation'
                      )}
                    </motion.button>

                    <p className="text-xs text-muted-foreground text-center mt-4">
                      You'll receive a confirmation email once your booking is approved.
                    </p>
                  </div>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default BookingForm;
