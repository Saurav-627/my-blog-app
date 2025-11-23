export const CategorySelect = ({ value, onChange, disabled }) => {
  const categories = [
    { value: "general", label: "General" },
    { value: "technology", label: "Technology" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "business", label: "Business" },
    { value: "health", label: "Health" },
    { value: "travel", label: "Travel" },
  ];

  return (
    <div>
      <label
        htmlFor="category"
        className="block text-sm font-medium text-slate-700 mb-2"
      >
        Category
      </label>
      <select
        id="category"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
        disabled={disabled}
      >
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
};
