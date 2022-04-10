import { useEffect } from 'react'
import { useTable, useFilters, usePagination, useSortBy } from 'react-table'

const Table = ({ columns, data }) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    // page, // Instead of using 'rows', we'll use page,
    prepareRow,
    // setFilter,

    // pagination
    /*canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },*/
  } = useTable(
    {
      columns,
      data
      // initialState: {
      //   pageIndex: 0,
      //   pageSize: 5,
      // }
    },
    // useFilters,
    // useSortBy,
    // usePagination,
    )

  // useEffect(() => {
  //   setFilter(filter, search);
  // }, [filter, search])

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

      {/*<div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex} of {pageOptions.length}
          </strong>
        </span>
      </div>*/}
    </div>
  );
}

export default Table;