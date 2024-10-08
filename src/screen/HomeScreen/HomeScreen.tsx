import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Avatar,
  Button,
  Divider,
  FAB,
  IconButton,
  Modal,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { styles } from "../../theme/style";
import { signOut, updateProfile } from "firebase/auth";
import { auth, dbRealTime } from "../../config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";
import firebase from "firebase/auth"; 
import { onValue, ref } from "firebase/database";
import { OpinionCardComponent } from "./components/OpinionCardComponent"; 
import { NewPostComponent } from "./components/NewPostComponent"; 

// Interface - FormUser
interface FormUser {
  name: string;
}

// Interface - Opinion
export interface Opinion {
  email: string;
  opinion: string;
}

// Interface - mensajes
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

export const HomeScreen = () => {
  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });

  const navigation = useNavigation();
  const [formUser, setFormUser] = useState<FormUser>({ name: "" });
  const [userData, setUserData] = useState<firebase.User | null>(null);
  const [opinions, setOpinions] = useState<Opinion[]>([]); // Almacenamos todas las opiniones del usuario

  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);
  const [showModalNewOpinion, setShowModalNewOpinion] = useState<boolean>(false);

  useEffect(() => {
    setUserData(auth.currentUser);
    setFormUser({ name: auth.currentUser?.displayName ?? "" });
    getAllOpinions();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Login' }] }));
      setShowModalProfile(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetValues = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value });
  };

  const handleUpdateUser = async () => {
    try {
      await updateProfile(userData!, {
        displayName: formUser.name,
      });
      setShowMessage({
        visible: true,
        message: "Usuario Actualizado Correctamente",
        color: "#109048",
      });
    } catch (e) {
      console.log(e);
    }
    setShowModalProfile(false);
  };

  // Función para obtener todas las opiniones del usuario
  const getAllOpinions = () => {
    const dbRef = ref(dbRealTime, 'opinions/' + auth.currentUser?.uid);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setOpinions([]); // Si no hay datos, limpiar el array de opiniones
        return;
      }

      const listOpinions: Opinion[] = Object.keys(data).map((key) => {
        const { email, opinion } = data[key];
        return { email, opinion };
      });
      setOpinions(listOpinions); // Establecer las opiniones en el estado
    });
  };

  return (
    <>
      <View style={styles.rootHome}>
        <View style={styles.header}>
          <Avatar.Icon
            size={50}
            icon="account"
            color="#fff"
            style={{ backgroundColor: "#4f63d2" }}
          />
          <View style={styles.welcomeText}>
            <Text variant="titleMedium">Bienvenid@</Text>
            <Text variant="bodyMedium" style={styles.userName}>
              {userData?.displayName}
            </Text>
          </View>
          <IconButton
            icon="account-edit"
            iconColor="#4f63d2"
            size={30}
            onPress={() => setShowModalProfile(true)}
            style={styles.editIcon}
          />
        </View>

        <View style={styles.rootBook}>
          <Text style={styles.bookListTitle} variant="bodyLarge">
            Tus Opiniones
          </Text>
          {opinions.length > 0 ? ( // Mostrar todas las opiniones en tarjetas
            opinions.map((opinion, index) => (
              <OpinionCardComponent key={index} opinion={opinion} />
            ))
          ) : (
            <Text>No tienes opiniones registradas.</Text> // Mensaje si no hay opiniones
          )}
        </View>
      </View>

      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
          <View style={styles.modalHeader}>
            <Text variant="headlineSmall">Mi Perfil</Text>
            <IconButton
              icon="close-box"
              size={30}
              onPress={() => setShowModalProfile(false)}
            />
          </View>
          <Divider />
          <TextInput
            mode="outlined"
            label="Nombre"
            value={formUser.name}
            onChangeText={(value) => handleSetValues("name", value)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Correo"
            disabled
            value={userData?.email!}
            style={styles.input}
          />
          <View style={styles.buttonContainer}>
            <Button
              icon="book-edit"
              mode="contained"
              onPress={handleUpdateUser}
              style={[styles.buttonProfile, { backgroundColor: "#4f63d2" }]}
            >
              Actualizar Perfil
            </Button>
          </View>
        </Modal>
      </Portal>

      <View style={styles.buttonContainer}>
        <FAB
          icon="plus"
          color="white"
          style={styles.carButton}
          onPress={() => setShowModalNewOpinion(true)}
        />
        <FAB
          icon="logout"
          color="white"
          style={styles.buttonCerrarSesion}
          onPress={() => handleSignOut()}
        />
      </View>

      <NewPostComponent
        showModalNewOpinion={showModalNewOpinion}
        setShowModalNewOpinion={setShowModalNewOpinion}
      />

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
