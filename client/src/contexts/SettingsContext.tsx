import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../config/api';

interface Settings {
  site_name: string;
  site_description: string;
  theme: 'shopee' | 'tokopedia' | 'lazada';
  hero_title: string;
  hero_subtitle: string;
  contact_phone: string;
  contact_email: string;
  contact_address: string;
  free_shipping_min: string;
  popup_enabled: string;
  popup_title: string;
  popup_content: string;
  popup_image: string;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
  isLoading: boolean;
}

const defaultSettings: Settings = {
  site_name: 'BUKUKU',
  site_description: 'Marketplace Buku Terlengkap di Indonesia',
  theme: 'shopee',
  hero_title: 'Temukan Buku Impian Anda',
  hero_subtitle: 'Jelajahi ribuan buku dari penjual terpercaya di seluruh Indonesia',
  contact_phone: '021-1234-5678',
  contact_email: 'info@bukuku.id',
  contact_address: 'Jakarta, Indonesia',
  free_shipping_min: '100000',
  popup_enabled: '1',
  popup_title: 'Promo Spesial!',
  popup_content: 'Dapatkan diskon 20% untuk pembelian pertama!',
  popup_image: 'promo-popup.jpg',
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.get('/settings');
      setSettings({ ...defaultSettings, ...response.data.settings });
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<Settings>) => {
    try {
      await api.put('/settings', { settings: newSettings });
      setSettings(prev => ({ ...prev, ...newSettings }));
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};