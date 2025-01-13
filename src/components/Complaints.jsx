
  // useEffect(() => {
  //   // Fetch all complaints
  //   const fetchComplaints = async () => {
  //     try {
  //       // const response = await axios.get("/api/complaints");
  //       // setComplaints(response.data);
  //     } catch (error) {
  //       console.error("Error fetching complaints:", error);
  //     }
  //   };

  //   // Fetch all vendors
  //   const fetchVendors = async () => {
  //     try {
  //       // const response = await axios.get("/api/vendors");
  //       // setVendors(response.data);
  //     } catch (error) {
  //       console.error("Error fetching vendors:", error);
  //     }
  //   };

  //   const fetchData = async () => {
  //     setLoading(true);
  //     await fetchComplaints();
  //     await fetchVendors();
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, []);
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  
  const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // Dummy Data for Simplicity (replace this with your API call for testing)
    useEffect(() => {
      const fetchDummyData = async () => {
        const dummyComplaints = [
          {
            _id: "1",
            title: "Leaking Pipe",
            description: "Pipe leaking in the kitchen.",
            status: "pending",
            created_by: { name: "John Doe", email: "john@example.com" },
            created_at: "2025-01-10T10:15:00Z",
            assigned_to: null,
          },
          {
            _id: "2",
            title: "Broken Window",
            description: "Window shattered in the living room.",
            status: "progress",
            created_by: { name: "Jane Smith", email: "jane@example.com" },
            created_at: "2025-01-09T14:30:00Z",
            assigned_to: "123", // Simulating an assigned vendor ID
          },
        ];
  
        const dummyVendors = [
          { _id: "123", name: "Vendor A" },
          { _id: "124", name: "Vendor B" },
        ];
  
        // Simulate fetching data
        setTimeout(() => {
          setComplaints(dummyComplaints);
          setVendors(dummyVendors);
          setLoading(false);
        }, 1000); // Simulate a delay
      };
  
      fetchDummyData();
    }, []);
  
    const assignVendor = async (complaintId, vendorId) => {
      try {
        // Simulate API call for assigning vendor
        setComplaints((prev) =>
          prev.map((complaint) =>
            complaint._id === complaintId ? { ...complaint, assigned_to: vendorId } : complaint
          )
        );
        alert("Vendor assigned successfully!");
      } catch (error) {
        console.error("Error assigning vendor:", error);
        alert("Failed to assign vendor.");
      }
    };
  
    if (loading) {
      return <div className="text-center py-4">Loading...</div>;
    }
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Complaints Management</h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Created By</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-4 py-2">Assigned Vendor</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{complaint._id}</td>
                <td className="border border-gray-300 px-4 py-2">{complaint.title}</td>
                <td className="border border-gray-300 px-4 py-2">{complaint.description}</td>
                <td className="border border-gray-300 px-4 py-2">{complaint.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.created_by
                    ? `${complaint.created_by.name} (${complaint.created_by.email})`
                    : "Unknown"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(complaint.created_at).toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {complaint.assigned_to
                    ? vendors.find((v) => v._id === complaint.assigned_to)?.name || "Vendor Not Found"
                    : "Not Assigned"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {!complaint.assigned_to ? (
                    <select
                      className="border rounded px-2 py-1"
                      onChange={(e) => assignVendor(complaint._id, e.target.value)}
                    >
                      <option value="">Select Vendor</option>
                      {vendors.map((vendor) => (
                        <option key={vendor._id} value={vendor._id}>
                          {vendor.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    "Vendor Assigned"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Complaints;
  