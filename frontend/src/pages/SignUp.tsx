import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { useAppDispatch } from "@/app/hooks";
import { signup } from "@/features/session/sessionSlice";
import AmazeonLogo from "@/assets/images/AmazeonLogoLight.png";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors([
        "Re-enter password field must be the same as the password field",
      ]);
      return;
    }

    setErrors([]);

    try {
      await dispatch(signup({ username, email, password }));
      navigate("/");
    } catch (err) {
      const data = await (err as Response).json();
      if (data?.errors) setErrors(data.errors);
      else setErrors(["Sign up failed"]);
    }
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
        <h1 className="text-2xl font-normal md:text-3xl">Create account</h1>

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
            <label className="mb-1 block pl-0.5 text-xs font-bold">
              Your name
            </label>
            <input
              type="text"
              placeholder="First and last name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded border border-[#a6a6a6] p-2 outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#f0e5c8]"
            />
          </div>

          <div>
            <label className="mb-1 block pl-0.5 text-xs font-bold">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded border border-[#a6a6a6] p-2 outline-none focus:border-[#e77600] focus:shadow-[0_0_0_3px_#f0e5c8]"
            />
            <div className="mt-1 pl-0.5 text-xs text-amz-muted">
              Passwords must be at least 6 characters.
            </div>
          </div>

          <div>
            <label className="mb-1 block pl-0.5 text-xs font-bold">
              Re-enter password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

          <div className="text-xs leading-normal text-amz-muted">
            By creating an account, you agree to being amazing and I hope you
            have a good day!
          </div>

          <div className="h-px bg-amz-border" />

          <div className="text-sm font-bold">
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

          <div className="h-px bg-amz-border" />

          <div className="text-sm">
            <p>
              Already have an account?{" "}
              <span
                className="cursor-pointer text-amz-link hover:text-amz-link-hover hover:underline"
                onClick={() => navigate("/signin")}
              >
                Sign in
              </span>
            </p>
          </div>
        </form>
      </div>

      <div className="text-center text-xs font-bold text-amz-muted">
        2023-2024, By Jason Zhang
      </div>
    </div>
  );
}
