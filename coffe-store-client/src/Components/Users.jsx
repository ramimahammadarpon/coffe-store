import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const Users = () => {
  // console.log(deleteAccount);
  const initialUsers = useLoaderData();
  const [users, setUsers] = useState(initialUsers);
  console.log(initialUsers);

  const handleViewButton = () => {
    console.log("This is handle view button");
  };

  const handleUpdateButton = () => {
    console.log("This is handle Update Button");
  };

  const handleRemoveButton = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount) {
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                  const remainingUsers = users.filter(totalUsers => totalUsers._id !== id);
                  setUsers(remainingUsers);
                }
            })
      }
    });
  };

  return (
    <div className="overflow-x-auto mt-20">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        {users.map((user, index) => (
          <tbody key={user._id}>
            {/* row 1 */}
            <tr>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user.photoUrl}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.name}</div>
                    <div className="text-sm opacity-50">{user.address}</div>
                  </div>
                </div>
              </td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <th>
                <button onClick={handleViewButton} className="btn">
                  V
                </button>
                <button onClick={handleUpdateButton} className="btn">
                  U
                </button>
                <button
                  onClick={() => handleRemoveButton(user._id)}
                  className="btn"
                >
                  X
                </button>
              </th>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default Users;
