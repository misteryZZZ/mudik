import React from 'react'
import { useTable } from 'react-table'

const Table = ({ columns, data }) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <div className="border border-black rounded-xl p-4 w-max min-w-full h-full mr-px">
      <table {...getTableProps}
        className="w-full">
        <thead className="border-b border-black">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}
                  className="px-4 pb-3">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}
                className="border-b">
                {row.cells.map((cell,i) => (
                  <td {...cell.getCellProps}
                    key={i}
                    className="text-center px-1 py-3">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;