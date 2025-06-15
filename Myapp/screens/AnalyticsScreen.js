import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PieChart from 'react-native-pie-chart';
import { useIsFocused } from '@react-navigation/native';
import AnalyticsDetailScreen from './AnalyticsDetailScreen'
import { useNavigation } from '@react-navigation/native';
const AnalyticsScreen = () => {
  const isFocused = useIsFocused();
  const [Analytics, setAnalytics] = useState([]);
const navigation = useNavigation();
  const l = 'Lowest';
  const h = 'Highest';
   
 
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const savedData = await AsyncStorage.getItem('@transactions');
        const parsed = savedData ? JSON.parse(savedData) : [];
        const validAnalytics = parsed
          .filter(item => item.id && (item.inamount || item.outamount))
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setAnalytics(validAnalytics);
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

  
  const incomeValues = Analytics
  .filter(item => item.inamount).
  map(item => Number(item.inamount));


  const expenseValues = Analytics
  .filter(item => item.outamount)
  .map(item => Number(item.outamount));

  const highIncome = incomeValues.length > 0 ? Math.max(...incomeValues) : 0;
  const lowIncome = incomeValues.length > 0 ? Math.min(...incomeValues) : 0;

  const highExpens = expenseValues.length > 0 ? Math.max(...expenseValues) : 0;
  const lowExpense = expenseValues.length > 0 ? Math.min(...expenseValues) : 0;

  const widthAndHeight = 155;

  const IncomePieChartseries = [
    { value: highIncome, color: '#2E7D32' },
    { value: highExpens, color: '#C62828' },
  ];

  const ExpensePieChartseries = [
    { value: lowIncome, color: '#D84315' },
    { value: lowExpense, color: '#6A1B9A' },
  ];

  return (
    <ScrollView style={{ backgroundColor: '#EAF4FF' }}>
      {/*IncomePieChart*/}
      <View style={styles.card}>
         <View style={{flexDirection:'row',}}>
        <Text style={styles.sectionTitleDark}>{h}</Text>
        <TouchableOpacity 
        onPress={()=>  navigation.navigate('AnalyticsDetailScreen' , {type:'Highest'})}>

        <Text style={styles.showtext}>Show</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.PieChart}>
          {(highIncome > 0 || highExpens > 0) ? (
            <PieChart
              widthAndHeight={widthAndHeight}
              padAngle={0.02}
              series={IncomePieChartseries}
            />
          ) : (
            <Text>No Data For PieChart</Text>
          )}
          <View style={styles.PieChartdata}>
            <Text style={[styles.dataText, { color: '#2E7D32' }]}>Income: {highIncome}</Text>
            <Text style={[styles.dataText, { color: '#D84315' }]}>Expense: {highExpens}</Text>
          </View>
        </View>
      </View>

      {/*ExpensePieChart*/}
      <View style={styles.card}>
        <View style={{flexDirection:'row',}}>
        <Text style={styles.sectionTitleDark}>{l}</Text>
       <TouchableOpacity 
        onPress={()=>  navigation.navigate('AnalyticsDetailScreen', {type:'Lowest'})}>

        <Text style={styles.showtext}>Show</Text>
        </TouchableOpacity>
        </View>
       
        <View style={styles.PieChart}>
          <View style={styles.PieChartdata}>
            <Text style={[styles.dataText, { color: '#C62828' }]}>Income: {lowIncome}</Text>
            <Text style={[styles.dataText, { color: '#6A1B9A' }]}>Expense: {lowExpense}</Text>
          </View>
          {(lowIncome > 0 || lowExpense > 0) ? (
            <PieChart
              widthAndHeight={widthAndHeight}
              padAngle={0.02}
              series={ExpensePieChartseries}
            />
          ) : (
            <Text>No Data For PieChart</Text>
          )}
        </View>
        <View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    margin: 10,
    backgroundColor: '#007bff',
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
    paddingHorizontal: 5,
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
    marginLeft:50,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  showtext:
    {
      textAlign:'center',
      justifyContent:'center',
       fontWeight:'bold',
       color:'white',
       marginTop:6,
       marginRight:15,
       fontSize:15
      }
  
});

export default AnalyticsScreen;
