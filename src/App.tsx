import React from 'react';
import { Property, Sponsor } from './types';
import { PropertyCard } from './components/PropertyCard';
import { SponsorBanner } from './components/SponsorBanner';
import { SearchFilters } from './components/SearchFilters';

const sampleProperties: Property[] = [
  {
    id: "prop-101",
    title: "Modern Craftsman Home",
    price: 685000,
    address: { street: "124 Maple Ave", city: "Springfield", state: "IL", zipCode: "62701" },
    facts: { bedrooms: 3, bathrooms: 2, squareFeet: 1850 },
    imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600",
    imageAlt: "Two-story craftsman style home with covered front porch and green front yard"
  },
  {
    id: "prop-102",
    title: "Downtown Loft",
    price: 420000,
    address: { street: "450 Market St Apt 4B", city: "Springfield", state: "IL", zipCode: "62701" },
    facts: { bedrooms: 1, bathrooms: 1, squareFeet: 920 },
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
    imageAlt: "Open-concept industrial apartment interior with brick walls and large warehouse windows"
  },
  {
    id: "prop-103",
    title: "Suburban Single-Family",
    price: 540000,
    address: { street: "882 Oak Ridge Rd", city: "Springfield", state: "IL", zipCode: "62702" },
    facts: { bedrooms: 4, bathrooms: 3, squareFeet: 2400 },
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600",
    imageAlt: "Spacious contemporary suburban house featuring an attached two-car garage"
  }
];

const sampleSponsor: Sponsor = {
  id: "spons-01",
  businessName: "Horizon Home Loans",
  tagline: "Competitive fixed-rate mortgages tailored to first-time buyers.",
  destinationUrl: "https://example.com/horizon-loans"
};

export default function App() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900">Featured Neighborhood Listings</h1>
      
      <SponsorBanner sponsor={sampleSponsor} />
      <SearchFilters />

      <section aria-labelledby="listings-heading">
        <h2 id="listings-heading" className="sr-only">Available Properties</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </main>
  );
}
