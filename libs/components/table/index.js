import { useEffect } from 'react'
import { useTable, useFilters, usePagination, useSortBy } from 'react-table'

const Table = ({ columns, data, filter, search }) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    page, // Instead of using 'rows', we'll use page,
    prepareRow,
    setFilter,

    // pagination
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
      }
    },
    useFilters,
    // useSortBy,
    usePagination,
    )

  useEffect(() => {
    setFilter(filter, search);
  }, [filter, search])

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
                  {/*<span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>*/}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
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

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}
        className="cursor-pointer px-2 py-1 border rounded my-2">
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}
        className="cursor-pointer px-2 py-1 border rounded my-2">
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}
        className="cursor-pointer px-2 py-1 border rounded my-2">
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}
        className="cursor-pointer px-2 py-1 border rounded my-2">
          {'>>'}
        </button>{' '}
        <span className="mx-2">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
          className="border p-1 rounded cursor-pointer"
        >
          {[10, 20, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Table;