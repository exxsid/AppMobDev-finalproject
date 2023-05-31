import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Center, HStack, Spinner, Heading } from "native-base";

import { AppBar } from "../components/appbar";
import color from "../constants/color";

export const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedProduct, setScannedProduct] = useState({});

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setScanned(false);
      setHasPermission(false);
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    });

    return unsubscribe;
  }, [navigation]);

  const handleBarCodeScanned = ({ type, data }) => {
    const url = `http://192.168.100.162:3000/searchById/${data}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // setScannedProduct(data[0]);
        var status = data[0].length;
        if (status == 0) {
          alert("No result found");
        } else {
          // setScannedProduct(data[0]);
          navigateToProductDetails(data[0][0]);
        }
      })
      .catch((err) => console.log(err))
      .finally(setScanned(true));
  };

  const navigateToProductDetails = (item) => {
    navigation.push("Product Details", {
      id: item.prodid,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      unit: item.unit,
      stock: item.stock_quantity,
      category: item.category,
      image: item.image,
      previousScreen: "Scan",
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>Loading</Text>;
  }

  return (
    <>
      <AppBar title="Scan" />
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Scan Again"} onPress={() => setScanned(false)} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
