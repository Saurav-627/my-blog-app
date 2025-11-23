// import { Filter } from "lucide-react";

export const CategoryFilter = ({ categories, selectedCategory, onChange }) => {
  return (
    <div className="w-full">
      {/* <div className="flex items-center gap-2 mb-2">
        <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-600" />
        <label className="text-xs sm:text-sm font-medium text-slate-700">
          Category
        </label>
      </div> */}
      <select
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-3 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm sm:text-base text-slate-900 transition-all cursor-pointer"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};
