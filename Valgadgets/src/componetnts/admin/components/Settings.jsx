import { useState } from 'react';
import {
  User,
  Store,
  Shield,
  Bell,
  CreditCard,
  Truck,
  Palette,
  Save,
  Eye,
  EyeOff,
} from 'lucide-react';

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);

  const [settings, setSettings] = useState({
    name: 'Admin User',
    email: 'admin@valgadgets.com',
    phone: '+2348012345678',

    storeName: 'Val Gadgets',
    address: 'Lekki Phase 1, Lagos',

    password: 'password123',

    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,

    flutterwave: true,
    paystack: true,
    wallet: true,

    autoAssign: true,
    deliveryFee: 3500,

    darkMode: false,
  });

  const handleChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className='space-y-6 p-6'>
      {/* Header */}

      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Settings</h1>

        <p className='text-gray-500 mt-1'>Manage your application settings.</p>
      </div>

      {/* Profile */}

      <div className='bg-white rounded-3xl border shadow-sm p-6'>
        <div className='flex items-center gap-3 mb-6'>
          <User className='text-[#2F4832]' />

          <h2 className='text-xl font-bold'>Profile Settings</h2>
        </div>

        <div className='grid md:grid-cols-2 gap-5'>
          <input
            className='border rounded-xl p-3'
            placeholder='Full Name'
            value={settings.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />

          <input
            className='border rounded-xl p-3'
            placeholder='Email'
            value={settings.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />

          <input
            className='border rounded-xl p-3'
            placeholder='Phone'
            value={settings.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>
      </div>

      {/* Store */}

      <div className='bg-white rounded-3xl border shadow-sm p-6'>
        <div className='flex items-center gap-3 mb-6'>
          <Store className='text-[#2F4832]' />

          <h2 className='text-xl font-bold'>Store Information</h2>
        </div>

        <div className='grid md:grid-cols-2 gap-5'>
          <input
            className='border rounded-xl p-3'
            value={settings.storeName}
            onChange={(e) => handleChange('storeName', e.target.value)}
          />

          <input
            className='border rounded-xl p-3'
            value={settings.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </div>
      </div>

      {/* Security */}

      <div className='bg-white rounded-3xl border shadow-sm p-6'>
        <div className='flex items-center gap-3 mb-6'>
          <Shield className='text-[#2F4832]' />

          <h2 className='text-xl font-bold'>Security</h2>
        </div>

        <div className='relative max-w-lg'>
          <input
            type={showPassword ? 'text' : 'password'}
            className='border rounded-xl p-3 w-full pr-12'
            value={settings.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />

          <button
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-4 top-3 text-gray-500'>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      {/* Notifications */}

      <div className='bg-white rounded-3xl border shadow-sm p-6'>
        <div className='flex items-center gap-3 mb-6'>
          <Bell className='text-[#2F4832]' />

          <h2 className='text-xl font-bold'>Notifications</h2>
        </div>

        <div className='space-y-4'>
          {[
            ['Email Notifications', 'emailNotifications'],
            ['SMS Notifications', 'smsNotifications'],
            ['Push Notifications', 'pushNotifications'],
          ].map(([label, key]) => (
            <div key={key} className='flex justify-between items-center'>
              <span>{label}</span>

              <input
                type='checkbox'
                checked={settings[key]}
                onChange={(e) => handleChange(key, e.target.checked)}
                className='w-5 h-5'
              />
            </div>
          ))}
        </div>
      </div>

      {/* Payment */}

      <div className='bg-white rounded-3xl border shadow-sm p-6'>
        <div className='flex items-center gap-3 mb-6'>
          <CreditCard className='text-[#2F4832]' />

          <h2 className='text-xl font-bold'>Payment Methods</h2>
        </div>

        <div className='space-y-4'>
          {[
            ['Flutterwave', 'flutterwave'],
            ['Paystack', 'paystack'],
            ['Wallet', 'wallet'],
          ].map(([label, key]) => (
            <div key={key} className='flex justify-between items-center'>
              <span>{label}</span>

              <input
                type='checkbox'
                checked={settings[key]}
                onChange={(e) => handleChange(key, e.target.checked)}
                className='w-5 h-5'
              />
            </div>
          ))}
        </div>
      </div>

      {/* Delivery */}

      <div className='bg-white rounded-3xl border shadow-sm p-6'>
        <div className='flex items-center gap-3 mb-6'>
          <Truck className='text-[#2F4832]' />

          <h2 className='text-xl font-bold'>Delivery Settings</h2>
        </div>

        <div className='grid md:grid-cols-2 gap-5'>
          <div className='flex justify-between items-center border rounded-xl p-4'>
            <span>Auto Assign Rider</span>

            <input
              type='checkbox'
              checked={settings.autoAssign}
              onChange={(e) => handleChange('autoAssign', e.target.checked)}
              className='w-5 h-5'
            />
          </div>

          <input
            type='number'
            className='border rounded-xl p-3'
            value={settings.deliveryFee}
            onChange={(e) => handleChange('deliveryFee', e.target.value)}
          />
        </div>
      </div>

      {/* Theme */}

      <div className='bg-white rounded-3xl border shadow-sm p-6'>
        <div className='flex items-center gap-3 mb-6'>
          <Palette className='text-[#2F4832]' />

          <h2 className='text-xl font-bold'>Appearance</h2>
        </div>

        <div className='flex justify-between items-center'>
          <span>Dark Mode</span>

          <input
            type='checkbox'
            checked={settings.darkMode}
            onChange={(e) => handleChange('darkMode', e.target.checked)}
            className='w-5 h-5'
          />
        </div>
      </div>

      {/* Save */}

      <div className='flex justify-end'>
        <button className='flex items-center gap-2 px-8 py-3 rounded-2xl bg-[#2F4832] hover:bg-[#243927] text-white transition'>
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
