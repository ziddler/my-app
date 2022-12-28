import { FlatList, View, TextInput, StyleSheet, SafeAreaView, Text} from 'react-native';
import { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import MemberCard from './membercard.js';
import { SearchMembersAPI } from '../../api/CustomerServiceAPI';

export default function MemberSearch ({ navigation })  {
    const [filter, setFilter] =  useState("");
    const [searchResults, setSearchResults] =  useState([]);

    const dispatch = useDispatch();
    
    const handleSearch =  () => {
        dispatch({ type: "showLoadingOverlay", value: true });
        
        const results = SearchMembersAPI(filter).then( json => setSearchResults( json ) );
        dispatch({ type: "showLoadingOverlay", value: false });
    };
    


    const item = (member) => {
        return <MemberCard key={member.item.MemberID} member={member.item} navigation={navigation} />
     };


    return (
        <SafeAreaView style={styles.containerColumn}>
            <View style={styles.background}>
                
                <View style={styles.containerIcon}>
                    <TextInput style={styles.input} value={filter} 
                        placeholder='Name, Bar#, ID, or Email' onChangeText={ (text)=>setFilter(text) }></TextInput>

                    <Ionicons name="search" size={48} color="#5158bb"  style={{marginTop: 2}}
                        onPress={ () => handleSearch() }/>
                </View>
            </View>
            
            <Text style={styles.listLabel}>RECENT MEMBERS</Text>
            <View style={{ justifyContent: 'Left', alignItems: 'stretch', maxHeight: 220}}>
                    <FlatList data={searchResults.RecentMembers} renderItem={item} keyExtractor={item => item.MemberID.toString()} />
            </View>


            <Text style={styles.listLabel}>ALL MATCHING MEMBERS</Text>
            <View style={{ justifyContent: 'Left', alignItems: 'stretch'}}>
                    <FlatList data={searchResults.Members} renderItem={item} keyExtractor={item => item.MemberID.toString()} />
            </View>
        </SafeAreaView>
    );
  }


  const styles = StyleSheet.create({
    listLabel: {
        fontSize: 24, 
        fontWeight: 'bold', 
        marginTop: 20
    },

    containerColumn: {
        flex: 1,
        flexDirection:'column',
        paddingLeft: 50,
        marginLeft: 10,
        marginRight: 10
    },

    containerIcon: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
    },

    background: {
        backgroundColor: '#00a7e1'
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        fontSize: 24,
        flex: 1,
    },


  });