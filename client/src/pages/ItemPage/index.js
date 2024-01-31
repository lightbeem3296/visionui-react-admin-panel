import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { LbItemCard } from "./ItemCard";
import { NewItemDialog } from "./NewItemDialog";
import { LbInput } from "../../components/Input";
import { LbSelect } from "../../components/Select";
import { LbItemClassesWithAll, LbItemOrders, LbItemRaritiesWithAll, LbItemTypesWithAll } from "./def";
import { LbButton } from "../../components/Button";
import { LbLabelButton } from "../../components/LabelButton";

export const ItemsPage = () => {

  const fetchItems = () => {
    console.log('fetch data');
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log('submit');
    fetchItems();
  }

  return (
    <div className="flex h-full space-x-4">
      <div className="flex-none h-full p-4 overflow-auto border border-gray-800/50 rounded-lg w-[12rem]">
        <LbLabelButton htmlFor="modal-new-item" className='w-full'>
          <PlusIcon className="size-4" />New Item
        </LbLabelButton>
        <NewItemDialog id='modal-new-item' />

        <div className="text-sm divider">Filter</div>
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col space-y-2"
        >
          <LbButton type="submit">
            <MagnifyingGlassIcon className="size-4" />Filter
          </LbButton>
          <LbInput label="Item Name" placeholder='Item name here' />
          <LbSelect label="Class" options={LbItemClassesWithAll} />
          <LbSelect label="Rarity" options={LbItemRaritiesWithAll} />
          <LbSelect label="Item Type" options={LbItemTypesWithAll} />
          <LbSelect label="Order By" options={LbItemOrders} />
        </form>
      </div>
      <div className="flex h-full">
        <div className="grow overflow-auto basis-1/2 h-[100%] p-2 border border-gray-800/50 rounded-lg">
          <div className="flex flex-wrap w-full h-fit">
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
            <LbItemCard />
          </div>
        </div>
      </div>
    </div>
  );
}
