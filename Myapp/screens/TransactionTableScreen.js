import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Header } from '@react-navigation/stack';

const TransactionTableScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  // Load transactions from storage
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const savedData = await AsyncStorage.getItem('@transactions');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          // Filter out any invalid entries and sort by date (newest first)
          const validTransactions = parsedData
            .filter(item => item?.id && (item.inamount || item.outamount))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
          setTransactions(validTransactions);
        }
      } catch (error) {
        console.error('Error loading transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) loadTransactions();
  }, [isFocused]);

  // Calculate totals
  const { incomeTotal, expenseTotal, balance } = transactions.reduce(
    (totals, item) => ({
      incomeTotal: totals.incomeTotal + (Number(item.inamount) || 0),
      expenseTotal: totals.expenseTotal + (Number(item.outamount) || 0),
      balance: totals.balance + (Number(item.inamount) || 0) - (Number(item.outamount) || 0)
    }),
    { incomeTotal: 0, expenseTotal: 0, balance: 0 }
  );

  // Format datetime display
  const formatDateTime = (datetime) => {
    if (!datetime) return 'No date';
    const date = new Date(datetime);
    return date.toLocaleString(); // This will display date and time in local format
  };

  return (
    <View style={{ flex: 1, }}>
      <View style={styles.HeaderBG}>

        <View style={styles.Headers}>
          <Text style={{ color: 'green', fontSize: 20 }}>TotalIncome: {incomeTotal}</Text>
          <Text style={{ color: 'red', fontSize: 20 }}>TotalExpense: {expenseTotal}</Text>
        </View>
        <Text style={styles.Balance}>Balance: {balance}</Text>
      </View>

      <View style={{ flex: 1, backgroundColor: '#EAF4FF', borderTopWidth: 1 }}>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
            <View style={styles.FlatList}>

              {/*Income*/}
              {
                item.insource ?
                  (<View style={styles.IncomeExpense}>
                    <Text style={{ color: 'green', marginBottom: 4,fontSize:17}}>Income: {item.insource} </Text>
                    <Text style={{ color: 'green' ,fontSize:17}}>IncomeAmount: {item.inamount}</Text>
                  </View>)
                  :
                  null
              }
              {/* Expense */}
              {  item.outamount ?
              (
                <View style={styles.IncomeExpense}>
                <Text style={{ color: 'red', marginBottom: 4 ,fontSize:17}}>Expense: {item.outsource}</Text>
                <Text style={{ color: 'red',fontSize:17 }}>ExpenseAmount: {item.outamount}</Text>
              </View>
              )  
                : null
                }

              <View style={styles.edit}>
                <View style={styles.datetime}>
                  <Text style={styles.Datatimetext}>Datetime: {formatDateTime(item.datetime)}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate('EditTransactionScreen', { transaction: item })}
                >

                  <Text
                    style={styles.edittext}
                    >
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
                </View>
          )}
        />
      </View>
    </View>
  );
};

// Styles (keeping your original styles exactly the same)
const styles = StyleSheet.create({
  HeaderBG: {
    backgroundColor: 'white',
    //borderWidth: 1,
    //borderRadius: 20,
    //margin: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  Headers: {
    fontSize: 24,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'space-around',
    textAlign: 'center',
    marginVertical: 10,
  },
  Balance: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 15,
  },

  FlatList: {
    flex: 1,
    fontSize: 18,
    flexDirection: 'column',
    justifyContent: 'space-around',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 5,
    margin: 10,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  IncomeExpense: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  edit: {
    flex: 1,
    color: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 0.5,
  },
  edittext: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  datetime: {
    color: '#555',
    fontSize: 14,
    marginTop: 5,
  },
  Datatimetext: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 10,
  },
});

export default TransactionTableScreen;