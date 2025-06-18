import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import Container from "../../../components/Container";
import If from "../../../components/If";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRef, useState } from "react";
import Button from "../../../components/Button";
import { Feather } from '@expo/vector-icons';
import useCreatePost from "../../../hooks/useCreatePost";
import { useRouter } from "expo-router";

export default function ProductPhotoScreen() {
  const { setPostData, data } = useCreatePost();
  const { back } = useRouter();
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const [facing, setFacing] = useState<'front' | 'back'>('back');

  const handleTakePic = async () => {
    const { granted } = await Camera.getCameraPermissionsAsync();

    if (!granted) {
      const request = await Camera.requestCameraPermissionsAsync();

      if (!request.granted) {
        Alert.alert('Permissão necessária!', 'Permita o app a usar sua camera para continuar!');
        return;
      }
    }

    const photo = await cameraRef.current?.takePictureAsync();

    if (!photo) return;

    const storedPhotos = data?.photos || [];

    setPostData({
      photos: [...storedPhotos, photo],
    });

    back();
  }

  const handleChangeFacing = () => {
    setFacing(oldState => oldState === 'back' ? 'front' : 'back');
  }

  const handleRequestCameraPermission = async () => {
    const { canAskAgain, granted } = await requestPermission();

    if (!canAskAgain) {
      Alert.alert('Sem permissão', 'Nosso aplicativo não pode mais pedir permissão para acessar a camera do seu dispositivo. Você deve permitir manualmente!');
      return;
    }

    if (!granted) {
      Alert.alert('Bloqueado', 'Para tirar uma foto você precisa permitir o uso da camera do seu dispositivo!');
      return;
    }
  }

  return (
    <Container style={styles.container}>
      <If
        condition={!!permission?.granted}
        otherwise={
          <View style={styles.notGrantedPermission}>
            <Text style={styles.notGrantedPermissionText}>Para usar sua camera permita o acesso</Text>

            <Button style={{ paddingHorizontal: 40 }} onPress={handleRequestCameraPermission}>Solicitar acesso</Button>
          </View>
        }
      >
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.invisibleContent}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.changeFacing} onPress={handleChangeFacing}>
                <Feather name="repeat" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.takePicButtonContainer}>
            <Button style={styles.takePicButton} onPress={handleTakePic}>
              <Feather name="camera" size={32} color="#fff" />
            </Button>
          </View>
        </CameraView>
      </If>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {},
  camera: {
    flex: 1,
  },
  notGrantedPermission: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  notGrantedPermissionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  notGrantedPermissionButton: {
    height: 50,
    backgroundColor: ''
  },
  notGrantedPermissionButtonText: {},
  takePicButtonContainer: {
    alignItems: 'center',
    paddingBottom: 60,
  },
  takePicButton: {
    width: '50%',
  },
  invisibleContent: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-end',
    padding: 8,
  },
  changeFacing: {
    backgroundColor: "rgba(0, 0, 0, .5)",
    padding: 8,
    borderRadius: 100,
  }
});
