import {Eye, EyeOff, Fingerprint} from "lucide-react";
import {useTogglePassword} from "@/hooks/useTogglePassword.ts";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/hooks/useAuth.ts";
import {type LoginForm, loginSchema} from "@/schemas/auth/login.ts";
import {loginService} from "@/services/auth.ts";
import {toast} from "react-toastify";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { type, show, toggle } = useTogglePassword();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            const res = await loginService(data);
            if (!res.success || !res.data) {
                toast.error(res.message);
                return;
            }

            login(res.data.user, res.data.token);

            navigate("/dashboard");

            toast.success(res.message);
            reset();
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Terjadi kesalahan");
        }
    };

  return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
          <div className="flex flex-row w-full max-w-4xl bg-white rounded-2xl border overflow-hidden">
              <div className="w-full md:w-1/2 p-8 flex flex-col gap-4">
                  <div>
                      <h2 className="text-3xl font-extrabold">
                          Easy<span className="text-red-400"> POS</span>
                      </h2>
                      <p className="text-base text-muted-foreground">
                          Fast, reliable, and easy to use.
                      </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                          <div className="relative mt-1 flex flex-col gap-1">
                              <input
                                  type="email"
                                  {...register("email")}
                                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-red-400"
                                  placeholder="john@rhcp.com"
                              />
                              {errors.email && (
                                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                              )}
                          </div>
                      </div>

                      <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                          <div className="relative mt-1 flex flex-col gap-1">
                              <div className="relative flex items-center justify-between">
                                  <input
                                      type={type}
                                      {...register("password")}
                                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-red-400"
                                      placeholder="••••••••"
                                  />

                                  <span
                                      onClick={toggle}
                                      className="absolute inset-y-0 right-3 inline-flex items-center cursor-pointer text-gray-500"
                                  >
                                    {show ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                  </span>
                              </div>
                              {errors.password && (
                                  <p className="text-red-500 text-sm">
                                      {errors.password.message}
                                  </p>
                              )}
                          </div>
                      </div>

                      <div className="flex items-center justify-between">
                          <div className="flex items-center">
                              <input
                                  type="checkbox"
                                  id="remember-me"
                                  name="remember"
                                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                              />
                              <label
                                  htmlFor="remember-me"
                                  className="ml-1 block text-xs text-gray-900"
                              >
                                  Remember me
                              </label>
                          </div>
                          <a
                              href="#"
                              className="text-xs font-medium text-gray-800 hover:text-black"
                          >
                              Forgot password?
                          </a>
                      </div>

                      <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full px-4 py-2.5 disabled:!cursor-not-allowed disabled:opacity-50 bg-red-400 text-white text-sm font-medium rounded-md"
                      >
                          Sign In
                      </button>
                  </form>

                  <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2">
                          <div className="p-2 border border-red-400 rounded-md text-red-400">
                              <Fingerprint size={25}/>
                          </div>
                          <p className="text-xs font-medium text-gray-700">Sign in with Touch ID</p>
                      </div>
                  </div>
              </div>

              <div className="hidden md:block md:w-1/2 bg-gray-100">
                  <img
                      src="/images/login-ilustration.png"
                      alt="Login Illustration"
                      className="object-contain w-full h-full"
                  />
              </div>
          </div>
      </div>
  );
}
