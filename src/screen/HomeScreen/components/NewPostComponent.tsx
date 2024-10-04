import React, { useState } from "react";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { styles } from "../../../theme/style"; // Asegúrate de que este archivo esté correctamente definido
import { View } from "react-native";
import { push, ref, set } from "firebase/database";
import { auth, dbRealTime } from "../../../config/firebaseConfig"; // Asegúrate de que la configuración de Firebase sea correcta

// Interface - Props (propiedades)
interface Props {
  showModalNewOpinion: boolean; // Cambiado para reflejar que es para opiniones
  setShowModalNewOpinion: Function; // Función del hook state
}

// Interface - mensajes
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

// Interface - FormPost
interface FormPost {
  opinion: string;
}

export const NewPostComponent = ({
  showModalNewOpinion, // Cambiado para reflejar que es para opiniones
  setShowModalNewOpinion, // Cambiado para reflejar que es para opiniones
}: Props) => {
  // Hook useState: cambiar el estado del formulario
  const [formPost, setFormPost] = useState<FormPost>({
    opinion: "",
  });

  // Hook useState: cambiar estado del mensaje
  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });

  // Función: actualizar el estado del formulario
  const handleSetValues = (key: string, value: string) => {
    setFormPost({ ...formPost, [key]: value });
  };

  // Función: agregar las opiniones
  const handleSavePost = async () => {
    if (!formPost.opinion) {
      setShowMessage({
        visible: true,
        message: "Debes escribir tu opinión",
        color: "#FF0000",
      });
      return;
    }

    // Obtener el correo del usuario autenticado
    const email = auth.currentUser?.email;

    // Verificar si el usuario está autenticado
    if (!email) {
      setShowMessage({
        visible: true,
        message: "Debes estar autenticado para enviar una opinión",
        color: "#FF0000",
      });
      return;
    }

    // 1. Crear o redireccionar a la tabla de la bd
    const dbRef = ref(dbRealTime, 'opinions/' + auth.currentUser?.uid); // Guardar opiniones bajo el UID del usuario
    // 2. Crear una colección que agregue los datos en la dbRef
    const savePost = push(dbRef);
    // 3. Almacenar los datos en la bd
    try {
      await set(savePost, {
        opinion: formPost.opinion,
        email: email,
        
      });
      // Cerrar modal
      setShowModalNewOpinion(false); // Cambiado para reflejar que es para opiniones
      setShowMessage({
        visible: true,
        message: "Opinión enviada correctamente",
        color: "#109048",
      });
      // Reiniciar el formulario
      setFormPost({ opinion: "" });
    } catch (e) {
      console.log(e);
      setShowMessage({
        visible: true,
        message: "No se pudo enviar la opinión, inténtalo más tarde",
        color: "#FF0000",
      });
    }
  };

  return (
    <>
      <Portal>
        <Modal visible={showModalNewOpinion} contentContainerStyle={styles.modal}>
          <View style={styles.modalHeader}>
            <Text variant="headlineSmall">Nueva Opinión</Text>
            <IconButton
              icon="close-box"
              size={30}
              onPress={() => setShowModalNewOpinion(false)} // Cambiado para reflejar que es para opiniones
            />
          </View>
          <Divider />
          <TextInput
            mode="outlined"
            label="Escribe tu opinión"
            onChangeText={(value) => handleSetValues("opinion", value)}
            style={styles.input}
          />
          <Button
            icon="send"
            mode="contained"
            onPress={handleSavePost}
            style={styles.buttonNewCar}
          >
            Enviar Opinión
          </Button>
        </Modal>
        <Snackbar
          visible={showMessage.visible}
          onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
          style={{ ...styles.snackbarForm, backgroundColor: showMessage.color }}
        >
          {showMessage.message}
        </Snackbar>
      </Portal>
    </>
  );
};
