import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ScrollView: true,
    padding: 20,
    backgroundColor: '#EAF4FF' 
    // backgroundColor: '#f5f5f5'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333'
  },
  section: {
    marginBottom: 20,
 // backgroundColor: '#fff',
  borderWidth:0.2,
    padding: 15,
    borderRadius: 20,
   // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2
  },
  sectionTitle: {
    fontSize: 18,
    textAlign:'center',
    alignItems:'center',
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  transactionLabel: {
    fontWeight: 'bold',
    color: '#555'
  },
  transactionValue: {
    color: '#333'
  },
  positive: {
    color: '#28a745'
  },
  negative: {
    color: '#dc3545'
  },
  transactionDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    textAlign: 'right'
  }
});

export default styles;
