import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { useAppDispatch } from "@/app/hooks";
import { login } from "@/features/session/sessionSlice";
import AmazeonLogo from "@/assets/images/AmazeonLogoLight.png";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const attemptLogin = async (creds: {
    credential: string;
    password: string;
  }) => {
    setErrors([]);
    try {
      await dispatch(login(creds));
      navigate("/");
    } catch (err) {
      const res = err as Response;
      try {
        const data = await res.json();
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([String(data)]);
        else setErrors([res.statusText]);
      } catch {
        setErrors([res.statusText]);
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    attemptLogin({ credential, password });
  };

  const demoSubmit = () => {
    attemptLogin({ credential: "Demouser@gmail.com", password: "Password" });
  };

  const createSubmit = () => {
    navigate("/signup");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 py-8 font-sans">
      <img
        className="w-full max-w-48 cursor-pointer object-contain"
        src={AmazeonLogo}
        alt="Amazeon"
        onClick={() => navigate("/")}
      />

      <div className="w-full max-w-88 rounded-lg border border-amz-border bg-white p-6">
        <h1 className="text-2xl font-normal md:text-3xl">Sign in</h1>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {errors.length > 0 && (
            <ul className="space-y-1">
              {errors.map((error) => (
                <li key={error} className="text-sm text-red-600">
                  {error}
                </li>
              ))}
            </ul>
          )}

          <div>
            <label className="mb-1 block pl-0.5 text-xs font-bold">Email</label>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              className="w-full rounded border border-[#a6a6a6] p-2 outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#f0e5c8]"
            />
          </div>

          <div>
            <label className="mb-1 block pl-0.5 text-xs font-bold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded border border-[#a6a6a6] p-2 outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#f0e5c8]"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-amz-cart py-2 text-sm text-black hover:bg-amz-cart-hover"
          >
            Continue
          </button>

          <button
            type="button"
            onClick={demoSubmit}
            className="w-full cursor-pointer rounded-lg border border-amz-border bg-amz-cart py-2 text-sm text-black hover:bg-amz-cart-hover"
          >
            Demo Login
          </button>
        </form>

        <div className="mt-4 h-px bg-amz-border" />

        <div className="mt-4 text-sm font-bold">
          Learn More About Me!
          <div className="mt-1 flex items-center gap-3">
            <a
              className="inline-block text-[#0077B5]"
              href="https://www.linkedin.com/in/swejasonzhang"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
            <a
              className="inline-block text-black"
              href="https://github.com/swejasonzhang"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-88 items-center gap-2">
        <span className="flex-1 border-t border-amz-border" />
        <h5 className="text-xs font-normal text-amz-muted">New to Amazeon?</h5>
        <span className="flex-1 border-t border-amz-border" />
      </div>

      <button
        type="button"
        onClick={createSubmit}
        className="w-full max-w-88 cursor-pointer rounded-lg border border-amz-border bg-white py-2 text-sm text-amz-link shadow-sm hover:text-amz-link-hover hover:underline"
      >
        Create your Amazeon account
      </button>

      <div className="text-center text-xs font-bold text-amz-muted">
        2023-2024, By Jason Zhang
      </div>
    </div>
  );
}
