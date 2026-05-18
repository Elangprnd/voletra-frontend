'use client';

import React from 'react';

const CATEGORIES = [
  'Emergency Response',
  'Education',
  'Logistics',
  'Technology',
  'Healthcare',
  'Music',
  'Elderly Care',
  'Environment',
];

const LOCATIONS = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Medan'];

interface MissionFilterProps {
  search: string;
  location: string;
  category: string;
  onSearchChange: (val: string) => void;
  onLocationChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
}

const MissionFilter: React.FC<MissionFilterProps> = ({
  search,
  location,
  category,
  onSearchChange,
  onLocationChange,
  onCategoryChange,
}) => {
  return (
    <div className="mb-8">
      {/* Search + Location */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search"
          className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-primary-normal"
        />
        <select
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none text-gray-500"
        >
          <option value="">Your Location</option>
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Category Radio */}
      <div className="flex flex-wrap gap-4">
        {CATEGORIES.map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
          >
            <input
              type="radio"
              name="category"
              value={cat}
              checked={category === cat}
              onChange={() => {}} // kosongkan onChange
              onClick={() => onCategoryChange(category === cat ? '' : cat)}
              className="accent-primary-normal"
            />
            {cat}
          </label>
        ))}
      </div>
    </div>
  );
};

export default MissionFilter;
