import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";
import { styles } from "../theme/style";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

//interface - formRegister
interface FormRegister {
  email: string;
  password: string;
  confirmPassword: string; // Nuevo campo para confirmación de contraseña
}

//interface - mensajes
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

export const RegisterScreen = () => {
  //hook useState: cambiar el estado de formulario
  const [formRegister, setformRegister] = useState<FormRegister>({
    email: "",
    password: "",
    confirmPassword: "", // Nuevo campo para confirmación de contraseña
  });

  //hook usestate: cambiar estado del mensaje
  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });

  //hook usestate: cambiar visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //hook usenavigation: permite la navegacion de un scrren a otro
  const navigation = useNavigation();

  //Funcion: actualizar el estado del formulario
  const handleSetValues = (key: string, value: string) => {
    setformRegister({ ...formRegister, [key]: value });
  };

  //Funcion: registrar usuarios
  const handleRegister = async () => {
    // Verificar que todos los campos estén llenos
    if (!formRegister.email || !formRegister.password || !formRegister.confirmPassword) {
      setShowMessage({
        visible: true,
        message: "Debes llenar todos los campos",
        color: "#FF0000",
      });
      return;
    }

    // Verificar que las contraseñas coincidan
    if (formRegister.password !== formRegister.confirmPassword) {
      setShowMessage({
        visible: true,
        message: "Las contraseñas no coinciden",
        color: "#FF0000",
      });
      return;
    }

    console.log(formRegister);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password
      );

      // Mostrar mensaje de éxito
      setShowMessage({
        visible: true,
        message: "Usuario creado con éxito",
        color: "#008000",
      });

      // Limpiar los campos del formulario
      setformRegister({
        email: "",
        password: "",
        confirmPassword: "", // Limpiar confirmación de contraseña
      });

      // Redirigir al login después de un pequeño retraso (opcional)
      setTimeout(() => {
        navigation.goBack(); // Asegúrate de que 'Login' es el nombre correcto de tu ruta
      }, 2000);

    } catch (e) {
      console.log(e);
      setShowMessage({
        visible: true,
        message: "Error al crear usuario, intente más tarde",
        color: "#FF0000",
      });
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Registrate</Text>
      <TextInput
        label="Correo Electrónico"
        mode="outlined"
        placeholder="Escribe tu Correo Electrónico"
        onChangeText={(value) => handleSetValues("email", value)}
        style={styles.input}
      />
      <TextInput
        label="Contraseña"
        mode="outlined"
        placeholder="Escribe tu Contraseña"
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        onChangeText={(value) => handleSetValues("password", value)}
        style={styles.input}
      />
      <TextInput
        label="Confirmar Contraseña" // Nuevo campo
        mode="outlined"
        placeholder="Confirma tu Contraseña"
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        onChangeText={(value) => handleSetValues("confirmPassword", value)} // Nuevo valor
        style={styles.input}
      />
      <Button
        icon="content-save"
        mode="contained"
        onPress={handleRegister}
        style={styles.button}
      >
        Registrarse
      </Button>

      <Text
        style={styles.textRedirect}
        onPress={() =>
          navigation.dispatch(CommonActions.navigate({ name: "Login" }))
        }
      >
        Si ya tienes una cuenta? Inicia Sesion Ahora!
      </Text>

      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ ...styles.snackbar, backgroundColor: showMessage.color }}
      >
        {showMessage.message}
      </Snackbar>
    </View>
  );
};
