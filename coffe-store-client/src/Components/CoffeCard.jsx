import React from "react";
import { Link, Links } from "react-router";
import Swal from "sweetalert2";

const CoffeCard = ({ coffe, setCoffes, coffes }) => {
  const { photo, price, quantity, name, _id } = coffe;

  const handleRemove = (id) => {
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
      console.log(result.isConfirmed);
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/coffes/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount) {
              const filteredCoffes = coffes.filter(coffe=> coffe._id !== _id);
              setCoffes(filteredCoffes);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="card card-side bg-base-100 shadow-sm border items-center">
      <figure>
        <img src={photo} alt="" />
      </figure>
      <div className="flex w-full justify-between p-10">
        <div className="space-y-4">
          <h2 className="font-bold text-2xl">{name}</h2>
          <p>Quantity: {quantity}</p>
          <p>Price: {price}</p>
        </div>
        <div>
          <div className="join join-vertical">
            <Link to={`/coffe/${_id}`} className="btn join-item">View Details</Link>
            <Link to={`/updateCoffe/${_id}`} className="btn join-item">Edit</Link>
            <button onClick={() => handleRemove(_id)} className="btn join-item">
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeCard;
