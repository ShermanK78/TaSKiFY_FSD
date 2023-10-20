import React, { useState } from "react";
import { Button, message, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RemoveMemberFromProject } from "../../../apicalls/projects";
import { SetLoading } from "../../../redux/loadersSlice";
import MemberForm from "./MemberForm";

function Members({ project, reloadData }) {
  // Access user data from Redux store and set initial role state
  const { user } = useSelector((state) => state.users);
  const [role, setRole] = useState("");
  // State for controlling the visibility of the member form
  const [showMemberForm, setShowMemberForm] = useState(false);
  const dispatch = useDispatch();
  // Check if the current user is the owner of the project
  const isOwner = project.owner._id === user._id;

  // Function to delete a member from the project
  const deleteMember = async (memberId) => {
    try {
      // Set loading state
      dispatch(SetLoading(true));
      // Make an API call to remove a member from the project
      const response = await RemoveMemberFromProject({
        projectId: project._id,
        memberId,
      });

      if (response.success) {
        // Refresh data and display a success message
        reloadData();
        message.success(response.message);
      } else {
        // If there's an error, display an error message
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(SetLoading(false));
    }
  };

  // Configuration for the table columns
  const columns = [
    {
      title: "First Name",
      dataIndex: ["user", "firstName"],
    },
    {
      title: "Last Name",
      dataIndex: ["user", "lastName"],
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        // Display a button to remove a member
        <Button type="link" danger onClick={() => deleteMember(record._id)}>
          Remove
        </Button>
      ),
    },
  ];

  // If the user is not the owner, remove the action column
  if (!isOwner) {
    columns.pop();
  }

  // Function to filter members by role
  const filterMembersByRole = (member) => {
    if (role === "") {
      return true;
    } else {
      return member.role === role;
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        {/* Show "Add Member" button if the user is the owner */}
        {isOwner && (
          <Button type="default" onClick={() => setShowMemberForm(true)}>
            Add Member
          </Button>
        )}
      </div>

      <div className="w-48">
        <span>Select Role</span>
        <select onChange={(e) => setRole(e.target.value)} value={role}>
          <option value="">All</option>
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
        </select>
      </div>

      <Table
        columns={columns}
        dataSource={project.members.filter(filterMembersByRole)}
        className="mt-4"
      />

      {showMemberForm && (
        <MemberForm
          showMemberForm={showMemberForm}
          setShowMemberForm={setShowMemberForm}
          reloadData={reloadData}
          project={project}
        />
      )}
    </div>
  );
}

export default Members;
