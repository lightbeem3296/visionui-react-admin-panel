import { useState } from "react";
import toast from "react-hot-toast";
import { LbButton } from "../../components/Button";
import { LbInput } from "../../components/Input";
import { LbSelect } from "../../components/Select";
import { AxiosClient } from "../../utils/AxiosClient";
import { LbItemClasses, LbItemRarities, LbItemTypes } from "./def";
import { isNullOrUndefined } from "../../utils/basic";

export const LbItemDialog = ({ id, addOrEdit, fetchItems, item }) => {
  const [itemImage, setItemImage] = useState(item ? item.image : undefined);
  const [itemName, setItemName] = useState(item ? item.name : undefined);
  const [itemPrice, setItemPrice] = useState(item ? item.price : undefined);
  const [itemClass, setItemClass] = useState(item ? item.class : undefined);
  const [itemRarity, setItemRarity] = useState(item ? item.rarity : undefined);
  const [itemType, setItemType] = useState(item ? item.type : undefined);
  const [itemLimit, setItemLimit] = useState(item ? item.limit : undefined);
  const [itemIndex, setItemIndex] = useState(item ? item.index : undefined);

  function onImageChange(e) {
    try {
      setItemImage({
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      });
    } catch (e) {
      toast.error(e.message);
    }
  }

  const onNameChange = (e) => {
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

    if (isNullOrUndefined(itemImage)) {
      toast.error('Image is required.');
      return;
    }
    if (isNullOrUndefined(itemClass)) {
      toast.error('Item class is required.');
      return;
    }
    if (isNullOrUndefined(itemRarity)) {
      toast.error('Item rarity is required.');
      return;
    }
    if (isNullOrUndefined(itemType)) {
      toast.error('Item type is required.');
      return;
    }

    var formData = new FormData();
    formData.append('file', itemImage.data);
    console.log(formData);
    console.log(itemImage.preview);

    AxiosClient.post(addOrEdit ? '/admin/item/add' : 'admin/item/update', formData)
      .then(() => {
        toast.success(addOrEdit ? 'Successfully added.' : 'Successfully updated');
        fetchItems();
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }

  return (
    <>
      <input className="modal-state" id={id} type="checkbox" />
      <div className="modal">
        <label className="modal-overlay" htmlFor={id}></label>
        <div className="flex flex-col w-full gap-5 border modal-content p-7 border-gray-800/50 bg-gray-900/70 backdrop-blur-sm">
          <label htmlFor={id} className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">✕</label>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-center">{addOrEdit ? 'Add New Item' : 'Edit Item'}</h2>
          </div>
          <form className="mx-auto form-group" onSubmit={onSubmitHandler}>
            <img
              className="mx-auto border border-gray-700 size-40 rounded-xl"
              alt=""
              src={itemImage.preview}
            />
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="mx-auto w-[6.25rem] input-file input-file-sm"
              onChange={onImageChange}
            />
            <div className="text-sm divider" />
            <div className="grid grid-cols-2 gap-x-2">
              <LbInput label="Item Name" placeholder='Item name here' required value={itemName} onChange={onNameChange} />
              <LbSelect label="Class" options={LbItemClasses} value={itemClass} onChange={onClassChange} />
              <LbInput label="Price" type='number' min='1' placeholder="Input item price here" value={itemPrice} required onChange={onPriceChange} />
              <LbSelect label="Rarity" options={LbItemRarities} value={itemRarity} onChange={onRarityChange} />
              <LbInput label="Limit" type='number' min='1' placeholder="Input item limit here" required value={itemLimit} onChange={onLimitChange} />
              <LbSelect label="Item Type" options={LbItemTypes} value={itemType} onChange={onTypeChange} />
              <LbInput label="Index" placeholder="Input item index here" required value={itemIndex} onChange={onIndexChange} />
            </div>
            <div className="pt-5 form-field">
              <div className="justify-center form-control">
                <LbButton type="submit" className="px-8">
                  {addOrEdit
                    ? 'Add Item'
                    : 'Update Item'
                  }
                </LbButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
