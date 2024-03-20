import { Table, Badge } from "@mantine/core";
import { DropdownMenu } from "./DropdownMenu";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInternBatch } from "../hooks/useInternBatch";
import InternshipContext from "../../../shared/store/Context";
import useSearch from "../../../shared/hooks/useSearch";

export function InternsBatchTable() {
  const [records, setRecords] = useState([]);
  const BatchData = useInternBatch();
const {searchTerm} = useContext(InternshipContext);
  const getInternBatchList = () => {
      setRecords(BatchData);
  };

  useEffect(() => {
    // search keys
    const searchKeys = ['batchname', 'formattedStartDate', 'formattedEndDate', 'status'];
    // formatted data for start date and end date
    const formattedData = BatchData.map(item => ({
      ...item,
      formattedStartDate: formatDateString(item.startdate),
      formattedEndDate: formatDateString(item.enddate),
    }));
    // Use the useSearch hook with the modified data and searchKeys
    const filteredBatch = useSearch(formattedData, searchTerm, searchKeys);
    setRecords(filteredBatch);
  }, [searchTerm]);

  useEffect(() => {
    getInternBatchList();
  }, [BatchData]);

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
          to={`/intern-batch/details/${tabData.id}`}
        >
          {tabData.batchname}
        </Link>
      </Table.Td>
      <Table.Td>{formatDateString(tabData.startdate)}</Table.Td>
      <Table.Td>{formatDateString(tabData.enddate)}</Table.Td>
      <Table.Td>
        <Badge
          variant={
            tabData.status === "Not-Started"
              ? "notStarted"
              : tabData.status === "Completed"
              ? "completed"
              : "inProgress"
          }
          radius="sm"
        >
          {tabData.status}
        </Badge>
      </Table.Td>
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
              <Table.Th>STATUS</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
}
