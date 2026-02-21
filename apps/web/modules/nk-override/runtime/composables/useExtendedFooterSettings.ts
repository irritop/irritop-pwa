import type { FooterSettings } from '~/components/blocks/Footer/types';

// Extend the type with new properties
export interface ExtendedFooterSettings extends FooterSettings {
  footnoteDescription?: string;
}

// Create a wrapper function that extends the defaults
export function createExtendedFooterSettings(base?: Partial<FooterSettings>): ExtendedFooterSettings {
  return {
    ...(base as FooterSettings ?? ({} as FooterSettings)),
    footnoteDescription: '',
    column1: {
      ...base?.column1,
      description: '',
  } as ExtendedFooterSettings['column1'],
  };
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