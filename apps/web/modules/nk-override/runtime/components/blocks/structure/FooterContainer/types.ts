import type { Block } from '@plentymarkets/shop-api';

export interface FooterContainerColors {
  background: string;
  text: string;
  footnoteBackground: string;
  footnoteText: string;
}

export type FooterContainerBlock = Block & {
  name: 'FooterContainer';
  type: 'structure';
  content: Block[];
  configuration?: {
    visible: boolean;
    colors?: FooterContainerColors;
    legalOptions?: FooterColumn;
    showFootnote?: boolean;
  };
};

export type FooterContainerProps = {
  content: Block[];
  configuration?: {
    visible: boolean;
    colors?: FooterContainerColors;
    legalOptions?: FooterColumn;
    showFootnote?: boolean;
  };
};

export interface FooterSwitchDefinition {
  columnGroup: 'legal' | 'services';
  key: string;
  shopTranslationKey: string;
  editorTranslationKey: string;
  link: string;
}

export interface FooterColumn {
  title: string;
  description?: string;
  showContactLink?: boolean;
  showRegisterLink?: boolean;
  showTermsAndConditions?: boolean;
  showCancellationRights?: boolean;
  showCancellationForm?: boolean;
  showLegalDisclosure?: boolean;
  showPrivacyPolicy?: boolean;
  showDeclarationOfAccessibility?: boolean;
  [key: string]: string | boolean | undefined;
}

export interface FooterColors {
  background: string;
  text: string;
  footnoteBackground: string;
  footnoteText: string;
}

export interface FooterContent {
  column1: FooterColumn;
  column2: FooterColumn;
  column3: FooterColumn;
  column4: FooterColumn;
  footnote: string;
  footnoteAlign: 'left' | 'center' | 'right';
  colors: FooterColors;
}

export interface FooterFootnoteContent {
  component?: 'FooterFootnote';
  showFootnote?: boolean;
  footnoteBackgroundColor?: string;
  footnoteTextColor?: string;
  showTermsAndConditions?: boolean;
  showCancellationRights?: boolean;
  showCancellationForm?: boolean;
  showLegalDisclosure?: boolean;
  showPrivacyPolicy?: boolean;
  showDeclarationOfAccessibility?: boolean;
  [key: string]: string | boolean | undefined;
}

export type FooterFootnoteBlock = Block & {
  name: 'FooterFootnote';
  type: 'content';
  content: FooterFootnoteContent;
};

export type FooterFootnoteProps = {
  content?: FooterFootnoteContent;
  showFootnote?: boolean;
  colors?: {
    footnoteBackground?: string;
    footnoteText?: string;
  };
  legalSwitches?: Array<{
    id: string;
    translationKey: string;
    link: string;
  }>;
  localePath?: (path: string) => string;
  nuxtLink?: string | object;
  copyrightText?: string;
};

export type FooterFootnoteFormProps = {
  uuid?: string;
};
