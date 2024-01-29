import { Datatable } from "../../components/Datatable";
import { Sorter } from "../../components/Sorter";

export const ChargeLogPage = () => {
  const columns = [
    {
      title: 'User Id',
      dataIndex: 'user_id',
      key: 'user_id',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
      fixed: 'left',
    },
    {
      title: 'User No',
      dataIndex: 'user_no',
      key: 'user_no',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: {
        compare: Sorter.DEFAILT,
      },
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
      title: 'Character No',
      dataIndex: 'character_no',
      key: 'character_no',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'Charge Type',
      dataIndex: 'charge_type',
      key: 'charge_type',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'Map',
      dataIndex: 'map',
      key: 'map',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'X',
      dataIndex: 'x',
      key: 'x',
      search: true,
    },
    {
      title: 'Y',
      dataIndex: 'y',
      key: 'y',
      search: true,
    },
    {
      title: 'Item Index',
      dataIndex: 'item_index',
      key: 'item_index',
      sorter: {
        compare: Sorter.DEFAILT,
      },
    },
    {
      title: 'Log Date',
      dataIndex: 'log_date',
      key: 'log_date',
      sorter: {
        compare: Sorter.DATE,
      },
    },
  ];

  return (
    <Datatable columns={columns} url={"/admin/user_creedians_charge_log"} />
  );
}
