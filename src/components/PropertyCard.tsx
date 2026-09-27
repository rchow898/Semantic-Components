import React, { useState } from 'react';
import { Heart, Phone } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string, isFav: boolean) => void;
  onContactAgent?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite: initialFavorite = false,
  onFavoriteToggle,
  onContactAgent,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialFavorite);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: property.currency || 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !isFavorite;
    setIsFavorite(nextState);
    if (onFavoriteToggle) {
      onFavoriteToggle(property.id, nextState);
    }
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={property.imageUrl}
          alt={property.imageAlt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Remove ${property.title} from favorites`
              : `Save ${property.title} to favorites`
          }
          className={`absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md shadow-sm transition duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 ${
            isFavorite
              ? 'bg-rose-50/90 text-rose-600 hover:bg-rose-100'
              : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500'
          }`}
        >
          <Heart
            className={`h-5 w-5 transition-transform active:scale-90 ${
              isFavorite ? 'fill-rose-500 text-rose-500' : 'text-current'
            }`}
          />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <header>
          <p className="text-xl font-bold text-slate-900">{formattedPrice}</p>
          <h3 className="text-lg font-semibold text-slate-800">{property.title}</h3>
        </header>

        <address className="mt-1 text-sm not-italic text-slate-600">
          {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}
        </address>

        <ul className="mt-3 flex gap-4 text-xs font-medium text-slate-500" aria-label="Key property facts">
          <li>{property.facts.bedrooms} Beds</li>
          <li>{property.facts.bathrooms} Baths</li>
          <li>{property.facts.squareFeet.toLocaleString()} sqft</li>
        </ul>

        <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
          <a
            href={`/properties/${property.id}`}
            aria-label={`View full details for ${property.title} on ${property.address.street}`}
            className="inline-flex items-center justify-center rounded bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 transition"
          >
            View Details
          </a>
          <button
            type="button"
            onClick={() => onContactAgent ? onContactAgent(property) : window.open(`tel:+18005550199`)}
            aria-label={`Call agent for ${property.title} at 1-800-555-0199`}
            className="inline-flex items-center justify-center gap-1.5 rounded border border-blue-600 bg-blue-50 px-3 py-2 text-center text-sm font-semibold text-blue-700 hover:bg-blue-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition"
          >
            <Phone className="h-4 w-4" />
            <span>Call Agent</span>
          </button>
        </div>
      </div>
    </article>
  );
};

