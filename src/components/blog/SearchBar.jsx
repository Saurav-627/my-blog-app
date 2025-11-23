import { Search, X } from "lucide-react";

export const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search posts by title, content, or tags..."
        className="block w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2.5 sm:py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm sm:text-base text-slate-900 placeholder-slate-400 transition-all"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}
    </div>
  );
};
