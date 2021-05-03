import {useMemo,useState,useEffect} from 'react'
import productApi from '../../api/productApi';
import { useTable,usePagination } from 'react-table'
import { COLUMNS } from './Columns'
import './table.css'

export const NotiTable = () => {
  const [notiList, setNotiList] = useState([]);
  useEffect(() => {
    const fetchNotiList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,

        };
        const response = await productApi.getAll(params);
        console.log(response);
     
        setNotiList(response);
      
      } catch (error) {
        console.log('Failed to fetch product list: ', error);
      }
    }

    fetchNotiList();
  }, []);
    const columns = useMemo(()=> COLUMNS,[])
    const data = useMemo(()=> notiList,[])
//    const tableInstance = useTable({
//         columns,
//         data
//     },
//     usePagination)
    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
    } = useTable(
        {
          columns,
          data,
          initialState: { pageIndex: 0 }
        },
        usePagination
      )
      const { pageIndex, pageSize } = state
    return(
        <>
       
        <table className= 'notitable' {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
        <div className="change-page">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        {/* <span>
          | Go to page:{' '}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(pageNumber)
            }}
            style={{ width: '50px' }}
          />
        </span>{' '} */}
        {/* <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}>
          {[10, 25, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </div>
    </table>
   
      
    </>
    )
}
export default NotiTable