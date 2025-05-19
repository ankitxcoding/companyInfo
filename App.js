import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import CompanyForm from "./src/components/CompanyForm";
import CompanyList from "./src/components/CompanyList";
import SearchBar from "./src/components/SearchBar";

export default function App() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 1;

  const addCompany = (company) => {
    setCompanies([...companies, { id: uuidv4(), ...company }]);
    setCurrentPage(1);
  };

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCompanies = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Company Details</Text>
      <CompanyForm onAdd={addCompany} />
      {companies.length > 0 && (
        <SearchBar
          suggestions={companies.map((c) => c.name)}
          onSearch={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
        />
      )}
      <CompanyList
        companies={paginatedCompanies}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
