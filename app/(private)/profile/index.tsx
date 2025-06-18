import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Container from "../../../components/Container";
import BackButton from "../../../components/BackButton";
import If from "../../../components/If";
import { useCallback, useEffect, useState } from "react";
import user from '../../../assets/user 1.png';
import Button from "../../../components/Button";
import * as Yup from "yup";
import { getValidationErrors } from "../../../utils/getValidationErrors";
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from "../../../lib/supabase/supabase";
import * as FileSystem from 'expo-file-system';
import { useRouter } from "expo-router";
import { Buffer } from 'buffer';
import getFilenameByUri from "../../../utils/getFilenameByUri";

interface IPhoto {
  uri: string;
  type: string;
}

interface IFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  photo: IPhoto | null;
}

const schema = Yup.object({
  fullName: Yup.string().required('Não pode ser vazio!'),
  email: Yup.string().required('Não pode ser vazio!').email('Insira um email válido!'),
  phone: Yup.string(),
  password: Yup.string(),
});

export default function ProfileScreen() {
  const { back } = useRouter();

  const [data, setData] = useState<IFormData>({
    email: '',
    fullName: '',
    password: '',
    phone: '',
    photo: null,
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [currentProfilePic, setCurrentProfilePic] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();

      if (user?.user_metadata.profile_pic) {
        const { data } = supabase
          .storage
          .from('users-photos')
          .getPublicUrl(user?.user_metadata.profile_pic || '');

        setCurrentProfilePic(data.publicUrl);
      }

      if (user) {
        setUserId(user.id);
        setData({
          email: user.email || '',
          fullName: user.user_metadata.full_name || '',
          phone: user.user_metadata.phone || '',
          password: '',
          photo: null,
        });
      }
    }

    loadUser();
  }, []);

  const updateData = (data: Partial<IFormData>) => {
    setData(oldState => ({ ...oldState, ...data }));
  }

  const updateUserPhoto = async (photo: IPhoto) => {
    if (!userId) {
      Alert.alert('Ops...', 'Não foi possível autalizar sua foto, tente novamente mais tarde!');
      return;
    }

    const key = `${userId}/${getFilenameByUri(photo.uri)}`;
    const fileContent = await FileSystem.readAsStringAsync(photo.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const { data, error } = await supabase.storage
      .from('users-photos')
      .upload(key, Buffer.from(fileContent, 'base64'));

    if (error) console.error(error);

    return data?.path;
  }

  const handleConfirm = async () => {
    try {
      await schema.validate(data, { abortEarly: false });

      let photoPath: string | undefined;

      if (data.photo) {
        const path = await updateUserPhoto(data.photo);

        if (path) photoPath = path;
      }

      const { error } = await supabase.auth.updateUser({
        email: data.email,
        data: {
          full_name: data.fullName,
          phone: data.phone,
          profile_pic: photoPath,
        },
        password: data.password || undefined,
      });

      if (error) {
        Alert.alert('Ops...', error.message);
        return;
      }

      back();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        setErrors(errors);
      }

      console.log(err);
    }
  }

  const openImageLibrary = async () => {
    const {
      granted,
    } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (!granted) {
      const request = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!request.granted) {
        Alert.alert('Permissão necessária!', 'Permita o app a acessar sua biblioteca para continuar!');
        return;
      }
    }

    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: .5,
      allowsMultipleSelection: false,
      allowsEditing: true,
    });

    if (response.canceled || !response.assets) return;

    const [photo] = response.assets;

    updateData({
      photo: {
        type: photo.mimeType || 'jpeg',
        uri: photo.uri,
      }
    });
  }

  const openCamera = async () => {
    const {
      granted,
    } = await ImagePicker.getCameraPermissionsAsync();

    if (!granted) {
      const request = await ImagePicker.requestCameraPermissionsAsync();

      if (!request.granted) {
        Alert.alert('Permissão necessária!', 'Permita o app a acessar sua camera para continuar!');
        return;
      }
    }

    const response = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: .8,
      allowsMultipleSelection: false,
      allowsEditing: true,
    });

    if (response.canceled || !response.assets) return;

    const [photo] = response.assets;

    updateData({
      photo: {
        type: photo.mimeType || 'jpeg',
        uri: photo.uri,
      }
    });
  }

  const handleProfilePic = () => {
    Alert.alert(
      'Escolha uma opção',
      'Selecione como quer prosseguir...',
      [
        { text: 'Cancelar' },
        {
          text: 'Abrir galeria',
          onPress: openImageLibrary,
        },
        {
          text: 'Tirar foto',
          onPress: openCamera,
        }
      ]
    );
  }

  return (
    <Container>
      <ScrollView style={styles.content} contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <BackButton color="#000" />

          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        <View style={styles.profilePicContainer}>
          <TouchableOpacity style={styles.profilePic} onPress={handleProfilePic}>
            <Image
              style={!!data.photo?.uri || currentProfilePic ? { width: styles.profilePic.width, height: styles.profilePic.height } : {}}
              source={!!data.photo?.uri || currentProfilePic ? data.photo || { uri: currentProfilePic } : user}
              borderRadius={!!data.photo?.uri || currentProfilePic ? 80 : 0}
            />

            <View style={styles.editIcon}>
              <Feather name="edit" size={18} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nome completo</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => updateData({ fullName: text })}
            value={data.fullName}
            autoCapitalize="words"
          />
          <If condition={!!errors.fullName}>
            <Text style={styles.validation}>{errors.fullName}</Text>
          </If>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => updateData({ email: text })}
            value={data.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <If condition={!!errors.email}>
            <Text style={styles.validation}>{errors.email}</Text>
          </If>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Telefone</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => updateData({ phone: text })}
            value={data.phone}
            keyboardType="numeric"
            autoCapitalize="none"
          />
          <If condition={!!errors.phone}>
            <Text style={styles.validation}>{errors.phone}</Text>
          </If>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Alterar senha</Text>
          <View style={styles.inputPasswordWrapper}>
            <TextInput
              style={styles.inputPassword}
              onChangeText={text => updateData({ password: text })}
              value={data.password}
              autoCapitalize="none"
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
              style={styles.togglePasswordButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Feather name={showPassword ? 'eye-off' : 'eye'} size={18} color="#000" />
            </TouchableOpacity>
          </View>
          <If condition={!!errors.password}>
            <Text style={styles.validation}>{errors.password}</Text>
          </If>
        </View>

        <Button style={styles.button} onPress={handleConfirm}>Confirmar</Button>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
    paddingVertical: 22,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000'
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  inputGroup: {
    gap: 6,
    marginTop: 20,
  },
  inputPasswordWrapper: {
    backgroundColor: '#CDCDCD',
    borderRadius: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputPassword: {
    flex: 1,
    height: 50,
  },
  togglePasswordButton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  input: {
    backgroundColor: '#CDCDCD',
    borderRadius: 20,
    paddingHorizontal: 20,
    textAlignVertical: 'top',
    height: Platform.OS === 'ios' ? 50 : 'auto',
  },
  profilePicContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 80,
  },
  profilePic: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CDCDCD',
  },
  editIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
    right: 10,
    backgroundColor: '#CDCDCD',
    borderRadius: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black'
  },
  validation: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    marginTop: 40,
  }
})
