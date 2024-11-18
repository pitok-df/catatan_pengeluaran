'use client'

import axios from "axios";
import { ChangeEvent, useState } from "react";
import AlertError from "../organisme/AlertError";
import AlertSuccess from "../organisme/AlertSuccess";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ fullname: null, email: null, password: null });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await axios.post("/api/auth/register", {
        email: form.email, fullname: form.fullname, password: form.password
      }, { headers: { "Content-Type": "application/json" } });
      if (response.status == 200) {
        setError("");
        setSuccess(response.data.message);
        setInterval(() => {
          router.push("/auth/login")
        }, 2000);
      }
    } catch (error: any) {
      if (error.status === 400) {
        setSuccess("")
        setError(error.response.data.error.details);
      } else {
        setSuccess("")
        setError("Something went wrong.");
      }
    } finally { setIsLoading(false) }
  }
  return (
    <form onSubmit={handleSubmit}>
      {success && <AlertSuccess message={success} />}
      {error && <AlertError error={error} />}
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
      <button disabled={isLoading} type="submit" className="btn btn-primary w-full">{isLoading ?
        <><span className="loading loading-spinner"></span> Loading...</> : "Register"}</button>
    </form>
  );
}