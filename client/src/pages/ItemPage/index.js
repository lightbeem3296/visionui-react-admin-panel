import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { LbButton } from "../../components/Button";
import { LbInput } from "../../components/Input";
import { LbLabelButton } from "../../components/LabelButton";
import { LbSelect } from "../../components/Select";
import { AxiosClient } from "../../utils/axios";
import { LbItemCard } from "./ItemCard";
import { LbItemDialog } from "./ItemDialog";
import { LbItemClassesWithAll, LbItemOrders, LbItemRaritiesWithAll, LbItemTypesWithAll, LbOrderDirection } from "./def";
import toast from "react-hot-toast";
import { handleResponse } from "../../utils/net";

export const ItemsPage = () => {
  const [items, setItems] = useState([]);

  const [nameFilter, setNameFilter] = useState();
  const [classFilter, setClassFilter] = useState();
  const [rarityFilter, setRarityFilter] = useState();
  const [typeFilter, setTypeFilter] = useState();
  const [orderByFilter, setOrderByFilter] = useState();
  const [orderDirectionFilter, setOrderDirectionFilter] = useState();

  const onNameFilterChange = (e) => {
    setNameFilter(e.target.value);
  }

  const onClassFilterChange = (e) => {
    setClassFilter(e.target.value);
  }

  const onRarityFilterChange = (e) => {
    setRarityFilter(e.target.value);
  }

  const onTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  }

  const onOrderByFilterChange = (e) => {
    setOrderByFilter(e.target.value);

  }

  const onOrderDirectionChange = (e) => {
    setOrderDirectionFilter(e.target.value);
  }

  const fetchItems = () => {
    setItems([]);
    AxiosClient.post(`/admin/item/fetch`, {
      item_name: nameFilter || '',
      item_class: classFilter * 1,
      item_rarity: rarityFilter * 1,
      item_type: typeFilter * 1,
      order_by: orderByFilter,
      order_dir: orderDirectionFilter,
    })
      .then((resp) => {
        handleResponse(resp, (body) => {
          setItems(body);
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  const onFilterSubmitHandler = (e) => {
    e.preventDefault();
    fetchItems();
  }

  useEffect(() => fetchItems(), []);

  return (
    <div className="flex h-full space-x-4">
      <div className="flex-none h-full p-4 overflow-auto border border-gray-800/50 rounded-lg w-[12rem]">
        <LbLabelButton htmlFor="modal-new-item" className='w-full'>
          <PlusIcon className="size-4" />New Item
        </LbLabelButton>
        <LbItemDialog id='modal-new-item' addOrEdit={true} fetchItems={fetchItems} />

        <div className="text-sm divider" />
        <form
          onSubmit={onFilterSubmitHandler}
          className="flex flex-col space-y-2"
        >
          <LbButton type="submit">
            <MagnifyingGlassIcon className="size-4" />Filter
          </LbButton>
          <LbInput label="Item Name" placeholder='Item name here' onChange={onNameFilterChange} />
          <LbSelect label="Class" options={LbItemClassesWithAll} onChange={onClassFilterChange} />
          <LbSelect label="Rarity" options={LbItemRaritiesWithAll} onChange={onRarityFilterChange} />
          <LbSelect label="Item Type" options={LbItemTypesWithAll} onChange={onTypeFilterChange} />
          <LbSelect label="Order By" options={LbItemOrders} onChange={onOrderByFilterChange} />
          <LbSelect label="Order Direction" options={LbOrderDirection} onChange={onOrderDirectionChange} />
        </form>
      </div>
      <div className="size-full">
        <div className="w-full overflow-auto basis-1/2 h-[100%] p-2 border border-gray-800/50 rounded-lg">
          <div className="flex flex-wrap w-full h-fit">
            {items.map((item, index) => <LbItemCard key={index} item={item} fetchItems={fetchItems} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
