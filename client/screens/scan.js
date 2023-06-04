import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Center, HStack, Spinner, Heading } from "native-base";
import { decode as atob, encode as btoa } from "base-64";

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
      .then((prod) => {
        const arrayBufferToBase64 = (b) => {
          var binary = "";
          var bytes = new Uint8Array(b);
          var len = bytes.byteLength;
          for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          return btoa(binary);
        };

        var status = prod[0].length;

        if (status == 0) {
          alert("No result found");
        } else {
          // setScannedProduct(data[0]);
          const res = arrayBufferToBase64(prod[0][0].image.data);
          const imageURI = `data:image/jpeg;base64,${res}`;

          const newData = {
            id: prod[0][0].prodid,
            name: prod[0][0].name,
            price: prod[0][0].price,
            quantity: prod[0][0].quantity,
            unit: prod[0][0].unit,
            stock: prod[0][0].stock_quantity,
            category: prod[0][0].category,
            image: imageURI,
          };
          console.log(newData);
          navigateToProductDetails(newData);
        }
      })
      .catch((err) => console.log(err))
      .finally(setScanned(true));
  };

  const navigateToProductDetails = (item) => {
    navigation.push("Product Details", {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      unit: item.unit,
      stock: item.stock,
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
