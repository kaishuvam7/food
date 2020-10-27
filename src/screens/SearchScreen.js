import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ResultsList from '../components/ResultsList';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';

const SearchScreen = (navigation) => {
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage] = useResults();

    const filterResultsByPrice = (price) => {
        return results.filter(result => {
            return result.price === price;
        });
    };

    return <>
        <SearchBar
            term={term}
            onTermChange={setTerm}
            onTermSubmit={searchApi()}
        />
        {errorMessage ? <Text>{errorMessage}</Text> : null}
        <Text>We have found {results.length} results</Text>
        <ScrollView>
            <ResultsList
                results={filterResultsByPrice('$')}
                title="Cost Effective"
                navigation={navigation}
            />
            <ResultsList
                results={filterResultsByPrice('$$')}
                title="Bit Pricier"
                navigation={navigation}
            />
            <ResultsList
                results={filterResultsByPrice('$$$')}
                title="Big Spender"
                navigation={navigation}
            />
        </ScrollView>
    </>
};

const styles = StyleSheet.create({});

export default SearchScreen;