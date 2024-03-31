import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import SearchBar, { searchContainer } from './SearchBar';
import { RenderInputComponentProps, InputProps } from 'react-autosuggest';

const sampleSuggestions = [
    {
        title: 'Channels',
        recs: [
            { name: 'iscii gaming' },
            { name: 'eddie gaming' },
            { name: 'jackey gaming' },
        ],
    },
    {
        title: 'Events',
        recs: [{ name: 'kevin events' }, { name: 'jing events' }],
    },
    {
        title: 'Orgs',
        recs: [{ name: 'brittany orgs' }],
    },
];

export default function NavbarSearchBar() {
    const [search, setSearch] = useState({
        value: '',
        suggestions: sampleSuggestions,
    });

    function handleSearchInput(event: React.FormEvent) {
        setSearch((prevSearch) => ({
            ...prevSearch,
            value: (event.target as HTMLInputElement).value,
        }));
    }

    //customize this function to determine the suggestions that pop up
    function fetchSearchSuggestions() {
        setSearch((prevSearch) => ({
            ...prevSearch,
            suggestions: sampleSuggestions,
        }));
    }

    function clearSearchSuggestions() {
        setSearch((prevSearch) => ({
            ...prevSearch,
            suggestions: [],
        }));
    }

    function renderInputComponent(inputProps: RenderInputComponentProps) {
        return (
            <div className="flex w-full flex-row">
                {/* click to search later */}
                <BsSearch
                    size={36}
                    className="inline rounded-l bg-gray-700 p-[8px]"
                />
                <input {...inputProps} />
            </div>
        );
    }

    function renderSuggestionsContainer(NavbarSearch: searchContainer) {
        const { containerProps, children } = NavbarSearch;
        return (
            <div
                {...containerProps}
                className="h-full w-full rounded bg-gray-800"
            >
                {children}
            </div>
        );
    }

    const inputProps: InputProps<object> = {
        value: search.value,
        onChange: handleSearchInput,
        placeholder: 'Search for streamers, events, or orgs',
        className: 'bg-gray-700 w-full h-[36px] rounded-r inline',
    };

    return (
        <SearchBar
            suggestions={sampleSuggestions}
            fetchSuggestions={fetchSearchSuggestions}
            clearSuggestions={clearSearchSuggestions}
            renderSuggestionsContainer={renderSuggestionsContainer}
            renderInputComponent={renderInputComponent}
            inputProps={inputProps}
        />
    );
}
