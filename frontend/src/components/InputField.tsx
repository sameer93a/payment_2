export const InputField = ({
  title,
  placeholder,
}: {
  title: string;
  placeholder: string;
}) => {
  return (
    <div className="p-2">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {title}
      </label>
      <input
        type="text"
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
};
