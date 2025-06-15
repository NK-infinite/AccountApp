import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AnalyticsDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const type = route?.params?.type || 'Lowest';

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [ShowEndPicker, setShowEndPicker] = useState(false);

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
      <View style={styles.data}>
        <Text>Starting:{startDate.toLocaleString()}</Text>
     <Text>Ending:{endDate.toLocaleString()}</Text>
    </View>
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
