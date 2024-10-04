import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "#e3f2fd", // Fondo suave en tonos azules
  },
  text: {
    fontSize: 25,
    fontWeight: "300",
    textAlign: "center",
    color: "#1565c0", // Azul oscuro para contraste
  },
  input: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#d32f2f", // Rojo fuerte para los botones
    width: "100%",
    borderRadius: 14,
    marginVertical: 9,
    alignItems: "center",
  },
  buttonSignOut: {
    backgroundColor: "#b71c1c", // Rojo más oscuro para Sign Out
    width: "50%",
    borderRadius: 14,
    alignItems: "center",
  },
  buttonEditProfile: {
    backgroundColor: "#1e88e5", // Azul fuerte para editar perfil
    width: "100%",
    borderRadius: 14,
    marginVertical: 9,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff", // Texto blanco para contraste
    fontSize: 18,
    fontWeight: "600",
  },
  snackbar: {
    width: "100%",
  },
  snackbarForm: {
    width: "96.5%",
  },
  textRedirect: {
    marginTop: 10,
    fontWeight: "600",
    color: "#1565c0", // Azul moderno para redirecciones
    textDecorationLine: "underline",
  },
  rootActivity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3f2fd", // Fondo suave en tonos azules
  },
  headerSignOut: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  rootHome: {
    flex: 1,
    marginHorizontal: 25,
    marginVertical: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  icon: {
    alignItems: "flex-end",
    flex: 1,
  },
  modal: {
    margin: 15,
    padding: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    gap: 10,
  },
  rootCar: {
    marginTop: 10,
  },
  rootListCar: {
    flexDirection: "row",
    padding: 10,
    alignItems: "flex-start",
    gap: 15,
  },
  carCard: {
    flex: 1,
    backgroundColor: "#b71c1c", // Rojo oscuro para las tarjetas de autos
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1565c0", // Azul fuerte para el título del auto
  },
  carInfo: {
    fontSize: 14,
    color: "#666",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fabCar: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#e53935', // Rojo vivo para el botón flotante
  },
  rootInputCar: {
    flexDirection: 'row',
  },
  inputCar: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingHorizontal: 15,
    flex: 1,
    marginRight: 5,
  },
  buttonNewCar: {
    backgroundColor: "#d32f2f", // Rojo fuerte para agregar autos
    width: "100%",
    borderRadius: 14,
    marginVertical: 9,
    alignItems: "center",
  },
  rootDetail: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e3f2fd", // Fondo suave en tonos azules
    gap: 20,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 16,
  },
  buttonEditCar: {
    width: "50%",
    borderRadius: 14,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonProfile: {
    width: "48%",
    borderRadius: 14,
    alignItems: "center",
    marginLeft: 1.5,
    backgroundColor: "#1e88e5", // Azul fuerte para los botones del perfil
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4f63d2", // Azul oscuro para el nombre de usuario
    marginLeft: 10,
  },
  welcomeText: {
    flex: 1,
    marginLeft: 10,
    color: '#4f63d2', // Azul oscuro para el texto de bienvenida
    fontSize: 18,
    fontWeight: '500', // Grosor de fuente
  },
  editIcon: {
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
  rootBook: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  bookListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4f63d2', // Azul fuerte para el título de la lista de libros
    marginBottom: 10,
  },
  carButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1565c0', // Azul para el botón flotante
    color: '#fff', // Texto blanco
    elevation: 5,
  },
  buttonCerrarSesion: {
    backgroundColor: "#b71c1c", // Rojo oscuro para cerrar sesión
    width: "50%",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    elevation: 5,
  },
  rootListOpinion: {
    flexDirection: "row", // Muestra el contenido de la opinión y el icono en una fila
    justifyContent: "space-between", // Espacio entre el texto y el icono
    alignItems: "center", // Alinea verticalmente los elementos
    padding: 15, // Espacio interno alrededor del contenido
    marginVertical: 8, // Espacio entre las tarjetas de opiniones
    backgroundColor: "#f9f9f9", // Fondo claro para la tarjeta
    borderRadius: 10, // Bordes redondeados
    shadowColor: "#000", // Sombra para dar algo de profundidad
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de la sombra
    shadowOpacity: 0.1, // Opacidad de la sombra
    shadowRadius: 3, // Difuminado de la sombra
    elevation: 2, // Elevación para sombras en Android
  },
  
 
});
