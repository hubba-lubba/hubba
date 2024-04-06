// possible to import and export types from individual features here to be accessed easily from @/types? or is that bad practice

export type BaseEntity = {
    id: string;
};

// common type for named entities like users, events, orgs. might cook in the future
export type NamedEntity = {
    name: string;
    image: string;
};
