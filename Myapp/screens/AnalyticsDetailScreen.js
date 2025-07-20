import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {BarChart } from "react-native-chart-kit";
import AsyncStorage from '@react-native-async-storage/async-storage';
const AnalyticsDetailScreen = () => {


  const navigation = useNavigation();
  const route = useRoute();
  const type = route?.params?.type || 'Lowest';

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [ShowEndPicker, setShowEndPicker] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
  const loadDetailAnalytics = async () => {
    try {
      const savedData = await AsyncStorage.getItem('@transactions');
      const parsed = savedData ? JSON.parse(savedData) : [];

      const filteredData = parsed.filter(item => {
        const date = new Date(item.date);
        return date >= startDate && date <= endDate;
      });

      setFilteredTransactions(filteredData); // Save filtered data to state
    } catch (error) {
      console.log(error);
    }
  };

  loadDetailAnalytics();
}, [startDate, endDate]);



function getLabelDate(start, end) {
  const labels = [];
  const current = new Date(start);
  while (current <= end) {
    labels.push(current.toLocaleDateString());
    current.setDate(current.getDate() + 1);
  }
  return labels;
}

const labels = getLabelDate(startDate, endDate);

// Step 1: Convert to date-wise total map
const dateMap = {};
filteredTransactions.forEach(item => {
  const key = new Date(item.date).toLocaleDateString();
  if (!dateMap[key]) {
    dateMap[key] = { in: 0, out: 0 };
  }

  dateMap[key].in += Number(item.inamount || 0);
  dateMap[key].out += Number(item.outamount || 0);
});

// Step 2: Create values array
const values = labels.map(date => {
  const entry = dateMap[date] || { in: 0, out: 0 };
  return type === 'Highest' ? entry.in : entry.out;
});



  const data = {
  labels: labels,
  datasets: [
    {
      data:values
    }
  ]
};
  useLayoutEffect(() => {
    navigation.setOptions({
      title: type === 'Highest' ? 'High Income / Expense' : 'Lowest Income / Expense',
    });
  }, [navigation, type]);


  return (
    <View >
        <View style={styles.DateRange}>

      <TouchableOpacity onPress={() => setShowStartPicker(true)}>
        <Text>Start Date</Text>
      </TouchableOpacity>

      {/* <Text>Start Date: {startDate.toDateString()}</Text> */}

      {showStartPicker && (
          <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={
              
              (event, selectedDate) => {
                  setShowStartPicker(false);
                  if (selectedDate) {
                      setStartDate(selectedDate);
                    }
                }
            }
            />
        )}
        
         <TouchableOpacity onPress={() => setShowEndPicker(true)}>
        <Text>End Date</Text>
      </TouchableOpacity>

      {/* <Text>Start Date: {startDate.toDateString()}</Text> */}

      {ShowEndPicker && (
          <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={
              
              (event, selectedDate) => {
                  setShowEndPicker(false);
                  if (selectedDate) {
                      setendDate(selectedDate);
                    }
                }
            }
            />
        )}
  
    </View>
    <ScrollView horizontal={true} >

      <View style={styles.data}>
    <BarChart
        data={data}
        width={1000}
        height={270}
        yAxisLabel="₹"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        verticalLabelRotation={0}
        style={{
          borderRadius: 10,
          margin: 10,
        }}
        />
        <Text>Starting:{startDate.toLocaleString()}</Text>
     <Text>Ending:{endDate.toLocaleString()}</Text>
    </View>
        </ScrollView>
        </View>
  );
};

export default AnalyticsDetailScreen;

const styles = StyleSheet.create({
  DateRange:{
    margin:20,
    flexDirection:'row',
    justifyContent:'space-around',
  },
data:{

    fontSize:20,
    margin:20,
    padding:20,
}
});
