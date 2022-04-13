import { useEffect, useCallback } from 'react'
import { useTable, useFilters, usePagination, useSortBy, useExpanded } from 'react-table'

const Table = ({ columns, data, filter, search }) => {

  const getSubRows = useCallback((row) => {
    return row.detail_passenger ? row.detail_passenger.member : [];
  }, []);

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
      },
      getSubRows
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    )

  useEffect(() => {
    setFilter(filter, search);
  }, [filter, search])

  return (
    <>
      <div className="overflow-auto border border-black rounded-xl">
        <div className="p-4 w-max min-w-full h-full mr-px">
          <table {...getTableProps}
            className="w-full">
            <thead className="border-b border-black">
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-4 pb-3">
                      <span className="flex items-center gap-1 select-none">
                        {column.render('Header')}
                        {column.isSorted
                          ? column.isSortedDesc
                            ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                              </svg>
                            )
                            : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                              </svg>
                            )
                          : ''}
                      </span>
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
        </div>
      </div>

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
    </>
  );
}

export default Table;