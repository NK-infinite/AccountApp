import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { showErrorCSS } from 'react-native-svg/lib/typescript/deprecated';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const EditTransactionScreen = ({ route, navigation }) => {
  
  const { transaction } = route.params;
  const [inamount, setInamount] = useState(transaction.inamount ? transaction.inamount.toString() : '');
  const [outamount, setOutamount] = useState(transaction.outamount ? transaction.outamount.toString() : '');
  const [datetime, setDatetime] = useState(new Date(transaction.datetime || Date().toString()));
  const [datePicker, setdatePicker] = useState(false);
  const [TimePicker, setTimePicker] = useState(false);

  const updateTransaction = async () => {
    try {
      // Validate inputs
      if (!inamount && !outamount) {
        Alert.alert('Error', 'Please enter at least one amount');
        return;
      }

      const storedData = await AsyncStorage.getItem('@transactions');
      const parsed = storedData ? JSON.parse(storedData) : [];

      const updated = parsed.map(item =>
        item.id === transaction.id
          ? {
            ...item,
            inamount: inamount ? parseFloat(inamount) : 0,
            outamount: outamount ? parseFloat(outamount) : 0,
            datetime: datetime ? datetime.toISOString() : null,

          }
          : item
      );

      await AsyncStorage.setItem('@transactions', JSON.stringify(updated));
      Alert.alert('Success', 'Transaction updated!');
      navigation.goBack();
    } catch (error) {
      console.error('Update Error:', error);
      Alert.alert('Error', 'Failed to update transaction');
    }
  };

  const deleteTransaction = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this transaction?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const storedData = await AsyncStorage.getItem('@transactions');
              const parsed = storedData ? JSON.parse(storedData) : [];
              const filtered = parsed.filter(item => item.id !== transaction.id);
              await AsyncStorage.setItem('@transactions', JSON.stringify(filtered));
              Alert.alert('Deleted', 'Transaction removed.');
              navigation.goBack();
            } catch (error) {
              console.error('Delete Error:', error);
              Alert.alert('Error', 'Failed to delete transaction');
            }
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Edit Transaction</Text>
       */}
      <View style={styles.transactionInfo}>
        <View style={styles.infoColumn}>
          <Text style={styles.infoText}>Income Source: {transaction.insource || '-'}</Text>
          <Text style={styles.infoText}>Income Amount: {transaction.inamount || '-'}</Text>
         <Text>Datetime: {transaction.datetime ? new Date(transaction.datetime).toLocaleString(): null}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoText}>Expense Source: {transaction.outsource || '-'}</Text>
          <Text style={styles.infoText}>Expense Amount: {transaction.outamount || '-'}</Text>
        </View>
      </View>
      {transaction.inamount && (
        <TextInput
          placeholder="New Income Amount"
          keyboardType="numeric"
          value={inamount}
          onChangeText={setInamount}
          style={styles.input}
        />
      )}

      {transaction.outamount && (
        <TextInput
          placeholder="New Expense Amount"
          keyboardType="numeric"
          value={outamount}
          onChangeText={setOutamount}
          style={styles.input}
        />

      )}

<View style={{flexDirection:'row', justifyContent:'space-evenly'}}>

     
<TouchableOpacity
  onPress={() => setdatePicker(true)}
  style={styles.datetimebutton}
  >
<Text style={{fontSize:17,color:'white'}}>Change Date</Text>
</TouchableOpacity>

<TouchableOpacity 
    style={styles.datetimebutton}
    onPress={() => setTimePicker(true)}
    
>

  <Text style={{fontSize:17,color:'white'}}>Change Time</Text>
</TouchableOpacity>
  </View>


{datePicker && (
  <DateTimePicker
    value={datetime}
    mode={'date'}
   
    onChange={(event, selectedDate) => {
      setdatePicker(false)
  if (selectedDate) {
    
    const newDate = new Date(datetime);
    newDate.setFullYear(selectedDate.getFullYear());
    newDate.setMonth(selectedDate.getMonth());
    newDate.setDate(selectedDate.getDate());
    
    // newDate.setHours(selectedDate.getHours());
    // newDate.setMinutes(selectedDate.getMinutes());
    
    setDatetime(newDate);
  }
      
    }}
  />
)}
{
  TimePicker && (
    <DateTimePicker 
    value={datetime}
    mode='time'
    onChange={(event ,selectedtime)=>{

      setTimePicker(false)
      if (selectedtime) {
        const newtime = new Date(datetime);
        newtime.setHours(selectedtime.getHours());
        newtime.setMinutes(selectedtime.getMinutes());
        setDatetime(newtime);
      }
    }}
    />
  )
}


     <View style={styles.buttonContainer}>
        <Button
          title="Update Transaction"
          onPress={updateTransaction}
          color="#4CAF50"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Delete Transaction"
          onPress={deleteTransaction}
          color="#F44336"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#EAF4FF'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  transactionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  infoColumn: {
    flex: 1,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginVertical: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },

  datetimebutton:{
  alignItems:'center',
   margin:15,
   padding:13,
   backgroundColor:'black',
   borderRadius:20,
   }
});

export default EditTransactionScreen;