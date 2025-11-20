interface SearchInputProps {
    onSearch: (searchTerm: string) => void
}

export const SearchInput = ({ onSearch }: SearchInputProps) => {
    return (
        <input type="text" name="searchinput" id="search"  placeholder="Search by name" onChange={(e) => onSearch(e.target.value)} className='w-80 px-3 py-2  border border-gray-300 rounded-md' />
    )
}