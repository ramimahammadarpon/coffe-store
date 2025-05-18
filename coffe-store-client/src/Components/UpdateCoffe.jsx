import React from "react";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const UpdateCoffe = () => {
  const data = useLoaderData();
  console.log(data);
  const { name, price, photo, quantity, supplier, taste, details, _id } = data;

  const handleUpdateCoffe = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newCoffe = Object.fromEntries(formData.entries());
    console.log(newCoffe);

    fetch(`http://localhost:3000/coffes/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCoffe),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data after Updating", data);
        if (data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Coffe is Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="p-24">
      <div className="text-center p-12 space-y-4">
        <h1 className="text-6xl ">Add New Coffe</h1>
        <p>
          It is a long established fact that a reader will be distraceted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here.
        </p>
      </div>
      <form onSubmit={handleUpdateCoffe}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <fieldset className="fieldset w-full rounded-box p-4">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input w-full"
              placeholder="Enter Coffe Name"
              defaultValue={name}
            />
          </fieldset>
          <fieldset className="fieldset w-full rounded-box p-4">
            <label className="label">Quantity</label>
            <input
              type="text"
              name="quantity"
              className="input w-full"
              placeholder="Enter Coffe Chef"
              defaultValue={quantity}
            />
          </fieldset>
          <fieldset className="fieldset w-full rounded-box p-4">
            <label className="label">Supplier</label>
            <input
              type="text"
              name="supplier"
              className="input w-full"
              placeholder="Enter Coffe Supplier"
              defaultValue={supplier}
            />
          </fieldset>
          <fieldset className="fieldset w-full rounded-box p-4">
            <label className="label">Taste</label>
            <input
              type="text"
              name="taste"
              className="input w-full"
              placeholder="Enter Coffe Taste"
              defaultValue={taste}
            />
          </fieldset>
          <fieldset className="fieldset w-full rounded-box p-4">
            <label className="label">Price</label>
            <input
              type="text"
              name="price"
              className="input w-full"
              placeholder="Enter Coffe Price"
              defaultValue={price}
            />
          </fieldset>
          <fieldset className="fieldset w-full rounded-box p-4">
            <label className="label">Details</label>
            <input
              type="text"
              name="details"
              className="input w-full"
              placeholder="Enter Coffe Details"
              defaultValue={details}
            />
          </fieldset>
        </div>
        <fieldset className="fieldset w-full rounded-box p-4">
          <label className="label">Photo</label>
          <input
            type="text"
            name="photo"
            className="input w-full"
            placeholder="Enter Photo URL"
            defaultValue={photo}
          />
        </fieldset>
        <div className="text-center px-4">
          <input className="btn w-full" type="submit" value="Add Coffe" />
        </div>
      </form>
    </div>
  );
};

export default UpdateCoffe;
