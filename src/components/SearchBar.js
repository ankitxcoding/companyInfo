import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SearchBar = ({ suggestions, onSearch }) => {
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleChange = (text) => {
    setInput(text);

    if (text.trim() === "") {
      setFiltered([]);
      onSearch("");
      return;
    }

    const filteredList = suggestions.filter((s) =>
      s.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(filteredList.slice(0, 5));
    onSearch(text);
  };

  const handleSelect = (name) => {
    setInput(name);
    setFiltered([]);
    onSearch(name);
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <TextInput
        placeholder="Search company name"
        value={input}
        onChangeText={handleChange}
        style={styles.input}
      />
      {input.trim() !== "" && filtered.length > 0 && (
        <FlatList
          data={filtered}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelect(item)}
              style={styles.suggestion}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.dropdown}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "white",
  },
  suggestion: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  dropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    backgroundColor: "white",
    maxHeight: 150,
  },
});

export default SearchBar;
