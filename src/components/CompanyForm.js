import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

const CompanyForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    email: "",
    mobile: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const validateForm = () => {
    const { name, address, email, mobile } = form;
    let errors = {};

    if (!name.trim()) {
      errors.name = "Company name is required!";
    }

    if (!address.trim()) {
      errors.address = "Address is required!";
    }

    if (!email.trim()) {
      errors.email = "Email is required!";
    }

    if (!mobile.trim()) {
      errors.mobile = "Mobile number is required!";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAdd(form);
      setForm({ name: "", address: "", email: "", mobile: "" });
      setErrors({});
    } else {
      Alert.alert("Form has errors!", "Please correct the highlighted fields.");
    }
  };

  return (
    <View style={styles.form}>
      {["name", "address", "email", "mobile"].map((field) => (
        <View key={field} style={styles.inputContainer}>
          <TextInput
            placeholder={field[0].toUpperCase() + field.slice(1)}
            style={[
              styles.input,
              errors[field] && { borderColor: "red", borderWidth: 2 },
            ]}
            value={form[field]}
            onChangeText={(text) => handleChange(field, text)}
            keyboardType={field === "email" ? "email-address" : "default"}
            autoCapitalize={
              field === "name" || field === "address" ? "words" : "none"
            }
          />
          {errors[field] && (
            <Text style={styles.errorText}>{errors[field]}</Text>
          )}
        </View>
      ))}
      <Button title="Add Company" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    borderRadius: 6,
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default CompanyForm;
