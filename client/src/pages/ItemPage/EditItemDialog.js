import { LbButton } from "./Button";
import { LbInput } from "./Input";
import { LbSelect } from "./Select";
import { LbItemClasses, LbItemRarities, LbItemTypes } from "./def";
import { useState } from "react";

export const EditItemDialog = ({ id }) => {
  const [imageFile, setImageFile] = useState();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('submit new item');
  }

  function onImageChange(e) {
    try {
      setImageFile(URL.createObjectURL(e.target.files[0]));
    } catch (e) {

    }
  }

  return (
    <>
      <input className="modal-state" id={id} type="checkbox" />
      <div className="modal">
        <label className="modal-overlay" htmlFor={id}></label>
        <div className="modal-content flex w-full flex-col gap-5 p-7 border border-gray-800/50 bg-gray-900/70 backdrop-blur-sm">
          <label htmlFor={id} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-xl font-semibold">Edit Item</h2>
          </div>
          <form className="form-group mx-auto" onSubmit={onSubmitHandler}>
            <input
              type="file"
              className="input-file input-file-sm mx-auto"
              onChange={onImageChange}
            />
            <img
              className="size-40 mx-auto rounded-xl border border-gray-700"
              alt=""
              src={imageFile}
            />
            <div className="grid grid-cols-2 gap-4">
              <LbInput label="Item Name" placeholder='Item name here' />
              <LbSelect label="Class" options={LbItemClasses} />
              <LbInput label="Price" placeholder="Input item price here" />
              <LbSelect label="Rarity" options={LbItemRarities} />
              <LbInput label="Limit" placeholder="Input item limit here" />
              <LbSelect label="Item Type" options={LbItemTypes} />
              <LbInput label="Index" placeholder="Input item index here" />
            </div>
            <div className="form-field pt-5">
              <div className="form-control justify-center">
                <LbButton type="submit" className="px-8">Save</LbButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
