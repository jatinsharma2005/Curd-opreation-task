import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import Swal from "sweetalert2";

import "./../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [tasks, setTasks] = useState([]);

  const [users, setUsers] = useState([]);

  const [editId, setEditId] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const storedUser = localStorage.getItem("user");

    if (!token) {
      navigate("/");
    }

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      setUser(parsedUser);

      if (parsedUser.role === "admin") {
        fetchUsers();
      }
    }
  }, []);

  // FETCH USERS

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/v1/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setUsers(data);
    } catch (error) {
      console.log(error);

      toast.error("Failed to fetch users");
    }
  };

  // CHANGE ROLE

  const changeRole = async (id, currentRole) => {
    const result = await Swal.fire({
      title:
        currentRole === "admin" ? "Make Admin to User?" : "Make User to Admin?",

      text:
        currentRole === "admin"
          ? "This admin will lose admin access."
          : "This user will become admin.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#38bdf8",

      cancelButtonColor: "#ef4444",

      confirmButtonText: "Yes",

      background: "#0f172a",

      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/v1/users/${id}/role`, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          role: currentRole === "admin" ? "user" : "admin",
        }),
      });

      toast.success("User role updated");

      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  // DELETE USER

  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Delete User?",

      text: "All tasks of this user will also be deleted.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#ef4444",

      cancelButtonColor: "#38bdf8",

      confirmButtonText: "Delete",

      background: "#0f172a",

      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(`http://localhost:5000/api/v1/users/${id}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User deleted successfully");

      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  // ADD TASK

  const addTask = () => {
    if (!title || !description) {
      return toast.error("Please fill all fields");
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
    };

    setTasks([...tasks, newTask]);

    toast.success("Task added successfully");

    setTitle("");

    setDescription("");
  };

  // DELETE TASK

  const deleteTask = async (id) => {
    const result = await Swal.fire({
      title: "Delete Task?",

      text: "Are you sure you want to delete this task?",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#ef4444",

      cancelButtonColor: "#38bdf8",

      confirmButtonText: "Delete",

      background: "#0f172a",

      color: "#fff",
    });

    if (!result.isConfirmed) return;

    setTasks(tasks.filter((task) => task.id !== id));

    toast.success("Task deleted successfully");
  };

  // EDIT TASK

  const editTask = (task) => {
    setTitle(task.title);

    setDescription(task.description);

    setEditId(task.id);

    toast.success("Edit mode enabled");
  };

  // UPDATE TASK

  const updateTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editId
          ? {
              ...task,
              title,
              description,
            }
          : task,
      ),
    );

    toast.success("Task updated successfully");

    setEditId(null);

    setTitle("");

    setDescription("");
  };

  // LOGOUT

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    toast.success("Logged out successfully");

    navigate("/");
  };

  return (
    <div className="dashboard">
      {/* TOPBAR */}

      <div className="topbar">
        <div>
          <h2>Welcome, {user?.name}</h2>

          <span
            className={
              user?.role === "admin" ? "role admin-role" : "role user-role"
            }
          >
            {user?.role}
          </span>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* ADMIN STATS */}

      {user?.role === "admin" && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Tasks</h3>

            <p>{tasks.length}</p>
          </div>

          <div className="stat-card">
            <h3>Total Users</h3>

            <p>{users.length}</p>
          </div>

          <div className="stat-card">
            <h3>Admin Panel</h3>

            <p>Active</p>
          </div>
        </div>
      )}

      {/* ADMIN USER MANAGEMENT */}

      {user?.role === "admin" && (
        <div className="users-section">
          <h2>Manage Users</h2>

          <div className="users-grid">
            {users
              .filter((u) => u._id !== user?.id)
              .map((u) => (
                <div className="user-card" key={u._id}>
                  <h3>{u.name}</h3>

                  <p>{u.email}</p>

                  <span
                    className={
                      u.role === "admin" ? "role admin-role" : "role user-role"
                    }
                  >
                    {u.role}
                  </span>

                  <div className="user-actions">
                    <button
                      className="edit-btn"
                      onClick={() => changeRole(u._id, u.role)}
                    >
                      Make {u.role === "admin" ? "User" : "Admin"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(u._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TASK FORM */}

      <div className="task-form">
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {editId ? (
          <button onClick={updateTask}>Update Task</button>
        ) : (
          <button onClick={addTask}>Add Task</button>
        )}
      </div>

      {/* TASKS */}

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty-text">No tasks available</p>
        ) : (
          tasks.map((task) => (
            <div className="task-card" key={task.id}>
              <div className="task-content">
                <h3>{task.title}</h3>

                <p>{task.description}</p>
              </div>

              <div className="task-actions">
                <button className="edit-btn" onClick={() => editTask(task)}>
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
