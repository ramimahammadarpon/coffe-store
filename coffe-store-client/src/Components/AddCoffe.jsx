import React from "react";
import Swal from "sweetalert2";

const AddCoffe = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newCoffe = Object.fromEntries(formData.entries());
    console.log(newCoffe);

    fetch("http://localhost:3000/coffes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCoffe),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After Connecting to The db:", data);
        if (data.insertedId) {
          Swal.fire({
            title: "Coffe Added Successfully!",
            icon: "success",
            draggable: true,
          });
        }
      });
    // const name = form.name.value;
    // const chef = form.chef.value;
    // const supplier = form.supplier.value;
    // const taste = form.taste.value;
    // const category = form.category.value;
    // const details = form.details.value;
    // const photo = form.photo.value;
    // console.log(name, chef, supplier, taste, category, details, photo);
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
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <fieldset className="fieldset w-full rounded-box p-4">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input w-full"
              placeholder="Enter Coffe Name"
            />
          </fieldset>
          <fieldset className="fieldset w-full rounded-box p-4">
            <label className="label">Quantity</label>
            <input
              type="text"
              name="quantity"
              className="input w-full"
              placeholder="Enter Coffe Chef"
            />
          </fieldset>
          <fieldset className="fieldset w-full rounded-box p-4">
            <label className="label">Supplier</label>
            <input
              type="text"
              name="supplier"
              className="input w-full"
              placeholder="Enter Coffe Supplier"
            />
          </fieldset>
          <fieldset className="fieldset w-full rounded-box p-4">
            <label className="label">Taste</label>
            <input
              type="text"
              name="taste"
              className="input w-full"
              placeholder="Enter Coffe Taste"
            />
          </fieldset>
          <fieldset className="fieldset w-full rounded-box p-4">
            <label className="label">Price</label>
            <input
              type="text"
              name="price"
              className="input w-full"
              placeholder="Enter Coffe Price"
            />
          </fieldset>
          <fieldset className="fieldset w-full rounded-box p-4">
            <label className="label">Details</label>
            <input
              type="text"
              name="details"
              className="input w-full"
              placeholder="Enter Coffe Details"
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
          />
        </fieldset>
        <div className="text-center px-4">
          <input className="btn w-full" type="submit" value="Add Coffe" />
        </div>
      </form>
    </div>
  );
};

export default AddCoffe;
