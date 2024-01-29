import { Datatable } from "../../components/Datatable";
import { Sorter } from "../../components/Sorter";

export const CreediansPage = () => {

  const columns = [
    {
      title: 'User Id',
      dataIndex: 'user_id',
      // key: 'user_id',
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
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'Creedian',
      dataIndex: 'creedian',
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
    <Datatable columns={columns} url={"http://localhost:9000/admin/user_creedians"} />
  );
}
