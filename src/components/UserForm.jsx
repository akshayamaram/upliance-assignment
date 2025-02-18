import { useState, useEffect } from "react";

const UserForm = ({ onSubmit, onChange, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  // useEffect(() => {
  //   setFormData(initialData || { name: "", address: "", email: "", phone: "" });
  // }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    onChange();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", address: "", email: "", phone: "" }); 
  };

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <h2 className="text-xl font-bold mb-2">User Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "address", "email", "phone"].map((field) => (
          <input
            key={field}
            type={
              field === "email" ? "email" : field === "phone" ? "tel" : "text"
            }
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-2 rounded bg-gray-700"
          />
        ))}
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-2 px-6 bg-green-600 text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
