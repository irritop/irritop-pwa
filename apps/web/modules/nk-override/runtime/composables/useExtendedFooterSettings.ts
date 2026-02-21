import type { FooterSettings } from '~/components/blocks/Footer/types';

// Extend the type with new properties
export interface ExtendedFooterSettings extends FooterSettings {
  footnoteDescription?: string;
}

// Create a wrapper function that extends the defaults
export const createExtendedFooterSettings = (): ExtendedFooterSettings => {
  const baseDefaults = createDefaultFooterSettings(); // Your original function
  
  return {
    ...baseDefaults,
    footnoteDescription: '',
    column1: {
      ...baseDefaults.column1,
      description: ''
    },
  } as ExtendedFooterSettings;
};

// Helper to extend existing footer data
export const mapExtendedFooterData = (data: ExtendedFooterSettings | null): ExtendedFooterSettings => {
  const defaults = createExtendedFooterSettings();

  return {
    ...defaults,
    ...data,
    meta: {
      ...defaults.meta,
      ...data?.meta,
    },
    column1: {
      ...defaults.column1,
      ...data?.column1,
    },
    column2: {
      ...defaults.column2,
      ...data?.column2,
    },
    column3: {
      ...defaults.column3,
      ...data?.column3,
    },
    column4: {
      ...defaults.column4,
      ...data?.column4,
    },
    colors: {
      ...defaults.colors,
      ...data?.colors,
    },
  } as ExtendedFooterSettings;
};