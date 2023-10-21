import { Button, message, Modal, Table, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteTask, GetAllTasks, UpdateTask } from "../../../apicalls/tasks";
import { SetLoading } from "../../../redux/loadersSlice";
import { getDateFormat } from "../../../utils/helpers";
import Divider from "../../../components/Divider";
import TaskForm from "./TaskForm";
import { AddNotification } from "../../../apicalls/notifications";

const { Option } = Select;

function Tasks({ project }) {
  // State to manage filters
  const [filters, setFilters] = useState({
    status: "all",
    assignedTo: "all",
    assignedBy: "all",
  });
  
  // State to control the visibility of the task details modal
  const [showViewTask, setShowViewTask] = useState(false);
  const { user } = useSelector((state) => state.users);
  
  // State to store tasks
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [task, setTask] = useState(null);
  const dispatch = useDispatch();
  
  // Check if the user is an employee in the project
  const isEmployee = project.members.some(
    (member) => member.role === "employee" && member.user._id === user._id
  );

  // Function to retrieve tasks based on filters
  const getTasks = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllTasks({
        project: project._id,
        ...filters,
      });
      dispatch(SetLoading(false));
      if (response.success) {
        setTasks(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await DeleteTask(id);
      if (response.success) {
        getTasks();
        message.success(response.message);
      } else {
        throw Error(response.message);
      }
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  // Function to update task status
  const onStatusUpdate = async ({ task, status }) => {
    try {
      dispatch(SetLoading(true));
      const response = await UpdateTask({
        _id: task._id,
        status,
      });
      if (response.success) {
        getTasks();
        message.success(response.message);
        // Add a notification when the task status is updated
        AddNotification({
          title: "Task Status Updated",
          description: `${task.name} status has been updated to ${status}`,
          user: task.assignedBy._id,
          onClick: `/project/${project._id}`,
        });
      } else {
        throw new Error(response.message);
      }
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  // Load tasks when filters change
  useEffect(() => {
    getTasks();
  }, [filters]);

  // Configuration for the table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span
          className="underline text-[14px] cursor-pointer"
          onClick={() => {
            setTask(record);
            setShowViewTask(true);
          }}
        >
          {record.name}
        </span>
      ),
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      render: (text, record) =>
        `${record.assignedTo.firstName} ${record.assignedTo.lastName}`,
    },
    {
      title: "Assigned By",
      dataIndex: "assignedBy",
      render: (text, record) =>
        `${record.assignedBy.firstName} ${record.assignedBy.lastName}`,
    },
    {
      title: "Assigned On",
      dataIndex: "createdAt",
      render: (text, record) => getDateFormat(text),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <Select
          style={{ width: "120px" }} // Set a fixed width for the Select components
          value={record.status}
          onChange={(value) => onStatusUpdate({ task: record, status: value })}
          disabled={record.assignedTo._id !== user._id && isEmployee}
        >
          <Option value="pending">Pending</Option>
          <Option value="inprogress">In Progress</Option>
          <Option value="completed">Completed</Option>
          <Option value="closed">Closed</Option>
        </Select>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() => {
              setTask(record);
              setShowTaskForm(true);
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => deleteTask(record._id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Remove the Action column if the user is an employee
  if (isEmployee) {
    columns.pop();
  }

  return (
    <div>
      {!isEmployee && (
        <div className="flex justify-end">
          <Button
            type="default"
            onClick={() => {
              setTask(null);
              setShowTaskForm(true);
            }}
          >
            Add Task
          </Button>
        </div>
      )}

      <div className="flex gap-5">
        <div>
          <span>Status</span>
          <Select
            style={{ width: "120px" }} // Set a fixed width for the Select component
            value={filters.status}
            onChange={(value) => setFilters({ ...filters, status: value })}
          >
            <Option value="all">All</Option>
            <Option value="pending">Pending</Option>
            <Option value="inprogress">In Progress</Option>
            <Option value="completed">Completed</Option>
          </Select>
        </div>

        <div>
          <span>Assigned By</span>
          <Select
            style={{ width: "120px" }} // Set a fixed width for the Select component
            value={filters.assignedBy}
            onChange={(value) => setFilters({ ...filters, assignedBy: value })}
          >
            <Option value="all">All</Option>
            {project.members
              .filter((m) => m.role === "admin" || m.role === "owner")
              .map((m) => (
                <Option key={m.user._id} value={m.user._id}>
                  {`${m.user.firstName} ${m.user.lastName}`}
                </Option>
              ))}
          </Select>
        </div>

        <div>
          <span>Assigned To</span>
          <Select
            style={{ width: "120px" }} // Set a fixed width for the Select component
            value={filters.assignedTo}
            onChange={(value) => setFilters({ ...filters, assignedTo: value })}
          >
            <Option value="all">All</Option>
            {project.members
              .filter((m) => m.role === "employee")
              .map((m) => (
                <Option key={m.user._id} value={m.user._id}>
                  {`${m.user.firstName} ${m.user.lastName}`}
                </Option>
              ))}
          </Select>
        </div>
      </div>

      <Table columns={columns} dataSource={tasks} className="mt-5" />

      {showTaskForm && (
        <TaskForm
          showTaskForm={showTaskForm}
          setShowTaskForm={setShowTaskForm}
          project={project}
          reloadData={getTasks}
          task={task}
        />
      )}

      {showViewTask && (
        <Modal
          title="TASK DETAILS"
          visible={showViewTask}
          onCancel={() => setShowViewTask(false)}
          centered
          footer={null}
          width={700}
        >
          <Divider />
          <div className="flex flex-col">
            <span className="text-md text-primary font-semibold">{task.name}</span>
            <span className="text-[14px] text-gray-500">{task.description}</span>

            <div className="flex gap-5">
              {task.attachments.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="w-40 h-40 object-cover mt-2 p-2 border border-solid rounded border-gray-500"
                />
              ))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Tasks;