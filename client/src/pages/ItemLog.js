import { Datatable } from "../components/Datatable";
import { Sorter } from "../components/Sorter";

export const ItemLogPage = () => {

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
      fixed: 'left',
    },
    {
      title: 'Character Name',
      dataIndex: 'character_name',
      key: 'character_name',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'Item Name',
      dataIndex: 'item_name',
      key: 'item_name',
      sorter: {
        compare: Sorter.DEFAULT,
      },
      search: true,
    },
    {
      title: 'Item Class',
      dataIndex: 'item_class',
      key: 'item_class',
      sorter: {
        compare: Sorter.DEFAULT,
      },
    },
    {
      title: 'Item Rarity',
      dataIndex: 'item_rarity',
      key: 'item_rarity',
      sorter: {
        compare: Sorter.DEFAULT,
      },
    },
    {
      title: 'Item Type',
      dataIndex: 'item_type',
      key: 'item_type',
      sorter: {
        compare: Sorter.DEFAULT,
      },
    },
    {
      title: 'Item Price',
      dataIndex: 'item_price',
      key: 'item_price',
      sorter: {
        compare: Sorter.DEFAULT,
      },
    },
    {
      title: 'Creedians Before',
      dataIndex: 'creeds_before',
      key: 'creeds_before',
      sorter: {
        compare: Sorter.DEFAULT,
      },
    },
    {
      title: 'Creedians After',
      dataIndex: 'creeds_after',
      key: 'creeds_after',
      sorter: {
        compare: Sorter.DEFAULT,
      },
    },
    {
      title: 'Date',
      dataIndex: 'log_date',
      key: 'log_date',
      sorter: {
        compare: Sorter.DATE,
      },
    },
  ];

  return (
    <Datatable columns={columns} url={"/admin/item/item-log"} />
  );
}
