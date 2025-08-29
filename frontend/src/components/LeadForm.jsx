import React, { useState } from "react";

export default function LeadForm({ onCreate }) {
  const [form, setForm] = useState({
    contactName: "",
    centerName: "",
    email: "",
    size: "small",
    budget: 10000,
    interest: "medium",
    notes: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!form.contactName.trim()) newErrors.contactName = "Contact name is required";
    if (!form.centerName.trim()) newErrors.centerName = "Center name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.size) newErrors.size = "Size is required";
    if (!form.budget || form.budget <= 0) newErrors.budget = "Budget must be greater than 0";
    if (!form.interest) newErrors.interest = "Interest level is required";
    if (!form.notes.trim()) newErrors.notes = "Notes are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
  if (validate()) {
    onCreate(form);
    setErrors({});
    // Reset form fields after successful create
    setForm({
      contactName: "",
      centerName: "",
      email: "",
      size: "small",
      budget: 10000,
      interest: "medium",
      notes: ""
    });
  }
};


  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold">Add Lead</h3>
      <div className="space-y-2 mt-2">
        <input
          placeholder="Contact name"
          value={form.contactName}
          onChange={(e) => setForm({ ...form, contactName: e.target.value })}
          className="w-full p-2 border rounded"
        />
        {errors.contactName && <p className="text-red-500 text-sm">{errors.contactName}</p>}

        <input
          placeholder="Center name"
          value={form.centerName}
          onChange={(e) => setForm({ ...form, centerName: e.target.value })}
          className="w-full p-2 border rounded"
        />
        {errors.centerName && <p className="text-red-500 text-sm">{errors.centerName}</p>}

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <div className="flex gap-2">
          <select
            value={form.size}
            onChange={(e) => setForm({ ...form, size: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          {errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}

          <input
            type="number"
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
            className="p-2 border rounded"
          />
          {errors.budget && <p className="text-red-500 text-sm">{errors.budget}</p>}

          <select
            value={form.interest}
            onChange={(e) => setForm({ ...form, interest: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.interest && <p className="text-red-500 text-sm">{errors.interest}</p>}
        </div>

        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full p-2 border rounded"
        />
        {errors.notes && <p className="text-red-500 text-sm">{errors.notes}</p>}

        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Create
        </button>
      </div>
    </div>
  );
}
