import { Datatable } from "../../components/Datatable";
import { Sorter } from "../../components/Sorter";

export const UseLogPage = () => {

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
      title: 'Use Type',
      dataIndex: 'use_type',
      key: 'use_type',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'Use Date',
      dataIndex: 'use_date',
      key: 'use_date',
      sorter: {
        compare: Sorter.DATE,
      },
    },
  ];

  return (
    <Datatable columns={columns} url={"/admin/creedian/use-log"} />
  );
}
