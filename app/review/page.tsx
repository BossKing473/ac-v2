"use client";

import React, { useState, useEffect } from "react";
import { Trash2, UserCheck, UserX, Grid, List } from "lucide-react";
import { createClient } from "../utils/client";
import Navbar from "@/components/navbar";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
  status: string; // add status
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

  // Approve or Reject user
  const updateUserStatus = async (userId: string, status: "active" | "rejected") => {
    const { error } = await supabase
      .from("profile")
      .update({ status })
      .eq("user_id", userId);

    if (error) {
      alert(`Failed to update user: ${error.message}`);
    } else {
      setProfiles((prev) =>
        prev.map((p) => (p.user_id === userId ? { ...p, status } : p))
      );
    }
  };

  // Delete user
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
    <><Navbar />
    <div className="min-h-screen bg-gray-50 font-sans p-8">
      {/* Header + View Toggle */}
      <div className="flex justify-between items-center w-full mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
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

      {/* Loading / Empty */}
      {loading ? (
  view === "card" ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  ) : (
    <div className="overflow-x-auto bg-white rounded-3xl shadow-lg border border-gray-100">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Disability</th>
            <th>Sex</th>
            <th>Birthdate</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  )
)
 : profiles.length === 0 ? (
        <p className="text-gray-500 text-center">No users found.</p>
      ) : view === "card" ? (
        // CARD VIEW
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
                <p className="text-xs font-semibold">
                  Status:{" "}
                  <span
                    className={
                      user.status === "pending"
                        ? "text-yellow-600"
                        : user.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {user.status}
                  </span>
                </p>
              </div>

              <div className="flex gap-2 mt-2">
                {user.status === "pending" && (
                  <>
                    <button
                      onClick={() => updateUserStatus(user.user_id, "active")}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all text-sm"
                    >
                      <UserCheck size={16} />
                      Approve
                    </button>
                    <button
                      onClick={() => updateUserStatus(user.user_id, "rejected")}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all text-sm"
                    >
                      <UserX size={16} />
                      Reject
                    </button>
                  </>
                )}
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
        // TABLE VIEW
        <div className="overflow-x-auto bg-white rounded-3xl shadow-lg border border-gray-100">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHead className="bg-gray-50">
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Disability</TableHeader>
                <TableHeader>Sex</TableHeader>
                <TableHeader>Birthdate</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody className="bg-white divide-y divide-gray-200">
              {profiles.map((user) => (
                <TableRow key={user.user_id}>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>{user.disability_type || "N/A"}</td>
                  <td>{user.sex || "N/A"}</td>
                  <td>{user.birthdate ? new Date(user.birthdate).toLocaleDateString() : "N/A"}</td>
                  <td
                    className={
                      user.status === "pending"
                        ? "text-yellow-600"
                        : user.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {user.status}
                  </td>
                  <td className="flex gap-2">
                    {user.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateUserStatus(user.user_id, "active")}
                          className="px-3 py-1 bg-green-600 text-white rounded-xl text-sm hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateUserStatus(user.user_id, "rejected")}
                          className="px-3 py-1 bg-yellow-500 text-white rounded-xl text-sm hover:bg-yellow-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(user.user_id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-xl text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
    </div>
    </>
  );
};

export default UserReviewPage;
const CardSkeleton = () => (
  <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 animate-pulse space-y-4">
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-full bg-gray-200" />
      <div className="space-y-2">
        <div className="h-4 w-32 bg-gray-200 rounded" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>
    </div>

    <div className="space-y-2">
      <div className="h-3 w-full bg-gray-200 rounded" />
      <div className="h-3 w-5/6 bg-gray-200 rounded" />
      <div className="h-3 w-4/6 bg-gray-200 rounded" />
    </div>

    <div className="flex gap-2">
      <div className="h-9 w-full bg-gray-200 rounded-xl" />
      <div className="h-9 w-full bg-gray-200 rounded-xl" />
    </div>
  </div>
)

const TableSkeleton = () => (
  <tr className="animate-pulse">
    {Array.from({ length: 7 }).map((_, i) => (
      <td key={i} className="px-6 py-4">
        <div className="h-3 w-full bg-gray-200 rounded" />
      </td>
    ))}
  </tr>
)
