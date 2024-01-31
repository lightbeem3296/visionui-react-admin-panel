import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { LbButton } from "../../components/Button";
import { LbLabelButton } from "../../components/LabelButton";
import { AxiosClient } from "../../utils/AxiosClient";
import { LbItemDialog } from "./ItemDialog";
import { LbItemClasses, LbItemRarities, LbItemTypes } from "./def";
import itemImage from '../../assets/items/item1.png';

export const LbItemCard = ({ item, fetchItems }) => {
  function onDelete() {
    console.log('delete index: ' + item.index);
    AxiosClient.post('/admin/item/delete', {
      index: item.index,
    })
      .then(() => {
        toast.success('Successfully deleted.');
        fetchItems();
      })
      .catch((e) => {
        toast.error(e.message);
      });
  }

  const modalId = 'modal-'+item.price;

  return (
    <div className="flex-none p-2 m-1 text-sm text-gray-500 border-2 rounded-lg w-[14rem] h-fit bg-gray-900/70 border-gray-800/50 hover:border-gray-700 lb-transition">
      <div className="flex justify-end w-full space-x-1">
        <div className="popover">
          <LbLabelButton htmlFor={modalId}>
            <PencilIcon className="size-4" />
          </LbLabelButton>
          <LbItemDialog id={modalId} addOrEdit={false} item={item} fetchItems={fetchItems} />
        </div>
        <div className="popover">
          <LbLabelButton className="popover-trigger" tabIndex="0">
            <TrashIcon className="size-4" />
          </LbLabelButton>
          <div className="w-40 p-4 border border-gray-800 popover-content popover-bottom-left bg-gray-900/90 backdrop-blur-sm" tabIndex="0">
            <div className="popover-arrow"></div>
            Are you sure?
            <div className="flex justify-end w-full">
              <LbButton className='w-20 mt-2' onClick={onDelete}>Yes</LbButton>
            </div>
          </div>
        </div>
      </div>
      <img
        src={itemImage}
        alt="item"
        className="mx-auto mt-2 border rounded-md size-40 border-gray-800/50"
      />
      <div className="grid grid-cols-4 px-2 mx-auto mt-4 gap-x-2 auto-cols-min w-fit">
        <div className="flex justify-end">Name:</div><div className="col-span-3 text-wrap">{item.name}</div>
        <div className="flex justify-end">Price:</div><div className="col-span-3 text-wrap">{item.price}</div>
        <div className="flex justify-end">Class:</div><div className="col-span-3 text-wrap">{LbItemClasses[item.class]}</div>
        <div className="flex justify-end">Type:</div><div className="col-span-3 text-wrap">{LbItemTypes[item.type]}</div>
        <div className="flex justify-end">Rarity:</div><div className="col-span-3 text-wrap">{LbItemRarities[item.rarity]}</div>
        <div className="flex justify-end">Limit:</div><div className="col-span-3 text-wrap">{item.limit}</div>
        <div className="flex justify-end">Index:</div><div className="col-span-3 text-wrap">{item.index}</div>
      </div>
    </div>
  );
}
