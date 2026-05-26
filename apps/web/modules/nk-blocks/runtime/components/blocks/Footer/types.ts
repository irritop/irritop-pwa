import type { Block } from '@plentymarkets/shop-api';



export interface FooterFootnoteContent {
  component?: 'FooterFootnote';
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

export interface FooterSwitchDefinition {
  columnGroup: 'legal' | 'services';
  key: string;
  shopTranslationKey: string;
  editorTranslationKey: string;
  link: string;
}
