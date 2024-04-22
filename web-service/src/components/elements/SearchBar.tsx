// // autosuggest is no longer maintained and old (hence the errors). switch to DownshiftJS
// import Autosuggest from 'react-autosuggest';
// import {
//     RenderInputComponent,
//     InputProps,
//     RenderSuggestionsContainer,
// } from 'react-autosuggest';

// export type searchContainer = {
//     containerProps: object;
//     children: React.ReactNode;
// };

// type searchBarProps = {
//     inputProps: InputProps<{ name: string }>;
//     suggestions: { title: string; recs: { name: string }[] }[];
//     fetchSuggestions: () => void;
//     clearSuggestions: () => void;
//     renderInputComponent: RenderInputComponent;
//     renderSuggestionsContainer: RenderSuggestionsContainer;
//     /*
//     renderInputComponent: (inputProps: searchBarExternalProps) => React.ReactNode;
//     renderSuggestionsContainer: (search: searchContainer) => React.ReactNode;
//      */
// };

// function getSuggestionValue(suggestion: { name: string }) {
//     return suggestion.name;
// }

// function renderSuggestion(suggestion: { name: string }) {
//     return <span className="p-1">{suggestion.name}</span>;
// }

// function renderSectionTitle(section: { title: string }) {
//     return <small className="p-1">{section.title}</small>;
// }

// function getSectionSuggestions(section: { recs: { name: string }[] }) {
//     return section.recs;
// }

// export default function SearchBar(props: searchBarProps) {
//     return (
//         <Autosuggest
//             multiSection={true}
//             suggestions={props.suggestions}
//             onSuggestionsFetchRequested={props.fetchSuggestions}
//             onSuggestionsClearRequested={props.clearSuggestions}
//             getSuggestionValue={getSuggestionValue}
//             getSectionSuggestions={getSectionSuggestions}
//             renderSuggestion={renderSuggestion}
//             renderSectionTitle={renderSectionTitle}
//             renderInputComponent={props.renderInputComponent}
//             renderSuggestionsContainer={props.renderSuggestionsContainer}
//             inputProps={props.inputProps}
//         />
//     );
// }
