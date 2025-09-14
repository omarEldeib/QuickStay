import React from "react";

const Filter = ({ filters, setFilters }) => {
  // ✅ Toggle popular filters (checkbox)
  const handlePopularChange = (value) => {
    setFilters((prev) => {
      const isSelected = prev.popular.includes(value);
      return {
        ...prev,
        popular: isSelected
          ? prev.popular.filter((item) => item !== value)
          : [...prev.popular, value],
      };
    });
  };

  // ✅ Toggle price range filters (checkbox)
  const handlePriceChange = (value) => {
    setFilters((prev) => {
      const isSelected = prev.price.includes(value);
      return {
        ...prev,
        price: isSelected
          ? prev.price.filter((item) => item !== value)
          : [...prev.price, value],
      };
    });
  };

  // ✅ Handle sort (radio button)
  const handleSortChange = (value) => {
    setFilters((prev) => ({
      ...prev,
      sort: value,
    }));
  };

  // ✅ Clear all filters
  const handleClear = () => {
    setFilters({
      popular: [],
      price: [],
      sort: "",
    });
  };

  return (
    <div className="border border-gray-200 w-full lg:w-[280px] h-max rounded-lg bg-white shadow-sm sticky top-24">
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 border-b border-gray-200 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-base sm:text-lg font-semibold text-gray-900">Filters</h1>
          <button
            onClick={handleClear}
            className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Popular Filters */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Popular Filters</h2>
        <div className="flex flex-col gap-3">
          {["Single Bed", "Double Bed", "Luxury Room", "Family Suite"].map(
            (item) => (
              <label key={item} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.popular.includes(item)}
                  onChange={() => handlePopularChange(item)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm sm:text-base text-gray-700">{item}</span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Price Range</h2>
        <div className="flex flex-col gap-3">
          {["0-500", "500-1000", "1000-2000", "2000-3000"].map((range) => (
            <label key={range} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.price.includes(range)}
                onChange={() => handlePriceChange(range)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm sm:text-base text-gray-700">${range.replace("-", " – $")}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort By */}
      <div className="px-4 sm:px-6 py-4">
        <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">Sort By</h2>
        <div className="flex flex-col gap-3">
          {[
            { label: "Price: Low to High", value: "low-high" },
            { label: "Price: High to Low", value: "high-low" },
            { label: "Newest First", value: "newest" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="sort"
                checked={filters.sort === option.value}
                onChange={() => handleSortChange(option.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm sm:text-base text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
