import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity
} from 'react-native';
import styles from '../style/MangeAccountstyle';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const MangeAccountScreen = () => {
  const navigation = useNavigation();

  const [incomeSource, setIncomeSource] = useState('');
  const [spendSource, setSpendSource] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [spendAmount, setSpendAmount] = useState('');
  const [transactions, setTransactions] = useState([]);

  // Load transactions from AsyncStorage
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@transactions');
        if (jsonValue !== null) {
          setTransactions(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Failed to load transactions', e);
      }
    };
    loadTransactions();
  }, []);

  // Save transactions to AsyncStorage whenever they change
  useEffect(() => {
    const saveTransactions = async () => {
      if (transactions.length === 0) return;
      try {
        const jsonValue = JSON.stringify(transactions);
        await AsyncStorage.setItem('@transactions', jsonValue);
      } catch (e) {
        console.error('Failed to save transactions', e);
      }
    };
    saveTransactions();
  }, [transactions]);

  const handleAddTransaction = () => {
    if (!incomeSource.trim() && !spendSource.trim()) {
      alert('Please enter at least Income or Expense details');
      return;
    }

    const newTransaction = {
      id: Date.now().toString(),
      insource: incomeSource.trim(),
      inamount: parseFloat(incomeAmount) || 0,
      outsource: spendSource.trim(),
      outamount: parseFloat(spendAmount) || 0,
      datetime: new Date().toISOString()
    };

    setTransactions(prev => [...prev, newTransaction]);

    // Clear inputs
    setIncomeSource('');
    setIncomeAmount('');
    setSpendSource('');
    setSpendAmount('');
  };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.heading}>Account Management</Text> */}
      {/* Income Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Income</Text>
        <TextInput
          placeholder="Income Source"
          value={incomeSource}
          onChangeText={setIncomeSource}
          style={styles.input}
        />
        <TextInput
          placeholder="Amount"
          value={incomeAmount}
          onChangeText={setIncomeAmount}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      {/* Expense Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expense</Text>
        <TextInput
          placeholder="Expense Source"
          value={spendSource}
          onChangeText={setSpendSource}
          style={styles.input}
        />
        <TextInput
          placeholder="Amount"
          value={spendAmount}
          onChangeText={setSpendAmount}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddTransaction}

      >
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>


      {/* <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const total = item.inamount - item.outamount;
          return (
            <View style={styles.transactionItem}>
              <View style={styles.transactionRow}>
                <Text style={styles.transactionLabel}>Income:</Text>
                <Text style={styles.transactionValue}>{item.insource} (₹{item.inamount})</Text>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.transactionLabel}>Expense:</Text>
                <Text style={styles.transactionValue}>{item.outsource} (₹{item.outamount})</Text>
              </View>
              <View style={styles.transactionRow}>
                <Text style={styles.transactionLabel}>Balance:</Text>
                <Text style={[
                  styles.transactionValue,
                  total >= 0 ? styles.positive : styles.negative
                ]}>
                  ₹{total.toFixed(2)}
                </Text>
              </View>
              <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
          );
        }}
      /> */}


    </View>
  );
};

export default MangeAccountScreen;