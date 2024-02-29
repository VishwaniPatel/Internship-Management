import { Table } from "@mantine/core";
import { DropdownMenu } from "./DropdownMenu";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInternsBatchData } from "../utility/service/intern-batch.service";

export default function InternsBatchTable() {
  const [records, setRecords] = useState([]);

  const getInternBatchList = () => {
    getInternsBatchData().then((res) => {
      setRecords(res.data);
    });
  };

  useEffect(() => {
    getInternBatchList();
  }, []);

  const formatDateString = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const rows = records.map((tabData) => (
    <Table.Tr key={tabData.id}>
      <Table.Td>
        <Link
          style={{ textTransform: "uppercase" }}
          className="text-link"
          to={`/intern-batch/${tabData.id}`}
        >
          {tabData.batchname}
        </Link>
      </Table.Td>
      <Table.Td>{formatDateString(tabData.startdate)}</Table.Td>
      <Table.Td>{formatDateString(tabData.enddate)}</Table.Td>
      <Table.Td>
        {
          <DropdownMenu
            getInternBatchList={getInternBatchList}
            id={tabData.id}
          />
        }
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <div className="content-wrapper">
      <div className="table-container">
        <Table highlightOnHover withTableBorder withColumnBorders mt="md">
          <Table.Thead bg="#f1f3f5">
            <Table.Tr>
              <Table.Th>BATCH-NAME</Table.Th>
              <Table.Th>START-DATE</Table.Th>
              <Table.Th>END-DATE</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
}
