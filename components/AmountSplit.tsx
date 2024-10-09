import { currencyFormatter } from '@/helpers/currencyFormatter';
import { Participant, SplitType } from '@/types/types';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

type Props = {
    smartSplit: Participant[]
    isPercentage: boolean
}

export const AmountSplit = ({ smartSplit, isPercentage }: Props) => {
    return (
        <FlatList
            data={smartSplit}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
                <>
                    <View style={styles.participant}>
                        <Text style={styles.participantText}>{item.name}</Text>
                        <View>
                            <View style={styles.participantInput}>
                                <Text style={{ paddingRight: 5 }}>{`${isPercentage ? '%' : '£'}`}</Text>
                                <TextInput
                                    value={currencyFormatter(item.amount.toFixed())}
                                    // onChangeText={(text) => setSplit({ ...split, [item.name]: text })}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                    </View>
                </>
            )}
        />
    )
}

const styles = StyleSheet.create({
    participant: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    participantText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#333',
    },
    participantInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 10,
        width: 'auto',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
        flexDirection: 'row'
    },
});