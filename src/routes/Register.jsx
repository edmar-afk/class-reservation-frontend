import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../assets/api";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    course: "",
    section: "",
    year_lvl: "",
    username: "",
    password: "",
    repeat_password: "",
    profile_picture: null,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm({ ...form, [name]: files[0] });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const isPasswordMatch =
    form.password &&
    form.repeat_password &&
    form.password === form.repeat_password;

  const isPasswordValid = form.password.length >= 5;

  const isFormValid =
    form.full_name &&
    form.course &&
    form.section &&
    form.year_lvl &&
    form.username &&
    form.password &&
    form.repeat_password &&
    isPasswordMatch &&
    isPasswordValid;

  const handleSubmit = async () => {
    if (!isPasswordMatch || !isPasswordValid) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("username", form.username);
    formData.append("full_name", form.full_name);
    formData.append("password", form.password);
    formData.append("course", form.course);
    formData.append("section", form.section);
    formData.append("year_lvl", form.year_lvl);

    if (form.profile_picture) {
      formData.append("profile_picture", form.profile_picture);
    }

    try {
      await api.post("/api/register/student/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await Swal.fire({
        icon: "success",
        title: "Registered Successfully",
        text: "Your account has been created.",
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          err.response?.data?.detail ||
          "Something went wrong. Please try again.",
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
              Already have an account?
              <Link
                to={"/"}
                className="text-blue-600 font-medium hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </div>

          <form
            className="max-w-md lg:ml-auto w-full"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <h2 className="text-slate-900 text-3xl font-semibold mb-1">
              Register to get Started
            </h2>

            <p className="mb-8">
              Kindly provide accurate information to ensure a seamless and
              efficient registration experience.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  name="full_name"
                  type="text"
                  onChange={handleChange}
                  className="bg-slate-100 w-full px-4 py-3 rounded-md border border-gray-200"
                />
              </div>

              <div className="flex gap-4">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Course
                  </label>
                  <select
                    name="course"
                    onChange={handleChange}
                    className="bg-slate-100 w-full px-4 py-3 rounded-md border border-gray-200"
                  >
                    <option value="">Course</option>
                    <option value="BTVTED">BTVTED</option>
                    <option value="BSIS">BSIS</option>
                    <option value="ACT">ACT</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Year Level
                  </label>
                  <select
                    name="year_lvl"
                    onChange={handleChange}
                    className="bg-slate-100 w-full px-4 py-3 rounded-md border border-gray-200"
                  >
                    <option value="">Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Section
                  </label>{" "}
                  <select
                    name="section"
                    onChange={handleChange}
                    className="bg-slate-100 w-full px-4 py-3 rounded-md border border-gray-200"
                  >
                    <option value="">Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              </div>

              <label className="block text-sm font-medium text-gray-600 mb-1">
                Username
              </label>

              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                className="bg-slate-100 w-full px-4 py-3 rounded-md border border-gray-200"
                placeholder="Username"
              />

              <label className="block text-sm font-medium text-gray-600 mb-1">
                Profile Picture (Optional)
              </label>
              <input
                name="profile_picture"
                type="file"
                onChange={handleChange}
                className="w-full"
              />

              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password
                </label>
                <div className="flex gap-4">
                  <div className="relative w-full">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      onChange={handleChange}
                      placeholder="Password"
                      className={`bg-slate-100 w-full px-4 py-3 pr-12 rounded-md border ${
                        !isPasswordValid && form.password
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </button>
                  </div>

                  <div className="relative w-full">
                    <input
                      name="repeat_password"
                      type={showRepeatPassword ? "text" : "password"}
                      onChange={handleChange}
                      placeholder="Repeat Password"
                      className={`bg-slate-100 w-full px-4 py-3 pr-12 rounded-md border ${
                        form.repeat_password && !isPasswordMatch
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showRepeatPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </button>
                  </div>
                </div>

                {!isPasswordValid && form.password && (
                  <p className="text-red-500 text-sm">
                    Must be minimum of 5 characters
                  </p>
                )}

                {form.repeat_password && !isPasswordMatch && (
                  <p className="text-red-500 text-sm">Passwords do not match</p>
                )}
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-2.5 px-4 rounded-md cursor-pointer text-white flex items-center justify-center gap-2 ${
                  isFormValid && !loading
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-red-500 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} />
                    Registering, Please wait...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
