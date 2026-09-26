/**
 * Real Estate Web Application - Prop Interfaces
 * Defines type contracts for Property Cards and Sponsor Banners.
 */

// ============================================================================
// 1. PROPERTY INTERFACES & CARD PROPS
// ============================================================================

/**
 * Structured address data for a real estate listing.
 */
export interface PropertyAddress {
  /**
   * REQUIRED: Primary street line (e.g., "123 Main St").
   * Essential for identifying the physical location of the property.
   */
  street: string;

  /**
   * REQUIRED: City or municipality where the property is located.
   * Fundamental for geographic searching and filtering.
   */
  city: string;

  /**
   * REQUIRED: State, province, or region abbreviation/name (e.g., "CA").
   * Crucial to disambiguate cities across regional jurisdictions.
   */
  state: string;

  /**
   * REQUIRED: Postal or ZIP code (e.g., "90210").
   * Necessary for accurate geospatial mapping, school district queries, and market data.
   */
  zipCode: string;

  /**
   * OPTIONAL: Apartment, suite, or unit number (e.g., "Apt 4B").
   * Only applicable to condos, co-ops, townhomes, or multi-family units; omitted for single-family residences.
   */
  unit?: string;

  /**
   * OPTIONAL: Neighborhood or district name (e.g., "Pacific Heights").
   * Useful supplemental micro-location data for buyers, but not available in all MLS listings.
   */
  neighborhood?: string;
}

/**
 * Key property metrics and architectural specifications.
 */
export interface PropertyKeyFacts {
  /**
   * REQUIRED: Count of bedrooms (supports 0 for studios or undeveloped land parcels).
   * Core baseline metric evaluated by home seekers when assessing capacity.
   */
  bedrooms: number;

  /**
   * REQUIRED: Count of bathrooms (supports fractional values, e.g., 2.5 for two full baths and one half bath).
   * Fundamental layout indicator required on all residential listings.
   */
  bathrooms: number;

  /**
   * REQUIRED: Total finished interior living space in square feet (or square meters depending on locale).
   * Critical for calculating price-per-square-foot and estimating property size.
   */
  squareFootage: number;

  /**
   * OPTIONAL: Exterior lot size in square feet or acres.
   * Meaningful for single-family homes, ranches, or land; non-applicable or undefined for high-rise condos and apartments.
   */
  lotSizeSqFt?: number;

  /**
   * OPTIONAL: Year the construction of the building was completed.
   * Often absent for new pre-construction developments, major rebuilds, or historic properties without verified records.
   */
  yearBuilt?: number;

  /**
   * OPTIONAL: Number of dedicated garage or off-street parking spots.
   * Varies widely by property type; frequently irrelevant or omitted for dense urban properties.
   */
  parkingSpaces?: number;

  /**
   * OPTIONAL: Structural archetype (e.g., "Single Family", "Condo", "Townhouse", "Multi-Family").
   * Helpful category metadata, but secondary to the core bed/bath/sqft numbers on a compact card.
   */
  propertyType?: 'single-family' | 'condo' | 'townhouse' | 'multi-family' | 'land';
}

/**
 * Primary visual asset details for the property listing.
 */
export interface PropertyImage {
  /**
   * REQUIRED: Direct URL pointing to the primary/featured listing photograph.
   * Mandatory because a visual preview is the single most engaging element on a property card.
   */
  src: string;

  /**
   * REQUIRED: Descriptive alternative text for screen readers and SEO accessibility.
   * Mandatory to ensure WCAG compliance and provide fallback if image loading fails.
   */
  alt: string;

  /**
   * OPTIONAL: Low-quality image placeholder (LQIP) or base64 blur hash.
   * Enhances perceived loading performance; optional since not all image pipelines provide pre-computed blur hashes.
   */
  blurDataUrl?: string;

  /**
   * OPTIONAL: Prominent badge overlay text on the image (e.g., "New Listing", "Price Reduced", "Open House").
   * Only displayed when a listing is actively promoted or in a special promotional cycle.
   */
  badge?: string;
}

/**
 * Props for the PropertyCard component.
 */
export interface PropertyCardProps {
  /**
   * REQUIRED: Unique identifier for the listing (e.g., MLS number or database UUID).
   * Essential for React reconciliation keys, telemetry, and generating unique detail page links.
   */
  id: string;

  /**
   * REQUIRED: Listing price value in whole units (e.g., 850000).
   * Price is the decisive qualification factor for prospective buyers and must always be visible.
   */
  price: number;

  /**
   * REQUIRED: Detailed location information.
   * Address is mandatory so users immediately recognize the property's location.
   */
  address: PropertyAddress;

