import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { LbButton } from "../../components/Button";
import { LbLabelButton } from "../../components/LabelButton";
import { AxiosClient } from "../../utils/axios";
import { LbItemDialog } from "./ItemDialog";
import { LbItemClasses, LbItemRarities, LbItemTypes } from "./def";
import { handleResponse } from "../../utils/net";
import { timeStr, utc2Local } from "../../utils/basic";

const LbItemCardDesc = ({ name, value }) => {
  return (
    <>
      <div className="flex justify-start col-span-3">{name}:</div>
      <div className="col-span-7 text-wrap">{value}</div>
    </>
  );
}

export const LbItemCard = ({ item, fetchItems }) => {
  const onDelete = () => {
    AxiosClient.post('/admin/item/delete', {
      item_index: item.item_index,
    })
      .then((resp) => {
        handleResponse(resp,
          () => {
            toast.success('Successfully deleted.');
            fetchItems();
          },
          (msg) => {
            toast.error(msg);
          });
      })
      .catch((ex) => {
        toast.error(ex.message);
      });
  }

  const modalId = 'modal-' + item.item_name;

  return (
    <div className="flex-none p-2 m-1 text-sm text-gray-400 border-2 rounded-lg w-[16rem] h-fit bg-gray-900/30 border-gray-800/50 hover:border-gray-700 lb-transition">
      <div className="flex justify-end w-full space-x-1">
        <LbLabelButton htmlFor={modalId}>
          <PencilIcon className="size-4" />
        </LbLabelButton>
        <LbItemDialog id={modalId} addOrEdit={false} item={item} fetchItems={fetchItems} />
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
        src={item.item_image}
        alt="item"
        className="mx-auto mt-2 rounded-md size-40"
      />
      <div className="grid grid-cols-10 px-2 mx-auto mt-4 gap-x-2 auto-cols-min w-fit">
        <LbItemCardDesc name="Name" value={item.item_name} />
        <LbItemCardDesc name="Price" value={item.item_price} />
        <LbItemCardDesc name="Class" value={LbItemClasses[item.item_class]} />
        <LbItemCardDesc name="Rarity" value={LbItemRarities[item.item_rarity]} />
        <LbItemCardDesc name="Type" value={LbItemTypes[item.item_type]} />
        <LbItemCardDesc name="Limit" value={item.item_limit} />
        <LbItemCardDesc name="Index" value={item.item_index} />
        <LbItemCardDesc name="Created" value={timeStr(item.create_date)} />
        <LbItemCardDesc name="Modified" value={timeStr(item.modify_date)} />
      </div>
    </div>
  );
}
