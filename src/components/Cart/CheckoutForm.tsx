import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';

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

export default function CheckoutForm({ onBack, onClose }: CheckoutFormProps) {
  const { state, dispatch } = useCart();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    additionalInfo: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const validateFields = (): boolean => {
    const phonePattern = /^(010|011|012|015)\d{8}$/;

    const newErrors = {
      name: formData.name ? '' : 'Name is required.',
      phone: phonePattern.test(formData.phone)
        ? ''
        : 'Phone number must start with 010, 011, 012, or 015 and be 11 digits long.',
      address: formData.address ? '' : 'Address is required.',
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) return;

    const orderDetails = state.items.map(item =>
      `${item.product.name} (Size: ${item.selectedSize}, Quantity: ${item.quantity})`
    ).join('\n');

    const message = `New Order:\n\n` +
      `Customer Details:\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Address: ${formData.address}\n` +
      `Additional Info: ${formData.additionalInfo}\n\n` +
      `Order Items:\n${orderDetails}\n\n` +
      `Total: ${state.total} EGP`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/201117571023?text=${encodedMessage}`;

    dispatch({ type: 'CLEAR_CART' });
    onClose();

    window.open(whatsappUrl, '_blank');
  };

  const handleSubmitInstagram = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) return;

    const orderDetails = state.items.map(item =>
      `${item.product.name} (Size: ${item.selectedSize}, Quantity: ${item.quantity})`
    ).join('\n');

    const message = `New Order:\n\n` +
      `Customer Details:\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Address: ${formData.address}\n` +
      `Additional Info: ${formData.additionalInfo}\n\n` +
      `Order Items:\n${orderDetails}\n\n` +
      `Total: ${state.total} EGP`;

    const encodedMessage = encodeURIComponent(message);
    const instagramUrl = `https://ig.me/m/a.mamdouh_elnajjar_?text=${encodedMessage}`;

    dispatch({ type: 'CLEAR_CART' });
    onClose();

    window.open(instagramUrl, '_blank');
  };

  const handleCopyMessage = () => {
    if (!validateFields()) return;

    const orderDetails = state.items.map(item =>
      `${item.product.name} (Size: ${item.selectedSize}, Quantity: ${item.quantity})`
    ).join('\n');

    const message = `New Order:\n\n` +
      `Customer Details:\n` +
      `Name: ${formData.name}\n` +
      `Phone: ${formData.phone}\n` +
      `Address: ${formData.address}\n` +
      `Additional Info: ${formData.additionalInfo}\n\n` +
      `Order Items:\n${orderDetails}\n\n` +
      `Total: ${state.total} EGP`;

    navigator.clipboard.writeText(message).then(() => {
      alert("Message copied to clipboard! Now you can paste it into Instagram DM.");
    }).catch(err => {
      alert("Failed to copy message: " + err);
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
              errors.name ? 'text-red-700 dark:text-red-500' : 'text-gray-700'
            }`}
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className={`${
              errors.name
                ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
                : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
            } text-sm rounded-lg block w-full p-2.5`}
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oh, snap!</span> {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className={`block mb-2 text-sm font-medium ${
              errors.phone ? 'text-red-700 dark:text-red-500' : 'text-gray-700'
            }`}
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className={`${
              errors.phone
                ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
                : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
            } text-sm rounded-lg block w-full p-2.5`}
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              <span className="font-medium">Oh, snap!</span> {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className={`block mb-2 text-sm font-medium ${
              errors.address ? 'text-red-700 dark:text-red-500' : 'text-gray-700'
            }`}
          >
            Delivery Address
          </label>
          <textarea
            id="address"
            rows={3}
            className={`${
              errors.address
                ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
                : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
            } text-sm rounded-lg block w-full p-2.5`}
            placeholder="Enter your delivery address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          {errors.address && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
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
            rows={2}
            className="bg-white border border-gray-300 text-gray-900 placeholder-gray-400 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Any special delivery instructions or landmarks"
            value={formData.additionalInfo}
            onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <button
            type="submit"
            className="flex justify-center w-full py-2 px-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Complete Order via WhatsApp
          </button>

          <div className="flex justify-between items-center space-x-2">
  <button
    type="button"
    onClick={handleSubmitInstagram}
    className="flex-1 mb-12 h-10 bg-gradient-to-r from-pink-500 to-red-600 text-white text-center rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
  >
    Complete Order via Instagram
  </button>

  <div className="w-32">
    <button
      type="button"
      onClick={handleCopyMessage}
      className="mt-2 w-full h-10 bg-gradient-to-r from-blue-600 to-indigo-900 text-white rounded-lg hover:opacity-90 transition-opacity"
    >
      Copy Only
    </button>
    <p className="text-xs text-gray-500 mt-2 text-center">
      Press to copy info and paste it into Instagram DMs
    </p>
  </div>
</div>


        </div>
      </form>
    </div>
  );
}