  /**
   * REQUIRED: Core architectural parameters (bedrooms, bathrooms, and square footage).
   * Mandatory because buyers filter and compare listings primarily through these key facts.
   */
  keyFacts: PropertyKeyFacts;

  /**
   * REQUIRED: Featured hero image representation.
   * Real estate cards require visual media to maintain user trust and engagement.
   */
  image: PropertyImage;

  /**
   * OPTIONAL: Three-letter ISO 4217 currency code (e.g., "USD", "CAD", "EUR").
   * Defaults to "USD" if omitted, making it optional for standard US-based applications.
   */
  currency?: string;

  /**
   * OPTIONAL: Transaction classification of the property (e.g., "for-sale", "for-rent", "pending", "sold").
   * Defaults to "for-sale" in most residential buying contexts; optional unless showing multi-status feeds.
   */
  status?: 'for-sale' | 'for-rent' | 'pending' | 'sold';

  /**
   * OPTIONAL: Indicates whether the current authenticated user has saved/bookmarked this property.
   * Only applicable when the application features user accounts and wishlist capabilities.
   */
  isFavorite?: boolean;

  /**
   * OPTIONAL: Callback function triggered when the user clicks the bookmark/heart icon.
   * Optional because the card may be rendered in a read-only preview mode without interactive state.
   */
  onFavoriteToggle?: (id: string) => void;

  /**
   * OPTIONAL: Callback function triggered when clicking anywhere on the card to open detail view.
   * Can be omitted if the card is wrapped in a standard semantic anchor (`<a>`) tag or router `<Link>`.
   */
  onClick?: (id: string) => void;

  /**
   * OPTIONAL: Additional CSS classes or utility styles for custom layout adjustments.
   * Standard React prop convention for compositional styling in grids or carousels.
   */
  className?: string;
}

// ============================================================================
// 2. SPONSOR INTERFACES & BANNER PROPS
// ============================================================================

/**
 * Props for the SponsorBanner component.
 */
export interface SponsorBannerProps {
  /**
   * REQUIRED: Unique identifier for the sponsor or sponsorship campaign.
   * Essential for React list keys, impression tracking, and ad attribution metrics.
   */
  id: string;

  /**
   * REQUIRED: Commercial name of the sponsoring brand, brokerage, or mortgage lender (e.g., "Apex Mortgage Partners").
   * Mandatory because transparent ad disclosure and brand attribution are legally and commercially required.
   */
  businessName: string;

  /**
   * REQUIRED: Primary promotional message, marketing headline, or value proposition (e.g., "Get pre-approved with rates as low as 5.8% today!").
   * Mandatory to deliver the advertiser's core promotional value to the user.
   */
  promotionalCopy: string;

  /**
   * REQUIRED: Fully-qualified external URL destination for the sponsor (e.g., "https://example.com/mortgage-rates").
   * Mandatory because the fundamental purpose of a sponsor banner is to route traffic to the sponsor's external landing page.
   */
  destinationUrl: string;

  /**
   * OPTIONAL: URL of the sponsor's logo image file.
   * Optional because the banner should gracefully fall back to displaying the `businessName` as stylized typography if no asset is supplied.
   */
  logoUrl?: string;

  /**
   * OPTIONAL: Explicit label for the action button (e.g., "Learn More", "Apply Now", "Get a Quote").
   * Defaults to a generic call-to-action like "Visit Sponsor" or "Learn More" if omitted.
   */
  callToActionText?: string;

  /**
   * OPTIONAL: Anchor target attribute indicating where to open the external destination link.
   * Defaults to "_blank" (with `rel="noopener noreferrer"`) for external links to preserve the user's browsing session.
   */
  target?: '_blank' | '_self';

  /**
   * OPTIONAL: Regulatory or disclosure text (e.g., "Sponsored Advertisement • Member FDIC • NMLS #12345").
   * Important for financial compliance, but optional as simple campaigns may only require a basic "Sponsored" label.
   */
  disclosureText?: string;

  /**
   * OPTIONAL: URL for a transparent 1x1 tracking pixel to record impression events with an ad network.
   * Optional because not all sponsors utilize automated external telemetry pixels.
   */
  trackingPixelUrl?: string;

  /**
   * OPTIONAL: Callback triggered when the user clicks the banner before external navigation occurs.
   * Useful for internal analytics and click-through attribution tracking; optional if not tracking clicks via JS.
   */
  onSponsorClick?: (sponsorId: string, destinationUrl: string) => void;

  /**
   * OPTIONAL: Additional CSS classes or styling overrides for responsive positioning and theming.
   * Allows parent containers to control margin, z-index, or max-width.
   */
  className?: string;
}
