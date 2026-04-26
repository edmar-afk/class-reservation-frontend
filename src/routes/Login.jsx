import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../assets/api";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/api/login/", {
        username: form.username,
        password: form.password,
      });

      const data = res.data;

      localStorage.setItem("user", JSON.stringify(data));

      if (data.user.is_staff === true || data.user.is_superuser === true) {
        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          confirmButtonColor: "#2563eb",
        });

        navigate("/dashboard");
      } else {
        await Swal.fire({
          icon: "warning",
          title: "Account Pending",
          text: "You need to wait for admin's approval to access the system",
          confirmButtonColor: "#f59e0b",
        });

        return;
      }
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Incorrect username or password",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="lg:min-h-screen flex flex-col items-center justify-center p-6">
        <div className="grid lg:grid-cols-2 items-center gap-10 max-w-6xl max-lg:max-w-lg w-full">
          <div>
            <p className="text-lg font-semibold text-gray-400">________</p>
            <h1 className="lg:text-5xl text-4xl font-bold text-slate-900 !leading-tight">
              ZDSPGC Room Scheduling
            </h1>
            <p className="text-[15px] mt-6 text-slate-600 leading-relaxed">
              An Intelligent Web-Based Solution for Streamlined and Efficient
              Room Scheduling and Management at ZDSPGC Vincenzo Sagun Campus
            </p>
            <p className="text-[15px] mt-6 lg:mt-12 text-slate-600">
              Don't have an account{" "}
              <Link
                to={"/register"}
                className="text-blue-600 font-medium hover:underline ml-1"
              >
                Register here
              </Link>
            </p>
          </div>

          <form onSubmit={handleLogin} className="max-w-md lg:ml-auto w-full">
            <h2 className="text-slate-900 text-3xl font-semibold mb-8">
              Log in to Continue
            </h2>

            <div className="space-y-6">
              <div>
                <label className="text-sm text-slate-900 font-medium mb-2 block">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="bg-slate-100 w-full text-sm text-slate-900 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent"
                  placeholder="Enter Username"
                />
              </div>

              <div>
                <label className="text-sm text-slate-900 font-medium mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="bg-slate-100 w-full text-sm text-slate-900 px-4 py-3 rounded-md outline-0 border border-gray-200 focus:border-blue-600 focus:bg-transparent"
                  placeholder="Enter Password"
                />
              </div>
            </div>

            <div className="!mt-12">
              <button
                type="submit"
                disabled={loading}
                className={`w-full shadow-xl py-2.5 px-4 text-[15px] font-medium rounded-md text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </div>

            <div className="my-6 flex items-center gap-4">
              <hr className="w-full border-slate-300" />
              <p className="text-sm text-slate-900 text-center">or</p>
              <hr className="w-full border-slate-300" />
            </div>

            <div className="w-full">
              <Link
                to={"/register"}
                className="w-full bg-gray-600 text-white py-2.5 px-4 rounded-md block text-center hover:bg-gray-200 hover:text-gray-800 font-medium shadow-xl duration-300"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
