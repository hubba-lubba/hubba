import { useState } from 'react'
import SearchBar from './SearchBar';

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

    function handleSearchInput(event: any) {
        setSearch(prevSearch => ({
            ...prevSearch,
            value: event.target.value
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

    const inputProps = {
        value: search.value,
        onChange: handleSearchInput,
    }

    return (
        <SearchBar
            suggestions={sampleSuggestions}
            fetchSuggestions={fetchSearchSuggestions}
            clearSuggestions={clearSearchSuggestions}
            inputProps={inputProps} />
    )
}
