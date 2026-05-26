const blockTypeNames: Record<string, string> = {
  Carousel: 'Carousel',
  NewsletterSubscribe: 'Newsletter',
  ProductRecommendedProducts: 'Product Gallery',
  TextCard: 'Rich Text',
  AnnouncementBar: 'Announcement Bar',
  CustomerReview: 'Customer reviews',
  ProductLegalInformation: 'Legal Information',
  MultiGrid: 'Layout',
  Footer: 'Footer',
  ItemText: 'Item Details',
  CategoryData: 'Category Data',
  TechnicalData: 'Technical Data',
  ItemData: 'Item Data',
  Banner: 'Image Banner',
  UtilityBar: 'Utility Bar',
  HeaderContainer: 'Header Container',
  FooterContainer: 'Footer Container',
  FooterCompanyData: 'Company Data',  // NK added
  FooterPaymentShippingIcons: 'Payment & Shipment Icons', // NK added
  FooterFootnote: 'Footer Footnote', // NK added
};

export const getBlockDisplayName = (blockName: string): string => {
  return blockTypeNames[blockName] ?? blockName;
};
