import React, { useState } from 'react';
import { Instagram, Copy, ArrowLeft, Banknote, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useStock } from '../../context/StockContext';

interface CheckoutFormProps {
  onBack: () => void;
  onClose: () => void;
}

interface FormData {
  name: string;
  phone: string;
  address: string;
  additionalInfo: string;
}

interface FormErrors {
  name: string;
  phone: string;
  address: string;
}

interface FormValid {
  name: boolean;
  phone: boolean;
  address: boolean;
}

export default function CheckoutForm({ onBack, onClose }: CheckoutFormProps) {
  const { state, dispatch: cartDispatch } = useCart();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    additionalInfo: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    phone: '',
    address: '',
  });

  const [valid, setValid] = useState<FormValid>({
    name: false,
    phone: false,
    address: false,
  });

  const [copied, setCopied] = useState(false);

  const validateField = (name: keyof FormData, value: string): boolean => {
    switch (name) {
      case 'name':
        const nameParts = value.trim().split(/\s+/);
        if (nameParts.length < 2 || nameParts.some((part) => part.length < 3)) {
          setErrors((prev) => ({
            ...prev,
            name: 'Name must have at least two words, and each word must be at least 3 characters long.',
          }));
          setValid((prev) => ({ ...prev, name: false }));
          return false;
        }
        setErrors((prev) => ({ ...prev, name: '' }));
        setValid((prev) => ({ ...prev, name: true }));
        return true;

      case 'phone':
        const phonePattern = /^(010|011|012|015)\d{8}$/;
        if (!phonePattern.test(value)) {
          setErrors((prev) => ({
            ...prev,
            phone: 'Phone number must start with 010, 011, 012, or 015 and be 11 digits long',
          }));
          setValid((prev) => ({ ...prev, phone: false }));
          return false;
        }
        setErrors((prev) => ({ ...prev, phone: '' }));
        setValid((prev) => ({ ...prev, phone: true }));
        return true;

      case 'address':
        if (value.trim().length < 5) {
          setErrors((prev) => ({
            ...prev,
            address: 'Address must be at least 5 characters long.',
          }));
          setValid((prev) => ({ ...prev, address: false }));
          return false;
        }
        setErrors((prev) => ({ ...prev, address: '' }));
        setValid((prev) => ({ ...prev, address: true }));
        return true;

      default:
        return true;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof FormData, value);
  };

  const validateFields = (): boolean => {
    const nameValid = validateField('name', formData.name);
    const phoneValid = validateField('phone', formData.phone);
    const addressValid = validateField('address', formData.address);
    return nameValid && phoneValid && addressValid;
  };

  const createOrderMessage = () => {
    const orderDetails = state.items
      .map(
        (item) =>
          `${item.product.name} (Size: ${item.selectedSize}, Quantity: ${item.quantity})`
      )
      .join('\n');

    const shippingFee = 50; // رسوم الشحن
    const finalTotal = state.total + shippingFee; // المجموع النهائي مع الشحن

    return (
      `New Order:\n\n` +
      `Customer Details:\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Address: ${formData.address}\n` +
      `Additional Info: ${formData.additionalInfo}\n\n` +
      `Order Items:\n${orderDetails}\n\n` +
      `Shipping Fee: ${shippingFee} EGP\n` +
      `Total (Including Shipping): ${finalTotal} EGP`
    );
  };

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    const message = createOrderMessage();
    const whatsappUrl = `https://wa.me/201159733443?text=${encodeURIComponent(
      message
    )}`;

    onClose();
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmitInstagram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    const message = createOrderMessage();
    const instagramUrl = `https://ig.me/m/mylz.eg?text=${encodeURIComponent(
      message
    )}`;

    onClose();
    window.open(instagramUrl, '_blank');
  };

  const handleCopyMessage = () => {
    if (!validateFields()) return;

    const message = createOrderMessage();
    navigator.clipboard
      .writeText(message)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy message:', err);
      });
  };

  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="mb-4 flex items-center bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 py-2 px-6 rounded-full shadow-lg transition-all duration-300"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Cart
      </button>

      <form onSubmit={handleSubmitWhatsApp} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className={`block mb-2 text-sm font-medium ${
              errors.name
                ? 'text-red-700'
                : valid.name
                ? 'text-green-700'
                : 'text-gray-700'
            }`}
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`text-sm rounded-lg block w-full p-2.5 ${
              errors.name
                ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
                : valid.name
                ? 'bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500'
                : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
            }`}
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">
              <span className="font-medium">Oh, snap!</span> {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className={`block mb-2 text-sm font-medium ${
              errors.phone
                ? 'text-red-700'
                : valid.phone
                ? 'text-green-700'
                : 'text-gray-700'
            }`}
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`text-sm rounded-lg block w-full p-2.5 ${
              errors.phone
                ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
                : valid.phone
                ? 'bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500'
                : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
            }`}
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-600">
              <span className="font-medium">Oh, snap!</span> {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className={`block mb-2 text-sm font-medium ${
              errors.address
                ? 'text-red-700'
                : valid.address
                ? 'text-green-700'
                : 'text-gray-700'
            }`}
          >
            Delivery Address
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            className={`text-sm rounded-lg block w-full p-2.5 ${
              errors.address
                ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
                : valid.address
                ? 'bg-green-50 border border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500'
                : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
            }`}
            placeholder="Enter your delivery address"
            value={formData.address}
            onChange={handleInputChange}
          />
          {errors.address && (
            <p className="mt-2 text-sm text-red-600">
              <span className="font-medium">Oh, snap!</span> {errors.address}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="additionalInfo"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Additional Information (Optional)
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows={2}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Any special delivery instructions or landmarks"
            value={formData.additionalInfo}
            onChange={handleInputChange}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Complete Order via WhatsApp
        </button>

        <div className="flex items-center justify-between mt-4 gap-4">
          <button
            type="button"
            onClick={handleSubmitInstagram}
            className="flex-1 h-10 bg-gradient-to-r from-pink-500 to-red-600 text-white text-center rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Complete Order via Instagram DMs
          </button>

          <button
            type="button"
            onClick={handleCopyMessage}
            className="flex items-center py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-900 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <p className="items-center text-xs text-red-500 mt-2 text-center">
          *Press copy to copy info and paste it into Instagram DMs*
        </p>
      </form>
    </div>
  );
}
