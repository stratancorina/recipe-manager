interface SortProps {
    onSort: (sort: string) => void
}

export const Sort = ({ onSort }: SortProps) => {
    return (
        <select  id="sort-recipies" className='px-3 py-2 border border-gray-300 rounded bg-white' defaultValue={'default'} onChange={(e) => onSort(e.target.value)}>
            <option value="default" >Default</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
        </select>
    )
}

