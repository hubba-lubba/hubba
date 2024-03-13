import Autosuggest from 'react-autosuggest';

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

export default function SearchBar(props: { value: string, onChange: () => null }) {
    return (
        <Autosuggest
            multiSection={true}
            suggestions={sampleSuggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            renderSectionTitle={renderSectionTitle}
            getSectionSuggestions={getSectionSuggestions}
            inputProps={{...props}} />
    )
}
