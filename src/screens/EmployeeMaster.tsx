"use client";
import React, { useEffect, useState } from "react";
import Components from "@/components";
import { Search, ChevronRight, ChevronDown, Plus, Filter } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { getEmployees } from "@/services/employee/employee.api";

const bgColors = [
  "#1A3555",
  "#2D6A4F",
  "#7B2D8B",
  "#B5451B",
  "#1565C0",
  "#6D4C41",
  "#37474F",
];

const zonesList = [
  "All Zones",
  "Central Zone",
  "West Zone",
  "North Zone",
  "South Zone",
  "East Zone",
  "Kukatpally Zone",
];

export default function EmployeeMaster() {
  const location = useLocation();
  const navigate = useNavigate();

  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [zone, setZone] = useState("All Zones");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getEmployees();
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = employees.filter((e) => {
    return (
      (e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.empId.toLowerCase().includes(search.toLowerCase())) &&
      (zone === "All Zones" || e.zone.includes(zone))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Components.Sidebar active={location.pathname} />
      <Components.TopBar />

      <main className="ml-60 pt-14 p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Employee Master
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {filtered.length} employees shown
            </p>
          </div>

          <button
            onClick={() => navigate("/AddEmployee")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition"
            style={{ backgroundColor: "#1A3555" }}
          >
            <Plus size={16} /> Add New Employee
          </button>
        </div>

        {/* TABLE CONTAINER */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* SEARCH + FILTER */}
          <div className="p-4 border-b border-gray-100 flex gap-3">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by name, ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* ZONE FILTER */}
            <div className="relative">
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="appearance-none px-4 py-2.5 pr-8 bg-gray-50 border border-gray-200 rounded-lg text-sm cursor-pointer"
              >
                {zonesList.map((z) => (
                  <option key={z}>{z}</option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>

            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
              <Filter size={14} /> Filter
            </button>
          </div>

          {/* LOADER */}
          {loading ? (
            <div className="p-10 text-center text-gray-500">
              Loading employees...
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  {[
                    "Emp ID",
                    "Name",
                    "Designation",
                    "Cadre",
                    "Zone",
                    "D.O.J",
                    "Basic Pay",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left text-xs font-semibold text-gray-400 px-4 py-3 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.map((emp, i) => (
                  <tr
                    key={emp.id}
                    className="border-b border-gray-50 hover:bg-blue-50/30 transition"
                  >
                    {/* EMP ID */}
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-[#1A5276]">
                        {emp.empId}
                      </span>
                    </td>

                    {/* NAME */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{
                            backgroundColor:
                              bgColors[i % bgColors.length],
                          }}
                        >
                          {emp.initials}
                        </div>
                        <span className="text-sm font-medium text-gray-800">
                          {emp.name}
                        </span>
                      </div>
                    </td>

                    {/* DESIGNATION */}
                    <td className="px-4 py-3 text-sm">
                      {emp.designation}
                    </td>

                    {/* CADRE */}
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                        {emp.cadre}
                      </span>
                    </td>

                    {/* ZONE */}
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {emp.zone}
                    </td>

                    {/* DOJ */}
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {emp.doj}
                    </td>

                    {/* PAY */}
                    <td className="px-4 py-3 font-semibold">
                      ₹{emp.basicPay.toLocaleString()}
                    </td>

                    {/* STATUS */}
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          emp.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {emp.status}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="px-4 py-3">
                     <button
                      onClick={() => navigate(`/employee/${emp.id}/profile`)}
                      className="p-1.5 rounded-lg hover:bg-gray-100"
                    >
                      <ChevronRight size={16} />
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* EMPTY STATE */}
          {!loading && filtered.length === 0 && (
            <div className="p-10 text-center text-gray-400">
              No employees found
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
