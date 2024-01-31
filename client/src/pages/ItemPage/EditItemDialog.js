import { LbButton } from "../../components/Button";
import { LbInput } from "../../components/Input";
import { LbSelect } from "../../components/Select";
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
        <div className="flex flex-col w-full gap-5 border modal-content p-7 border-gray-800/50 bg-gray-900/70 backdrop-blur-sm">
          <label htmlFor={id} className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</label>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-center">Edit Item</h2>
          </div>
          <form className="mx-auto form-group" onSubmit={onSubmitHandler}>
            <input
              type="file"
              className="mx-auto input-file input-file-sm"
              onChange={onImageChange}
            />
            <img
              className="mx-auto border border-gray-700 size-40 rounded-xl"
              alt=""
              src={imageFile}
            />
            <div className="grid grid-cols-2 gap-4">
              <LbInput label="Item Name" required placeholder='Item name here' />
              <LbSelect label="Class" options={LbItemClasses} />
              <LbInput label="Price" required placeholder="Input item price here" />
              <LbSelect label="Rarity" options={LbItemRarities} />
              <LbInput label="Limit" required placeholder="Input item limit here" />
              <LbSelect label="Item Type" options={LbItemTypes} />
              <LbInput label="Index" required placeholder="Input item index here" />
            </div>
            <div className="pt-5 form-field">
              <div className="justify-center form-control">
                <LbButton type="submit" className="px-8">Save</LbButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
