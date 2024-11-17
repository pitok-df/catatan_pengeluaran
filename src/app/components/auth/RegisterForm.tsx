'use client'

import { ChangeEvent, useState } from "react";

export default function RegisterForm() {
  const [form, setForm] = useState({ fullname: null, email: null, password: null });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3 gap-2 flex flex-col">
        <label className="ms-2" htmlFor="email">Full Name</label>
        <input type="text"
          value={form.fullname ?? ''}
          name="fullname"
          required
          onChange={(e) => handleChange(e)}
          className="input input-bordered"
          placeholder="Enter fullname" />
      </div>
      <div className="mb-3 gap-2 flex flex-col">
        <label className="ms-2" htmlFor="email">Email</label>
        <input type="email"
          value={form.email ?? ''}
          name="email"
          required
          onChange={(e) => handleChange(e)}
          className="input input-bordered"
          placeholder="Enter email" />
      </div>
      <div className="mb-6 gap-2 flex flex-col">
        <label className="ms-2" htmlFor="password">Password</label>
        <input
          type="password"
          className="input input-bordered"
          placeholder="Enter password"
          name="password"
          value={form.password ?? ''}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">Login</button>
    </form>
  );
}