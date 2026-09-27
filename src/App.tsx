import React, { useState } from 'react';
import { Heart, Phone, X, UserCheck, ShieldCheck, Mail } from 'lucide-react';
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

const assignedAgent = {
  name: "Sarah Jenkins",
  license: "DRE #02194830",
  phone: "(800) 555-0199",
  directTel: "+18005550199",
  email: "sarah.jenkins@realtypremier.com",
  agency: "Premier Realty Group",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300",
};

export default function App() {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [selectedPropertyForAgent, setSelectedPropertyForAgent] = useState<Property | null>(null);
  const [isGeneralAgentModalOpen, setIsGeneralAgentModalOpen] = useState(false);

  const handleFavoriteToggle = (id: string, isFav: boolean) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (isFav) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const activeModalProperty = selectedPropertyForAgent;
  const isModalOpen = Boolean(activeModalProperty) || isGeneralAgentModalOpen;

  const closeModal = () => {
    setSelectedPropertyForAgent(null);
    setIsGeneralAgentModalOpen(false);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header with Title and Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Featured Neighborhood Listings</h1>
          <p className="mt-1 text-sm text-slate-600">Explore curated homes or speak directly with our local neighborhood specialist.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-rose-50 px-3.5 py-1.5 text-xs font-semibold text-rose-700 border border-rose-100">
            <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            <span>{favoriteIds.size} Saved {favoriteIds.size === 1 ? 'Home' : 'Homes'}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsGeneralAgentModalOpen(true)}
            aria-label="Call a licensed real estate agent"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition"
          >
            <Phone className="h-4 w-4" />
            <span>Call Agent</span>
          </button>
        </div>
      </div>
      
      <SponsorBanner sponsor={sampleSponsor} />
      <SearchFilters />

      <section aria-labelledby="listings-heading">
        <h2 id="listings-heading" className="sr-only">Available Properties</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sampleProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavorite={favoriteIds.has(property.id)}
              onFavoriteToggle={handleFavoriteToggle}
              onContactAgent={(prop) => setSelectedPropertyForAgent(prop)}
            />
          ))}
        </div>
      </section>

      {/* Call Agent Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="agent-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close dialog"
              className="absolute top-4 right-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={assignedAgent.avatar}
                alt={assignedAgent.name}
                className="h-16 w-16 rounded-full object-cover ring-2 ring-blue-100"
              />
              <div>
                <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                  <ShieldCheck className="h-3.5 w-3.5" /> Licensed Agent
                </span>
                <h3 id="agent-modal-title" className="mt-1 text-lg font-bold text-slate-900">
                  {assignedAgent.name}
                </h3>
                <p className="text-xs text-slate-500">{assignedAgent.agency} • {assignedAgent.license}</p>
              </div>
            </div>

            {activeModalProperty ? (
              <div className="mt-4 rounded-lg bg-slate-50 p-3 border border-slate-200 text-xs">
                <span className="font-semibold text-slate-500 uppercase tracking-wide">Inquiring about:</span>
                <p className="font-medium text-slate-800 text-sm mt-0.5">{activeModalProperty.title}</p>
                <p className="text-slate-600">{activeModalProperty.address.street}, {activeModalProperty.address.city}</p>
              </div>
            ) : (
              <div className="mt-4 rounded-lg bg-slate-50 p-3 border border-slate-200 text-xs text-slate-600">
                Ready to answer questions about any Springfield listings, schedule in-person tours, or guide your offer process.
              </div>
            )}

            <div className="mt-6 flex flex-col gap-2.5">
              <a
                href={`tel:${assignedAgent.directTel}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 px-4 font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition"
              >
                <Phone className="h-5 w-5" />
                <span>Call Now: {assignedAgent.phone}</span>
              </a>

              <a
                href={`mailto:${assignedAgent.email}?subject=Inquiry${activeModalProperty ? ` on ${activeModalProperty.title}` : ''}`}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 px-4 font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 transition"
              >
                <Mail className="h-4 w-4 text-slate-500" />
                <span>Send Email</span>
              </a>
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              Available 7 days a week • 8:00 AM – 8:00 PM CST
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

