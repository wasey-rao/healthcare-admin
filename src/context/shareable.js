import { useState } from 'react';

export const useShareableState = () => {
    const [query, setQuery] = useState('');

    return {
        query,
        setQuery,
    }
}