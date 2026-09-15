import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { submitInquiryApi } from '../services/api';
import { Inquiry } from '../types';

interface InquiryFormProps {
  initialType?: Inquiry['inquiryType'];
  initialProductId?: string;
  initialProductName?: string;
  onSuccess?: () => void;
  className?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  initialType = 'General Inquiry',
  initialProductId = '',
  initialProductName = '',
  onSuccess,
  className = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: initialType,
    productId: initialProductId,
    productName: initialProductName,
    subject: initialProductName ? `Inquiry regarding ${initialProductName}` : '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Please provide details for your inquiry';

    // Email is optional, but if provided, validate format
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await submitInquiryApi(formData);
      setSuccessMessage(res.message || 'Thank you. Your inquiry has been dispatched to our Lahore design desk.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        inquiryType: initialType,
        productId: initialProductId,
        productName: initialProductName,
        subject: '',
        message: '',
      });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not submit inquiry. Please call +92 320 5555899 directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-[#FFFFFF] border border-[#E7E7E5] p-6 sm:p-8 ${className}`}>
      <div className="mb-6 pb-4 border-b border-[#FAF9F7]">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#8A8A86]">Direct Inquiry</span>
        <h3 className="font-serif-display text-xl sm:text-2xl text-[#111111] mt-1">
          Showroom & Material Inquiry
        </h3>
        <p className="text-xs text-[#8A8A86] mt-1">
          Our Lahore design desk coordinates wallpaper roll orders, panel specifications, and material consultations.
        </p>
      </div>

      {successMessage && (
        <div
          id="inquiry-success-banner"
          className="mb-6 p-4 bg-[#FAF9F7] border border-[#8A8A86]/40 flex items-start space-x-3 text-xs text-[#111111]"
        >
          <CheckCircle2 className="w-5 h-5 text-[#252525] shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">{successMessage}</p>
            <p className="text-[#8A8A86] mt-1">We can also be reached directly at +92 320 5555899.</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div
          id="inquiry-error-banner"
          className="mb-6 p-4 bg-red-50/70 border border-red-200 flex items-start space-x-3 text-xs text-red-800"
        >
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Submission error</p>
            <p className="mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs" noValidate>
        {formData.productName && (
          <div className="p-3 bg-[#FAF9F7] border border-[#E7E7E5] text-xs">
            <span className="text-[#8A8A86] uppercase tracking-wider block text-[10px]">Referenced Item</span>
            <span className="font-medium text-[#111111]">{formData.productName}</span>
            {formData.productId && (
              <span className="text-[#8A8A86] ml-2 text-[11px]">ID: {formData.productId}</span>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="inquiry-name" className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="inquiry-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ahmad Khan"
              className={`w-full px-3.5 py-2.5 bg-[#FFFFFF] border text-[#111111] focus:outline-none focus:border-[#111111] transition-colors ${
                fieldErrors.name ? 'border-red-500' : 'border-[#E7E7E5]'
              }`}
            />
            {fieldErrors.name && <p className="text-red-500 text-[10px] mt-1">{fieldErrors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="inquiry-phone" className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              id="inquiry-phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. +92 300 1234567"
              className={`w-full px-3.5 py-2.5 bg-[#FFFFFF] border text-[#111111] focus:outline-none focus:border-[#111111] transition-colors ${
                fieldErrors.phone ? 'border-red-500' : 'border-[#E7E7E5]'
              }`}
            />
            {fieldErrors.phone && <p className="text-red-500 text-[10px] mt-1">{fieldErrors.phone}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email (Optional) */}
          <div>
            <label htmlFor="inquiry-email" className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">
              Email Address <span className="text-[#8A8A86]">(Optional)</span>
            </label>
            <input
              type="email"
              id="inquiry-email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@domain.com"
              className={`w-full px-3.5 py-2.5 bg-[#FFFFFF] border text-[#111111] focus:outline-none focus:border-[#111111] transition-colors ${
                fieldErrors.email ? 'border-red-500' : 'border-[#E7E7E5]'
              }`}
            />
            {fieldErrors.email && <p className="text-red-500 text-[10px] mt-1">{fieldErrors.email}</p>}
          </div>

          {/* Inquiry Type */}
          <div>
            <label htmlFor="inquiry-type" className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">
              Inquiry Type <span className="text-red-600">*</span>
            </label>
            <select
              id="inquiry-type"
              value={formData.inquiryType}
              onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value as any })}
              className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E7E7E5] text-[#111111] focus:outline-none focus:border-[#111111]"
            >
              <option value="Wallpaper">Wallpaper</option>
              <option value="Wallpaper Panels">Wallpaper Panels</option>
              <option value="Interior Design">Interior Design</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="inquiry-subject" className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">
            Subject <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="inquiry-subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder="e.g. Inquiring on bedroom wallpaper rolls or surface panels"
            className={`w-full px-3.5 py-2.5 bg-[#FFFFFF] border text-[#111111] focus:outline-none focus:border-[#111111] transition-colors ${
              fieldErrors.subject ? 'border-red-500' : 'border-[#E7E7E5]'
            }`}
          />
          {fieldErrors.subject && <p className="text-red-500 text-[10px] mt-1">{fieldErrors.subject}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="inquiry-message" className="block uppercase tracking-wider text-[#8A8A86] mb-1 text-[10px]">
            Inquiry Details / Wall Dimensions <span className="text-red-600">*</span>
          </label>
          <textarea
            id="inquiry-message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Describe your wall area, room requirements, or specific wallpaper queries..."
            className={`w-full px-3.5 py-2.5 bg-[#FFFFFF] border text-[#111111] focus:outline-none focus:border-[#111111] transition-colors resize-y ${
              fieldErrors.message ? 'border-red-500' : 'border-[#E7E7E5]'
            }`}
          />
          {fieldErrors.message && <p className="text-red-500 text-[10px] mt-1">{fieldErrors.message}</p>}
        </div>

        <button
          type="submit"
          id="inquiry-submit-btn"
          disabled={loading}
          className="w-full py-3 px-6 bg-[#111111] hover:bg-[#252525] text-[#FFFFFF] uppercase tracking-widest text-xs font-medium flex items-center justify-center space-x-2 transition-all duration-200 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Inquiry...</span>
            </>
          ) : (
            <>
              <span>Submit Inquiry to Showroom</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        <p className="text-[10px] text-[#8A8A86] text-center pt-1">
          Direct telephone contact: +92 320 5555899 • 15 MAIN Beadon Rd, Lahore
        </p>
      </form>
    </div>
  );
};
