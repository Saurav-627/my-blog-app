import { ArrowLeft } from "lucide-react";

export const FormHeader = ({ isEditMode, onBack }) => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            {isEditMode ? "Edit Post" : "Create New Post"}
          </h1>
        </div>
      </div>
    </header>
  );
};
