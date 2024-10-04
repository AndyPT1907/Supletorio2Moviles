import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { styles } from "../../../theme/style";
import { CommonActions, useNavigation } from "@react-navigation/native";

// Interface - Props para Opinion
interface Opinion {
  email: string;  // Propiedad "email" de la opinión
  opinion: string; // Propiedad "opinion" de la opinión
}

// Interface - Props para el componente
interface Props {
  opinion: Opinion; // Asegúrate de que "opinion" tenga las propiedades correctas
}

export const OpinionCardComponent = ({ opinion }: Props) => {
  const navigation = useNavigation();

  // Para verificar el contenido de "opinion"
  console.log(opinion); // Eliminar en producción

  return (
    <View style={styles.rootListOpinion}>
      <View>
        <Text variant="titleMedium">Email: {opinion.email}</Text>
        <Text variant="titleSmall">Opinión: {opinion.opinion}</Text>
      </View>
      <View style={styles.icon}>
        <IconButton
          icon="eye" // Cambia el icono a uno que represente "detalles"
          iconColor="#000"
          size={25}
          mode="contained"
          onPress={() =>
            navigation.dispatch(CommonActions.navigate({ name: 'Detail', params: { opinion } }))
          }
        />
      </View>
    </View>
  );
};
