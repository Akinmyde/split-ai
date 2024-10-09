import { AmountSplit } from '@/components/AmountSplit';
import { databse } from '@/database';
import { currencyFormatter } from '@/helpers/currencyFormatter';
import { Participant, SplitOptions, SplitType } from '@/types/types';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [amount, setAmount] = useState<string>('');
  const [smartSplit, setSmartSplit] = useState<Participant[]>(databse);

  const [splitType, setSplitType] = useState<SplitType>('equal');
  const [open, setOpen] = useState<boolean>(false);

  const [items, setItems] = useState<SplitOptions[]>([
    { label: 'Equal Split', value: 'equal' },
    { label: 'Percentage-Based Split', value: 'percentage' },
    { label: 'Debt-Reduction Split', value: 'debt' },
    { label: 'Income-Based Split', value: 'income' },
  ]);

  // Smart split strategies
  const calculateSmartSplit = (
    totalAmount: number,
    participants: Participant[],
  ) => {
    let suggestedSplit;

    switch (splitType) {
      case 'equal':
        suggestedSplit = participants.map(participant => {
          return { ...participant, amount: (totalAmount / participants.length) }
        })
        break;

      case 'percentage':
        suggestedSplit = participants.map(participant => {
          return { ...participant, amount: 25 }
        })
        break;

      case 'expense':
        const totalExpenses = totalAmount
        suggestedSplit = participants.map(participant => {
          const share = totalAmount * (participant.expense / totalExpenses);
          return { ...participant, amount: share }
        })
        break;

      case 'debt':
        const totalDebts = participants.reduce((sum, participant) => sum + participant.debt, 0);
        suggestedSplit = participants.map(participant => {
          const share = (participant.debt / totalDebts) * totalAmount;
          return { ...participant, amount: share }
        })
        break;

      case 'income':
        const totalIncome = participants.reduce((sum, participant) => sum + participant.income, 0);

        // Step 2: Calculate each participant's share based on income proportion
        suggestedSplit = participants.map(participant => {
          const incomeShare = participant.income / totalIncome; // Higher income gets a higher proportion
          const participantAmount = incomeShare * totalAmount; // Amount proportional to income
          return { ...participant, amount: participantAmount }; // Rounded to 2 decimals
        });

      default:
        break;
    }

    return suggestedSplit;
  };

  const handleSplitTypeChange = (): any => {
    let totalAmount = Number(amount.replaceAll(',', ''))
    const result = calculateSmartSplit(totalAmount, databse) as Participant[];
    setSmartSplit(result);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Smart Payment Splitting</Text>
      <Text>How much?</Text>
      <View style={styles.input}>
        <Text style={{ padding: 5 }}>£</Text>
        <TextInput
          placeholder="Enter total amount"
          keyboardType="numeric"
          value={currencyFormatter(amount)}
          onChangeText={setAmount}
          placeholderTextColor="#aaa"
        />
      </View>

      <Text>Change Split type</Text>
      <DropDownPicker
        open={open}
        value={splitType}
        items={items}
        setOpen={setOpen}
        setValue={setSplitType}
        setItems={setItems}
        style={styles.dropdown}
        placeholder="Select Split Type"
      />
      <View style={styles.buttonContainer}>
        <Button title="Suggest Smart Split" color="#6200ee" onPress={handleSplitTypeChange} />
      </View>
      <AmountSplit isPercentage={splitType === 'percentage'} smartSplit={smartSplit} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
    flexDirection: 'row'
  },
  dropdown: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
});