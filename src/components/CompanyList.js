import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CompanyList = ({ companies, currentPage, totalPages, onPageChange }) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text>📍 {item.address}</Text>
      <Text>📧 {item.email}</Text>
      <Text>📞 {item.mobile}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {companies.length === 0 ? (
        <Text style={styles.emptyText}>No companies found</Text>
      ) : (
        <FlatList
          data={companies}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
      {totalPages > 1 && (
        <View style={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => onPageChange(i + 1)}
              style={[
                styles.pageButton,
                currentPage === i + 1 && styles.pageActive,
              ]}
            >
              <Text style={styles.pageText}>{i + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    backgroundColor: "white",
    borderRadius: 6,
    marginBottom: 10,
    elevation: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    flexWrap: "wrap",
    paddingBottom: 25,
  },
  pageButton: {
    marginHorizontal: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#ccc",
    borderRadius: 4,
  },
  pageActive: {
    backgroundColor: "#007bff",
  },
  pageText: {
    color: "#fff",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 10,
  },
});

export default CompanyList;
