import Components from "@/components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createEmployee } from "@/services/employee/employee.api";
import { z } from "zod";
import { getZones } from "@/services/zone/zone.api";
import { getDesignations } from "@/services/designation/designation.api";
import { getDepartments } from "@/services/department/department.api";

const employeeSchema = z.object({
  employee_code: z.string().min(1, "Employee Code is required"),

  first_name: z.string().min(1, "First Name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, "Last Name is required"),

  date_of_birth: z.string().min(1, "Date of Birth is required"),

  gender: z.string().min(1, "Please select gender"),

  current_designation_id: z
    .string()
    .min(1, "Please select a designation"),

  current_department_id: z
    .string()
    .min(1, "Please select a department"),

  current_zone_id: z
    .string()
    .min(1, "Please select a zone"),

  employment_status: z
    .string()
    .min(1, "Please select employment status"),

  cadre: z.string().min(1, "Cadre is required"),

  phone: z
    .string()
    .min(10, "Phone must be at least 10 digits")
    .max(10, "Phone must be 10 digits"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  basic_pay: z.string().min(1, "Basic Pay is required"),

  date_of_joining: z
    .string()
    .min(1, "Date of Joining is required"),
});

export default function AddEmployee() {
  const [loading, setLoading] = useState(false);
  const [designations, setDesignations] = useState([]);
  const [zones, setZones] = useState([]);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    employee_code: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    current_designation_id: "",
    current_department_id: "",
    current_zone_id: "",
    cadre: "",
    phone: "",
    email: "",
    basic_pay: "",
    date_of_joining: "",
    employment_status: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] = useState<any>({});
  const [apiError, setApiError] = useState("");

  const handleSubmit = async () => {
    setApiError("");

    const result = employeeSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        basic_pay: Number(form.basic_pay),
      };

      await createEmployee(payload);

      navigate("/EmployeeMaster");
    } catch (err: any) {
      setApiError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const [d, z, dep] = await Promise.all([
        getDesignations(),
        getZones(),
        getDepartments(),
      ]);

      setDesignations(d.data);
      setZones(z.data);
      setDepartments(dep.data);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar />
      <Components.TopBar />

      <main className="ml-56 pt-14 px-6 pb-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          {/* LEFT SECTION */}
          <div className="flex items-center gap-4">
            {/* BACK BUTTON */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            >
              ← Back
            </button>

            {/* DIVIDER */}
            <div className="h-5 w-px bg-gray-200" />

            {/* TITLE + BREADCRUMB */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Add Employee
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Employee Master / Add Employee
              </p>
            </div>
          </div>
        </div>

        {/* FORM CONTAINER (FULL WIDTH) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {/* SECTION: BASIC INFO */}
          <h2 className="text-sm font-semibold text-gray-600 mb-4">
            Basic Information
          </h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Input
              label="Employee Code"
              name="employee_code"
              value={form.employee_code}
              onChange={handleChange}
              error={errors.employee_code}
              required
            />
            <Input
              label="First Name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              error={errors.first_name}
              required
            />
            <Input
              label="Middle Name"
              name="middle_name"
              value={form.middle_name}
              onChange={handleChange}
            />
            <Input
              label="Last Name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              error={errors.last_name}
              required
            />
            <Input
              label="Date of Birth"
              name="date_of_birth"
              type="date"
              value={form.date_of_birth}
              onChange={handleChange}
              error={errors.date_of_birth}
              required
            />
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">
                Gender <span className="text-red-500">*</span>
              </label>

              <div className="flex gap-4">
                {["Male", "Female", "Transgender"].map((g) => (
                  <label
                    key={g}
                    className={`px-3 py-2 border rounded-lg text-sm cursor-pointer transition
          ${
            form.gender === g
              ? "border-blue-500 bg-blue-50 text-blue-600"
              : "border-gray-200 hover:bg-gray-50"
          }
        `}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={form.gender === g}
                      onChange={(e) =>
                        setForm({ ...form, gender: e.target.value })
                      }
                      className="hidden"
                    />
                    {g}
                  </label>
                ))}
              </div>

              {errors.gender && (
                <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
              )}
            </div>
          </div>

          {/* SECTION: JOB INFO */}
          <h2 className="text-sm font-semibold text-gray-600 mb-4">
            Job Details
          </h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Select
              label="Designation"
              required
              name="current_designation_id"
              value={form.current_designation_id}
              onChange={(e: any) =>
                setForm({ ...form, current_designation_id: e.target.value })
              }
              error={errors.current_designation_id}
            >
              <option value="">Select Designation</option>
              {designations.map((d: any) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>
            <Select
              label="Department"
              required
              name="current_department_id"
              value={form.current_department_id}
              onChange={(e: any) =>
                setForm({ ...form, current_department_id: e.target.value })
              }
              error={errors.current_department_id}
            >
              <option value="">Select Department</option>
              {departments.map((d: any) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>
            <Select
              label="Zone"
              required
              name="current_zone_id"
              value={form.current_zone_id}
              onChange={(e: any) =>
                setForm({ ...form, current_zone_id: e.target.value })
              }
              error={errors.current_zone_id}
            >
              <option value="">Select Zones</option>
              {zones.map((d: any) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </Select>
            <Input
              label="Cadre"
              name="cadre"
              value={form.cadre}
              onChange={handleChange}
              error={errors.cadre}
              required
            />
            <Input
              label="Date of Joining"
              name="date_of_joining"
              type="date"
              value={form.date_of_joining}
              onChange={handleChange}
              error={errors.date_of_joining}
              required
            />
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-2 block">
                Employment Status <span className="text-red-500">*</span>
              </label>

              <div className="flex gap-3">
                {["Active", "Inactive"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm({ ...form, employment_status: s })}
                    className={`px-4 py-2 rounded-lg text-sm transition
          ${
            form.employment_status === s
              ? "bg-green-100 text-green-700 border border-green-400"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }
        `}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {errors.employment_status && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.employment_status}
                </p>
              )}
            </div>
          </div>

          {/* SECTION: CONTACT */}
          <h2 className="text-sm font-semibold text-gray-600 mb-4">
            Contact Information
          </h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />
            <Input
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            <Input
              label="Basic Pay"
              name="basic_pay"
              value={form.basic_pay}
              onChange={handleChange}
              error={errors.basic_pay}
              required
            />
          </div>
          {apiError && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {apiError}
            </div>
          )}

          {/* ACTION BAR */}
          <div className="flex justify-end gap-3 border-t pt-4">
            {/* CANCEL */}
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 border border-gray-300 rounded-lg text-sm text-gray-700
               transition-all duration-200 ease-in-out
               hover:bg-gray-100 hover:border-gray-400
               active:scale-95"
            >
              Cancel
            </button>

            {/* SAVE */}
            <button
              disabled={loading}
              onClick={handleSubmit}
              className={`px-6 py-2 rounded-lg text-sm text-white
    bg-[#1A3555] transition-all duration-200
    hover:bg-[#152c47] hover:shadow-md
    active:scale-95
    disabled:opacity-60 disabled:cursor-not-allowed
  `}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Saving...
                </span>
              ) : (
                "Save Employee"
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  error,
  required,
  ...rest
}: any) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 mb-1 block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
        className={`w-full px-3 py-2 border rounded-lg text-sm outline-none transition
          ${
            error
              ? "border-red-400 focus:ring-2 focus:ring-red-200"
              : "border-gray-200 focus:ring-2 focus:ring-blue-200"
          }
        `}
      />

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function Select({ label, required, error, children, ...props }: any) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-600 mb-1 block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <select
          {...props}
          className={`w-full px-3 py-2 pr-8 border rounded-lg text-sm bg-white
            appearance-none outline-none transition
            ${
              error
                ? "border-red-400 focus:ring-2 focus:ring-red-200"
                : "border-gray-200 focus:ring-2 focus:ring-blue-200"
            }
          `}
        >
          {children}
        </select>

        {/* dropdown arrow */}
        <span className="absolute right-2 top-2.5 text-gray-400 pointer-events-none">
          ▼
        </span>
      </div>

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
