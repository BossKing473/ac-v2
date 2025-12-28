"use client";

import React, { useState, useEffect } from "react";

import { Trash2, UserCheck, UserX, Grid, List } from "lucide-react";
import { createClient } from "../utils/client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface Profile {
  user_id: string;
  full_name: string;
  email: string;
  disability_type: string;
  sex: string;
  birthdate: string;
  address: string;
  pwd_id_image_url: string | null;
  created_at: string;
}

const UserReviewPage: React.FC = () => {
  const supabase = createClient();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"table" | "card">("card");

  // Fetch all users
  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setProfiles(data as Profile[]);
      }
      setLoading(false);
    };

    fetchProfiles();
  }, [supabase]);

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    const { error } = await supabase.from("profile").delete().eq("user_id", userId);
    if (error) {
      alert("Error deleting user.");
    } else {
      setProfiles(profiles.filter((p) => p.user_id !== userId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50   font-sans">
      
      <div className="flex justify-between items-center w-full p-8 mb-6 mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 pt-20">
          User Review Dashboard
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView("card")}
            className={`p-2 rounded-lg ${
              view === "card" ? "bg-purple-600 text-white" : "bg-white border"
            }`}
            title="Card View"
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setView("table")}
            className={`p-2 rounded-lg ${
              view === "table" ? "bg-purple-600 text-white" : "bg-white border"
            }`}
            title="Table View"
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Loading users...</p>
      ) : profiles.length === 0 ? (
        <p className="text-gray-500 text-center">No users found.</p>
      ) : view === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((user) => (
            <div
              key={user.user_id}
              className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                {user.pwd_id_image_url ? (
                  <img
                    src={user.pwd_id_image_url}
                    alt={user.full_name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-purple-600"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xl">
                    {user.full_name?.[0] || "U"}
                  </div>
                )}
                <div>
                  <h2 className="font-bold text-gray-900">{user.full_name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="text-gray-700 text-sm space-y-1">
                <p>
                  <span className="font-semibold">Disability:</span> {user.disability_type || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Sex:</span> {user.sex || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Birthdate:</span>{" "}
                  {user.birthdate ? new Date(user.birthdate).toLocaleDateString() : "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Address:</span> {user.address || "N/A"}
                </p>
                <p className="text-xs text-gray-400">
                  Created at: {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => alert(`Approved user: ${user.full_name}`)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all text-sm"
                >
                  <UserCheck size={16} />
                  Approve
                </button>
                <button
                  onClick={() => alert(`Rejected user: ${user.full_name}`)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all text-sm"
                >
                  <UserX size={16} />
                  Reject
                </button>
                <button
                  onClick={() => handleDelete(user.user_id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all text-sm"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Table view
        <div className="overflow-x-auto bg-white rounded-3xl shadow-lg border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sex
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Birthdate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {profiles.map((user) => (
                <tr key={user.user_id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.full_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.disability_type || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.sex || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.birthdate ? new Date(user.birthdate).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button
                      onClick={() => alert(`Approved user: ${user.full_name}`)}
                      className="px-3 py-1 bg-green-600 text-white rounded-xl text-sm hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => alert(`Rejected user: ${user.full_name}`)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-xl text-sm hover:bg-yellow-600"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDelete(user.user_id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-xl text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
   
    </div>
  );
};

export default UserReviewPage;
