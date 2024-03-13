import { useState } from 'react'
import SearchBar, { searchContainer, searchBarExternalProps } from './SearchBar';

const sampleSuggestions = [
    {
        title: 'Channels',
        recs: [
            { name: 'iscii gaming' },
            { name: 'eddie gaming' },
            { name: 'jackey gaming' },
        ]
    },
    {
        title: 'Events',
        recs: [
            { name: 'kevin events' },
            { name: 'jing events' },
        ]
    },
    {
        title: 'Orgs',
        recs: [
            { name: 'brittany orgs' }
        ]
    }
]

export default function NavbarSearchBar() {
    const [search, setSearch] = useState({
        value: '',
        suggestions: sampleSuggestions,
    })

    function handleSearchInput(event: React.FormEvent) {
        setSearch(prevSearch => ({
            ...prevSearch,
            value: (event.target as HTMLInputElement).value
        }))
    }

    function fetchSearchSuggestions() {
        setSearch(prevSearch => ({
            ...prevSearch,
            suggestions: sampleSuggestions
        }))
    }

    function clearSearchSuggestions() {
        setSearch(prevSearch => ({
            ...prevSearch,
            suggestions: []
        }))
    }

    function renderSuggestionsContainer(NavbarSearch: searchContainer) {
        const { containerProps, children } = NavbarSearch
        return (
            <div {...containerProps} className="bg-gray-800 w-full h-full rounded">
                {children}
            </div>
        )
    }

    const inputProps: searchBarExternalProps = {
        value: search.value,
        onChange: handleSearchInput,
        placeholder: "Search for streamers, events, or orgs",
        className: "bg-gray-700 w-full h-[36px]"
    }

    return (
        <SearchBar
            suggestions={sampleSuggestions}
            fetchSuggestions={fetchSearchSuggestions}
            clearSuggestions={clearSearchSuggestions}
            renderSuggestionsContainer={renderSuggestionsContainer}
            inputProps={inputProps} />
    )
}
