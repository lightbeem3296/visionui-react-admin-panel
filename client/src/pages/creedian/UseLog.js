import Datatable from "../components/Datatable";
import { Sorter } from "pages/components/Sorter";

export const CreedianUseLog = () => {

  const columns = [
    {
      title: 'User Id',
      dataIndex: 'user_id',
      key: 'user_id',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
      width: "270px",
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
    <Datatable columns={columns} url={"http://localhost:9000/admin/user_creedians_use_log"} />
  );
}
