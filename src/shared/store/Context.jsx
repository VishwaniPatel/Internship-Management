import { createContext } from "react";

const InternshipContext = createContext({
    searchTerm: '',
    setSearchTerm: () => { },
});

export default InternshipContext;