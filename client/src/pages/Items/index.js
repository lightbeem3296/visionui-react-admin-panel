import VuiInput from "components/VuiInput";
import { LbItemCard } from "./compunents/ItemCard";
import { MagnifyingGlassIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import VuiButton from "components/VuiButton";

export const Items = () => {
  return (
    <div className="h-[calc(100vh-14rem)]">
      <div className="h-[5rem] my-[0.3rem] p-4 border border-zinc-500 rounded-lg overflow-auto flex items-center">
        <div className="flex space-x-2 min-w-[40rem] max-w-[50rem]">
          <VuiButton color='info'>
            <PlusIcon className="w-4 h-4" />
          </VuiButton>
          <VuiButton color='info'>
            <MagnifyingGlassIcon className="w-4 h-4" />
          </VuiButton>
          <VuiInput placeholder="Item name" />
          <VuiInput placeholder="Class" />
          <VuiInput placeholder="Rarity" />
          <VuiInput placeholder="Type" />
          <VuiInput placeholder="Order By" />
        </div>
      </div>
      <div className="flex h-[calc(100%-5rem)]">
        <div className="grow overflow-auto basis-1/2 h-[100%] p-2 border border-zinc-500 rounded-lg">
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
          </div>
        </div>
      </div>
    </div>
  );
}
