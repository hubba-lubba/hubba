import Autosuggest from 'react-autosuggest';

type searchBarProps = {
    inputProps: {
        value: string;
        onChange: (event: any) => void;
        className?: string
        placeholder?: string
    }
    suggestions: { title: string; recs: { name: string }[] }[];
    fetchSuggestions: () => void;
    clearSuggestions: () => void;
}

function getSuggestionValue(suggestion: { name: string }) {
    return suggestion.name
}

function renderSuggestion(suggestion: { name: string }) {
    return <span>{suggestion.name}</span>
}

function renderSectionTitle(section: { title: string }) {
    return <small>{section.title}</small>
}

function getSectionSuggestions(section: { recs: { name: string }[] } ) {
    return section.recs
}

export default function SearchBar(props: searchBarProps) {

    return (
        <Autosuggest
            multiSection={true}
            suggestions={props.suggestions}
            onSuggestionsFetchRequested={props.fetchSuggestions}
            onSuggestionsClearRequested={props.clearSuggestions}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            renderSectionTitle={renderSectionTitle}
            getSectionSuggestions={getSectionSuggestions}
            inputProps={props.inputProps} />
    )
}
