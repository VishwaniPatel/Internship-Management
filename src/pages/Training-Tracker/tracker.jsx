import React from "react";

class TableStructure extends React.Component {
  render() {
    // Sample domain array
    const domainArray = [
      "Domain 1",
      "Domain 2",
      "Domain 3",
      "Domain 4",
      "Domain 5",
    ];

    // Sample start and end dates
    const startDate = new Date("2024-01-01");
    const endDate = new Date("2024-01-10");

    // Function to generate an array of dates between start and end dates
    const generateDateRange = (start, end) => {
      const dates = [];
      for (
        let date = new Date(start);
        date <= end;
        date.setDate(date.getDate() + 1)
      ) {
        dates.push(new Date(date));
      }
      return dates;
    };

    // Array of dates between start and end dates
    const dateRange = generateDateRange(startDate, endDate);

    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th></th>
              {dateRange.map((date, index) => (
                <th key={index}>{date.toLocaleDateString()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {domainArray.map((domain, index) => (
              <tr key={index}>
                <td>{domain}</td>
                {dateRange.map((date, index) => (
                  <td key={index}>
                    Data for {domain} on {date.toLocaleDateString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TableStructure;
