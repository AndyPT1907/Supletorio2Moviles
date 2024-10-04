import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Snackbar, Text } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "../../theme/style";


// Interface - Props para Opinion
interface Opinion {
  email: string;  // Propiedad "email" de la opinión
  opinion: string; // Propiedad "opinion" de la opinión
}

export const DetailOpinionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Extraer la opinión pasada como parámetro
  //@ts-ignore
  const { opinion } = route.params; 

  // Estado para mostrar un mensaje si es necesario
  const [showMessage, setShowMessage] = useState({
    visible: false,
    message: "",
    color: "#fff",
  });

  // Verifica si la opinión está definida
  useEffect(() => {
    if (!opinion) {
      setShowMessage({
        visible: true,
        message: "No se encontró la opinión.",
        color: "#FF0000",
      });
    }
  }, [opinion]);

  return (
    <>
      <View style={styles.rootDetail}>
        <Text  variant="titleLarge">
          Detalles de la Opinión
        </Text>
        <View>
          <Text variant="titleMedium">Email: {opinion.email}</Text>
          <Text variant="titleSmall">Opinión: {opinion.opinion}</Text>
        </View>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()} // Volver a la pantalla anterior
          style={styles.button}
        >
          Volver
        </Button>
      </View>
      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ ...styles.snackbarForm, backgroundColor: showMessage.color }}
      >
        {showMessage.message}
      </Snackbar>
    </>
  );
};
