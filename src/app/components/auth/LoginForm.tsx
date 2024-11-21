'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import AlertError from "../organisme/AlertError";
import LoginPage from "./loginGoogle";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: null, password: null });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true)
      const result = await signIn("credentials",
        {
          email: form.email,
          password: form.password,
          redirect: false
        });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <AlertError error={error} />}
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
      <button disabled={isLoading} type="submit" className="btn btn-primary w-full">{isLoading ? <><span className="loading loading-spinner"></span> Loading...</> : "Login"}</button>
    </form>
  );
}