import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MemberDetailsAPI, MemberCreditsAPI, MemberUnlimitedAPI, MemberBundlesAPI } from '../../api/CustomerServiceAPI.js'
import { useDispatch } from 'react-redux';

export default function MemberCard(props)  {
    const member = props["member"];
    const navigation = props["navigation"];

    const dispatch = useDispatch();

    const handlePress = (memberId) => {
        dispatch({ type: "showLoadingOverlay", value: true });


        const resultsCredits = MemberCreditsAPI(memberId).then( json => {
            dispatch({type: "setMemberCredits", value: JSON.parse(json) });
        });

        const resultsUnlimited = MemberUnlimitedAPI(memberId).then( json => {
            dispatch({type: "setMemberUnlimited", value: JSON.parse(json) });
        });

        const resultsBundles = MemberBundlesAPI(memberId).then( json => {
            dispatch({type: "setMemberBundles", value: JSON.parse(json) });

            const results = MemberDetailsAPI(memberId).then( json => {
                dispatch({type: "setMember", value: json});
                dispatch({ type: "showLoadingOverlay", value: false });
                navigation.navigate('MemberDetails');
            });
        });

    }

    return (
        <View style={styles.item}> 
            <TouchableOpacity onLongPress={ () => alert(1)} onPress={ () => handlePress(member.MemberID)} activeOpacity={0.6}>

                <View style={{ flexDirection: 'row', border: 1, flexWrap:'wrap', flex: 1, marginLeft: 20 }}> 
                    <View style={{ width: 100, padding: 10, paddingBottom: 0, textAlign: 'left'}}>
                        <Text style={{ textAlign: 'left', border: 1, fontSize: 20, fontWeight: 'bold'}}>{member.MemberID}</Text>
                    </View>
                    <View style={{ width: 230, padding: 10, paddingBottom: 0, marginLeft: 20}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{member.LastName}, {member.FirstName}</Text>
                    </View>
                    <View style={{ width: 300, padding: 10, paddingBottom: 0}}>
                        <Text style={{ fontSize: 18}}>{member.Email}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', paddingTop: 0, border: 1, flexWrap:'wrap', alignContent: 'stretch', alignSelf: 'stretch'}}> 
                    <View style={{padding: 10, flexDirection: 'row', flex: 1, marginLeft: 20}}>
                        {member.Bars.map((bar) => {
                            return (<View key={bar.BarID} style={{ paddingRight: 30}}><Text>{bar.State}: [{bar.Number}] </Text></View>) })}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    item: {
        flexDirection: 'column', 
        marginBottom: 10, 
        border: 1, 
        backgroundColor: 'lightgray', 
        flexWrap:'wrap',
        borderBottomWidth: 1, 
        borderColor: 'gray', 
        alignSelf: 'stretch', 
        alignContent: 'stretch',
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