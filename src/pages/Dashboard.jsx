import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("userData")) || [];
    setUserData(savedUsers);
  }, []);

  const totalUsers = userData.length;

  // Extracting email domains for trends visualization
  const domainCounts = userData.reduce((acc, user) => {
    const domain = user.email?.split("@")[1] || "Unknown";
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(domainCounts).map((domain) => ({
    name: domain,
    count: domainCounts[domain],
  }));

  return (
    <div className="flex flex-col items-center p-10 gap-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold"><a href="/" >Home</a> | <a href="/dashboard" className="text-orange-400">Dashboard</a></h1>
      <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
        {/* User Counter */}
        <div className="p-6 bg-gray-800 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-3xl font-bold">{totalUsers}</p>
        </div>

        {/* User Profile Visuals */}
        <div className="p-6 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold mb-2">User Profiles</h3>
          {userData.length > 0 ? (
            <ul className="space-y-2">
              {userData.map((user, index) => (
                <li key={index} className="border-b pb-2">
                  <strong>Name</strong>: {user.name}, <strong>Email</strong>:{" "}
                  {user.email}
                </li>
              ))}
            </ul>
          ) : (
            <p>No user data available.</p>
          )}
        </div>

        {/* User Profile Trends (Chart) */}
        <div className="col-span-2 p-6 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold mb-2">User Profile Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{ backgroundColor: "#333", color: "#fff" }}
              />
              <Legend />
              <Bar dataKey="count" fill="#4A90E2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
