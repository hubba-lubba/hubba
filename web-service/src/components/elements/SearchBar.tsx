import Autosuggest from 'react-autosuggest';

export type searchContainer = {
    containerProps: {
        value: string;
        onChange: (event: React.FormEvent) => void;
    };
    //the search suggestions
    children: React.ReactNode;
};

export type searchBarExternalProps = {
    value: string;
    onChange: (event: React.FormEvent) => void;
    className?: string; //used for the searchbar input
    placeholder?: string;
};

type searchBarProps = {
    inputProps: searchBarExternalProps;
    suggestions: { title: string; recs: { name: string }[] }[];
    fetchSuggestions: () => void;
    clearSuggestions: () => void;
    renderInputComponent?: any;
    renderSuggestionsContainer?: any;
    /*
    renderInputComponent?: (inputProps: searchBarExternalProps) => React.ReactNode;
    renderSuggestionsContainer?: (search: searchContainer) => React.ReactNode; */
};

function getSuggestionValue(suggestion: { name: string }) {
    return suggestion.name;
}

function renderSuggestion(suggestion: { name: string }) {
    return <span className="p-1">{suggestion.name}</span>;
}

function renderSectionTitle(section: { title: string }) {
    return <small className="p-1">{section.title}</small>;
}

function getSectionSuggestions(section: { recs: { name: string }[] }) {
    return section.recs;
}

export default function SearchBar(props: searchBarProps) {
    return (
        <Autosuggest
            multiSection={true}
            suggestions={props.suggestions}

            onSuggestionsFetchRequested={props.fetchSuggestions}
            onSuggestionsClearRequested={props.clearSuggestions}
            getSuggestionValue={getSuggestionValue}
            getSectionSuggestions={getSectionSuggestions}

            renderSuggestion={renderSuggestion}
            renderSectionTitle={renderSectionTitle}
            renderInputComponent={props.renderInputComponent}
            renderSuggestionsContainer={props.renderSuggestionsContainer}
            inputProps={props.inputProps}
        />
    );
}
