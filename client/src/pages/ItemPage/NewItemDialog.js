import { PlusIcon } from "@heroicons/react/24/outline";
import { LbButton } from "../../components/Button";
import { LbInput } from "../../components/Input";
import { LbSelect } from "../../components/Select";
import { LbItemClasses, LbItemRarities, LbItemTypes } from "./def";
import { useState } from "react";

export const NewItemDialog = ({ id }) => {
  const [itemImage, setItemImage] = useState();
  const [itemName, setItemName] = useState();
  const [itemPrice, setItemPrice] = useState();
  const [itemClass, setItemClass] = useState();
  const [itemType, setItemType] = useState();
  const [itemRarity, setItemRarity] = useState();
  const [itemLimit, setItemLimit] = useState();
  const [itemIndex, setItemIndex] = useState();



  function onImageChange(e) {
    try {
      setItemImage(URL.createObjectURL(e.target.files[0]));
    } catch (e) {

    }
  }

  function onNameChange(e) {
    setItemName(e.target.value);
  }

  function onPriceChange(e) {
    setItemPrice(e.target.value);
  }

  function onClassChange(e) {
    setItemClass(e.target.value);
  }

  function onTypeChange(e) {
    setItemType(e.target.value);
  }

  function onRarityChange(e) {
    setItemRarity(e.target.value);
  }

  function onLimitChange(e) {
    setItemLimit(e.target.value);
  }

  function onIndexChange(e) {
    setItemIndex(e.target.value);
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    console.log(itemName);
    console.log(itemPrice);
    console.log(itemImage);
    console.log(itemIndex);
    console.log(itemLimit);
    console.log(itemType);
    console.log(itemRarity);
    console.log(itemClass);
  }

  return (
    <>
      <input className="modal-state" id={id} type="checkbox" />
      <div className="modal">
        <label className="modal-overlay" htmlFor={id}></label>
        <div className="flex flex-col w-full gap-5 border modal-content p-7 border-gray-800/50 bg-gray-900/70 backdrop-blur-sm">
          <label htmlFor={id} className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</label>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-center">New Item</h2>
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
              src={itemImage}
            />
            <div className="grid grid-cols-2 gap-4">
              <LbInput label="Item Name" placeholder='Item name here' required onChange={onNameChange} />
              <LbSelect label="Class" options={LbItemClasses} onChange={onClassChange} />
              <LbInput label="Price" placeholder="Input item price here" required onChange={onPriceChange} />
              <LbSelect label="Rarity" options={LbItemRarities} onChange={onRarityChange} />
              <LbInput label="Limit" placeholder="Input item limit here" required onChange={onLimitChange} />
              <LbSelect label="Item Type" options={LbItemTypes} onChange={onTypeChange} />
              <LbInput label="Index" placeholder="Input item index here" required onChange={onIndexChange} />
            </div>
            <div className="pt-5 form-field">
              <div className="justify-center form-control">
                <LbButton type="submit" className="px-8"><PlusIcon className="size-4" /> Add</LbButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
