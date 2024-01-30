import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { EditItemDialog } from "./EditItemDialog";
import { LbLabelButton } from "./LabelButton";
import { LbButton } from "./Button";

export const LbItemCard = ({ item }) => {
  return (
    <div className="flex-none p-4 m-1 text-sm text-gray-500 border-2 rounded-lg w-30 h-fit bg-gray-900/70 border-gray-800/50 hover:border-gray-700 lb-transition">
      <div className="flex justify-end w-full mb-2 space-x-1">
        <div className="popover">
          <LbLabelButton htmlFor="modal-edit-item">
            <PencilIcon className="size-4" />
          </LbLabelButton>
          <EditItemDialog id='modal-edit-item' />
        </div>
        <div className="popover">
          <LbLabelButton className="popover-trigger" tabIndex="0">
            <TrashIcon className="size-4" />
          </LbLabelButton>
          <div className="w-40 p-4 border border-gray-800 popover-content popover-bottom-left bg-gray-900/90 backdrop-blur-sm" tabIndex="0">
            <div className="popover-arrow"></div>
            Are you sure?
            <div className="flex justify-end w-full">
              <LbButton className='w-20 mt-2 bg-red-500'>Yes</LbButton>
            </div>
          </div>
        </div>
      </div>
      <img
        src="/img/class/0.png"
        alt="item"
        className="mx-auto mt-4 border rounded-md size-40 border-gray-800/50"
      />
      <div className="grid grid-cols-3 mx-auto mt-4 gap-x-2 auto-cols-min w-fit">
        <div className="flex justify-end">Name:</div><div className="col-span-2">Light Hammer</div>
        <div className="flex justify-end">Price:</div><div className="col-span-2">15000</div>
        <div className="flex justify-end">Class:</div><div className="col-span-2">Azure Knight</div>
        <div className="flex justify-end">Type:</div><div className="col-span-2">Weapon</div>
        <div className="flex justify-end">Rarity:</div><div className="col-span-2">Normal</div>
        <div className="flex justify-end">Limit:</div><div className="col-span-2">7</div>
        <div className="flex justify-end">Index:</div><div className="col-span-2">240131</div>
      </div>
    </div>
  );
}
