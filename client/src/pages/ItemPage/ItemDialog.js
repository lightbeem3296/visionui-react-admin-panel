import { useState } from "react";
import toast from "react-hot-toast";
import questionMarkImage from '../../assets/question.png';
import { LbButton } from "../../components/Button";
import { LbInput } from "../../components/Input";
import { LbSelect } from "../../components/Select";
import { AxiosClient } from "../../utils/axios";
import { isInvalid, isValid } from "../../utils/basic";
import { handleResponse } from "../../utils/net";
import { LbItemClasses, LbItemRarities, LbItemTypes } from "./def";
import { LbText } from "../../components/Text";

export const LbItemDialog = ({ id, addOrEdit, fetchItems, item }) => {
  const [itemImage, setItemImage] = useState({
    preview: item ? item.item_image : questionMarkImage,
    data: null,
  });
  const [itemName, setItemName] = useState(item ? item.item_name : undefined);
  const [itemDesc, setItemDesc] = useState(item ? item.item_desc : undefined);
  const [itemPrice, setItemPrice] = useState(item ? item.item_price : undefined);
  const [itemClass, setItemClass] = useState(item ? item.item_class : undefined);
  const [itemRarity, setItemRarity] = useState(item ? item.item_rarity : undefined);
  const [itemType, setItemType] = useState(item ? item.item_type : undefined);
  const [itemLimit, setItemLimit] = useState(item ? item.item_limit : undefined);
  const [itemIndex, setItemIndex] = useState(item ? item.item_index : undefined);

  const onImageChange = (e) => {
    try {
      setItemImage({
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      });
    } catch (ex) {
      toast.error(ex.message);
    }
  }

  const onNameChange = (e) => {
    setItemName(e.target.value);
  }

  const onPriceChange = (e) => {
    setItemPrice(e.target.value);
  }

  const onClassChange = (e) => {
    setItemClass(e.target.value);
  }

  const onTypeChange = (e) => {
    setItemType(e.target.value);
  }

  const onRarityChange = (e) => {
    setItemRarity(e.target.value);
  }

  const onLimitChange = (e) => {
    setItemLimit(e.target.value);
  }

  const onIndexChange = (e) => {
    setItemIndex(e.target.value);
  }

  const onDescChange = (e) => {
    setItemDesc(e.target.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (isInvalid(itemImage.data) && addOrEdit) {
      toast.error('Image is required.');
      return;
    }
    if (isInvalid(itemClass)) {
      toast.error('Item class is required.');
      return;
    }
    if (isInvalid(itemRarity)) {
      toast.error('Item rarity is required.');
      return;
    }
    if (isInvalid(itemType)) {
      toast.error('Item type is required.');
      return;
    }

    const form = new FormData();
    form.append('file', itemImage.data);
    form.append('details', JSON.stringify({
      item_hash: isValid(item) ? item.item_hash : null,
      item_name: itemName,
      item_price: itemPrice,
      item_index: itemIndex,
      item_limit: itemLimit,
      item_type: itemType,
      item_rarity: itemRarity,
      item_class: itemClass,
      item_desc: itemDesc,
    }));
    AxiosClient.post(addOrEdit ? '/admin/item/add' : 'admin/item/update', form, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then((resp) => {
        handleResponse(resp,
          () => {
            toast.success(addOrEdit ? 'Successfully added' : 'Successfully updated');
            fetchItems();
          },
          (msg) => {
            toast.error(msg);
          })
      })
      .catch((ex) => {
        toast.error(ex.message);
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

            <div className="grid grid-cols-2">
              <div className="flex flex-col justify-center space-y-2">
                <img
                  className="mx-auto border border-gray-700 bg-gray-100/30 size-40 rounded-xl"
                  alt=""
                  src={itemImage.preview}
                />
                <input
                  type="file"
                  accept="image/png"
                  className="mx-auto w-[6.25rem] input-file input-file-sm"
                  onChange={onImageChange}
                />
              </div>
              <LbText label='Description' className='h-[12.5rem] mb-[1.4rem]' placeholder='Item description here' value={itemDesc} onChange={onDescChange} />
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <LbInput label="Item Name" placeholder='Item name here' required value={itemName} onChange={onNameChange} />
              <LbSelect label="Class" options={LbItemClasses} value={itemClass} onChange={onClassChange} />
              <LbInput label="Price" type='number' min='1' placeholder="Input item price here" value={itemPrice} required onChange={onPriceChange} />
              <LbSelect label="Rarity" options={LbItemRarities} value={itemRarity} onChange={onRarityChange} />
              <LbInput label="Limit" type='number' min='1' placeholder="Input item limit here" required value={itemLimit} onChange={onLimitChange} />
              <LbSelect label="Item Type" options={LbItemTypes} value={itemType} onChange={onTypeChange} />
              <LbInput label="Index" type='number' placeholder="Input item index here" required value={itemIndex} onChange={onIndexChange} />
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
