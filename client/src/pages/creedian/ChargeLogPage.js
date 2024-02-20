import { Datatable } from "../../components/Datatable";
import { Sorter } from "../../components/Sorter";

export const ChargeLogPage = () => {
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'user_id',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
      fixed: 'left',
    },
    {
      title: 'User No',
      dataIndex: 'user_no',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      sorter: {
        compare: Sorter.DEFAILT,
      },
    },
    {
      title: 'Character Name',
      dataIndex: 'character_name',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'Character No',
      dataIndex: 'character_no',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'Charge Type',
      dataIndex: 'charge_type',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'Map',
      dataIndex: 'map',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'X',
      dataIndex: 'x',
    },
    {
      title: 'Y',
      dataIndex: 'y',
    },
    {
      title: 'Item Index',
      dataIndex: 'item_index',
      sorter: {
        compare: Sorter.DEFAILT,
      },
    },
    {
      title: 'Log Date',
      dataIndex: 'log_date',
      sorter: {
        compare: Sorter.DATE,
      },
    },
  ];

  return (
    <Datatable columns={columns} url={"/admin/creedian/charge-log"} />
  );
}
