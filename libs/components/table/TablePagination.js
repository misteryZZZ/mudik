import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTable } from 'react-table'

const Table = ({ columns, data, links, from, to, total, basePagination, currentPage, query }) => {
  const router = useRouter();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    // useFilters,
    // useSortBy,
    )

  return (
    <>
      <div className="overflow-auto border border-black rounded-xl">
        <div className="p-4 w-max min-w-full h-full">
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
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center flex-wrap ">
        <div className="flex items-center flex-wrap justify-center gap-x-2">
        {links && links.map((link,i) => (
          <Link key={i}
          href={`${basePagination}?page=`
                + String((i == links.length - 1)
                  ? currentPage + 1
                  : (i == 0)
                  ? currentPage - 1
                  : !link.active
                  ? link.label
                  : '')
                + String((query)
                  ? `&${(new URLSearchParams(query).toString())}`
                  : '')
          }>
          {/*<Link key={i} href={link.active ? `${basePagination}?page=`+link.label : ''}>*/}
            <button className="cursor-pointer px-2 py-1 border rounded my-2 whitespace-nowrap transition hover:bg-gray-200 disabled:bg-gray-200 disabled:pointer-events-none" 
            disabled={link.active || link.url == null}
            dangerouslySetInnerHTML={{ __html: link.label }}/>
          </Link>
        ))}
        </div>
        <div>
          <span className="">
            {from} - {to} data of total {total}
          </span>
        </div>
      </div>
    </>
  );
}

export default Table;