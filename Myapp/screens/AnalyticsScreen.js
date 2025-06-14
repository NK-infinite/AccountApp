import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PieChart from 'react-native-pie-chart';
import { useIsFocused } from '@react-navigation/native';
import { useState } from 'react';

const AnalyticsScreen = () => {

  const isFocused = useIsFocused();
  const [Analytics, setAnalytics] = useState([]);
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const savedData = await AsyncStorage.getItem('@transactions');
        if (savedData !== null) {
          const parsed = JSON.parse(savedData);
          const validAnalytics = parsed
            .filter(item => item.id && (item.inamount || item.outamount))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
          setAnalytics(validAnalytics);
        }
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    };

    if (isFocused) {
      loadAnalytics();
    }

  }, [isFocused]);


  const { incomeTotal, expenseTotal, balance } = Analytics.reduce(
    (totals, item) => ({
      incomeTotal: totals.incomeTotal + (Number(item.inamount) || 0),
      expenseTotal: totals.expenseTotal + (Number(item.outamount) || 0),
      balance: totals.balance + (Number(item.inamount) || 0) - (Number(item.outamount) || 0)
    }),
    { incomeTotal: 0, expenseTotal: 0, balance: 0 }
  );


  const highIncome  = Math.max(
    0,
    ...Analytics.map(item => Number(item.inamount) || 0)
  );

  const lowIncome = Math.min(
    ...Analytics
    .filter(item => item.inamount)
    .map(item=>Number(item.inamount)),
    0
  )

  const highExpens = Math.max(
    0,
    ...Analytics.map(item =>Number(item.outamount) ||0)
  )

  const lowExpense = Math.min (
    0,
  ...Analytics
  .filter(item => item.outamount)
  .map(item=>Number(item.outamount))
  )


  const widthAndHeight = 155;
   const IncomePieChartseries = [
    { value: highIncome, color: '#2E7D32' },  // Deep green
    { value: highExpens, color: '#C62828' },   // Deep red
  ];
  
  const ExpensePieChartseries = [
    { value:  lowIncome, color: '#D84315' },  // Deep orange
    { value: lowExpense, color: '#6A1B9A' },  // Deep purple
  ];
return (
    <ScrollView style={{ backgroundColor: '#EAF4FF'}}>
      {/*IncomePieChart*/}
      <View style={styles.card}>

      <View>
        <Text style={styles.sectionTitleDark}>Highest:Income&Expense</Text>
      </View>
      <View style={styles.PieChart}>
        {(incomeTotal > 0 || expenseTotal > 0) ? (
          <PieChart
          widthAndHeight={widthAndHeight}
          padAngle={0.02}
          series={IncomePieChartseries}
          />
        ) : (
          <Text>No Data</Text>
        )}
        <View style={styles.PieChartdata}>
          <Text style={[styles.dataText, { color: '#2E7D32' }]}>Income: {highIncome}</Text>
            <Text style={[styles.dataText, { color: '#D84315' }]}>Expense: {highExpens}</Text>
        </View>
      </View>
        </View>

      {/*ExpensePieChart*/}
      <View style={styles.card}>
        <View>
          <Text style={styles.sectionTitleDark}>Lowest</Text>
        </View>
        <View style={styles.PieChart}>
        
          <View style={styles.PieChartdata}>
          <Text style={[styles.dataText, { color: '#C62828' }]}>Income: {lowIncome}</Text>
            <Text style={[styles.dataText, { color: '#6A1B9A' }]}>Expense: {lowExpense}</Text>
          </View>
            {(incomeTotal > 0 || expenseTotal > 0) ? (
            <PieChart
              widthAndHeight={widthAndHeight}
              padAngle={0.02}
              series={ExpensePieChartseries}
            />
          ) : (
            <Text>No Data</Text>
          )}
        </View>


      </View>

    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  card: {
   // borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    backgroundColor: '#007bff',  // Rich blue that works with #EAF4FF
    borderColor: '#fff',
     shadowColor: '#000',
    shadowOpacity: 0.05,
    elevation: 20,
  },
  PieChart: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 8,
    borderRadius: 20,
    paddingBottom: 10,
    paddingHorizontal:5,
    //marginHorizontal: 15,
    //marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  PieChartdata: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  dataText: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
  },

  
  sectionTitleDark: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFFFFF',  // White for dark background
  },
  // sectionTitle: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   textAlign: 'center',
  //   fontSize: 25,
  //   fontWeight: 'bold',
  //   marginTop: 15,
  //   color: '#1565C0',  // Blue that complements #EAF4FF
  // },
});
export default AnalyticsScreen;