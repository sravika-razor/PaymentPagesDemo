import { React , useState , useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, ToastAndroid , ActivityIndicator} from "react-native";
import Clipboard from "@react-native-community/clipboard";
import Buttons from "./Buttons";
import Notes from "./Notes";
import ExpiryDate from "./ExpiryDate";
import StatusSwitch from "./StatusSwitch";
import { TouchableOpacity } from "react-native-gesture-handler";

const Info = () => {
  const [isLoading, setIsLoading] = useState(true);
  // const [page, setPage] = useState(null);

  const page = {
    id: "https://rzp.io/l/1YvFPYP",
    page_title: "Sample",
    page_status: "active",
    payment_page_id: "pl_M6WJ4PVMGh16kD",
    created_by: "sravikalinga@gmail.com",
    created_on: "26 Jun 2023",
    expires_on: "No Expiry",
    notes: [],
    revenue: 0,
    price: 5000,
    units_sold: 0,
  };

  const copyToClipboard = () => {
    Clipboard.setString(page.id);
    ToastAndroid.show("Copied", ToastAndroid.SHORT);
  };

  const pageInfo = [
    {
      label: "Page URL",
      value: (
        <View>
          <Text>{page.id}</Text>
          <TouchableOpacity onPress={copyToClipboard()} style={styles.copy}>
            <Text>Copy</Text>
          </TouchableOpacity>
        </View>
      ),
      id: "1",
    },
    {
      label: "Page Status",
      value: <StatusSwitch status={page.page_status} />,
      id: "2",
    },
    {
      label: "Payment Page ID",
      value: <Text>{page.payment_page_id}</Text>,
      id: "3",
    },
    { label: "Created By", value: <Text>{page.created_by}</Text>, id: "4" },
    { label: "Created On", value: <Text>{page.created_on}</Text>, id: "5" },
    {
      label: "Expires On",
      value: <ExpiryDate expiryDate={page.expires_on} />,
      id: "6",
    },
    { label: "Notes", value: <Notes notes={page.notes} />, id: "7" },
  ];

  const amountInfo = [
    { label: "Revenue", value: <Text>₹{page.revenue}</Text>, id: "1" },
    { label: "Price", value: <Text>₹{page.price}</Text>, id: "2" },
    { label: "Units Sold", value: page.units_sold, id: "3" },
  ];

  const renderPageInfo = () => {
    return (
      <View style={styles.table}>
        {pageInfo.map((item) => (
          <View style={styles.pair} key={item.id}>
            <View style={styles.label}>
              <Text style={styles.label_text}>{item.label}</Text>
            </View>
            <View style={styles.value}>{item.value}</View>
          </View>
        ))}
      </View>
    );
  };

  const renderAmountInfo = () => {
    return (
      <View style={styles.table2}>
        {amountInfo.map((item) => (
          <View style={styles.pair2}>
            <View style={styles.label2}>
              <Text>{item.label}</Text>
            </View>
            <View style={styles.value2}>
              <Text style={{ fontWeight: "bold" }}>{item.value}</Text>
            </View>
          </View>
        ))}
        <View style={styles.pair2}>
          <Text style={{ textDecorationLine: "underline", color: "#5A96E3" }}>
            Update Stock
          </Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(page);
          }, 3000);
        });
      } catch (error) {
        console.log(error);
      } finally {
        // setPage(page);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
    {isLoading? (
      <ActivityIndicator size="large" color="gray" />
    ) : (
    
      <View style={styles.card}>
      <ScrollView>
        <View style={styles.heading}>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              {page.page_title}
            </Text>
          </View>
          <Buttons />
        </View>
        {renderPageInfo()}
        {renderAmountInfo()}
      </ScrollView>
    </View>
    )}
  </>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: { width: 1, height: 1 },
    shadowColow: "#333",
    shadowOpacity: 0.3,
  },
  heading: {
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#C0C0C0",
  },
  share_button: {
    height: 15,
    maxWidth: 25,
    color: "#4b95ed",
  },
  copy: {
    margin: 3,
    backgroundColor: "white",
    width: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  table: {
    margin: 10,
  },
  pair: {
    flexDirection: "row",
    margin: 5,
  },
  label: {
    width: "30%",
    fontWeight: "bold",
  },
  label_text: {
    fontWeight: "bold",
  },
  value: {
    marginLeft: 20,
    marginRight: 20,
  },
  value_flex: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
  },
  table2: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    maxHeight: 50,
    flexDirection: "row",
    margin: 10,
    padding: 1,
    backgroundColor: "#F0F0F0",
  },
  pair2: {
    minWidth: "19%",
    flexDirection: "column",
    margin: 5,
  },
  label2: {},
  value2: {},
});

export default Info;
