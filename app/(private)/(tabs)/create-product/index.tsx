import { useRouter } from "expo-router";
import Container from "../../../../components/Container";
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../../../../components/Button";
import { Feather } from '@expo/vector-icons';
import useCreatePost from "../../../../hooks/useCreatePost";
import If from "../../../../components/If";
import * as ImagePicker from 'expo-image-picker';
import * as Yup from 'yup';
import { getValidationErrors } from "../../../../utils/getValidationErrors";
import { useState } from "react";

const schema = Yup.object({
  category: Yup.string().required('Escolha uma categoria!'),
  type: Yup.string().required('Escolha um tipo de postagem'),
});

export default function CreatePostScreen() {
  const { push } = useRouter();
  const { data, setPostData } = useCreatePost();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNavigateToCategories = () => {
    push(`/(private)/product-categories`);
  }

  const handleNavigateToType = () => {
    push(`/(private)/product-type`);
  }

  const handleContinue = async () => {
    try {
      setErrors({});

      await schema.validate({ category: data?.category, type: data?.type }, {
        abortEarly: false
      });

      push(`/(private)/product-info`);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        setErrors(errors);
      }

      console.log(err);
    }
  }

  const handleTakePic = () => {
    push(`/(private)/product-photo`);
  }

  const handleChoosePic = async () => {
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
    const existentPhotos = data?.photos || [];
    
    setPostData({
      photos: [
        ...existentPhotos,
        {
          format: photo.mimeType || 'jpeg',
          height: photo.height,
          width: photo.width, uri: photo.uri
        }
      ] 
    })
  }

  const handleAddPhotoPress = () => {
    Alert.alert(
      'Opções',
      'Escolha com quer continuar...',
      [
        { text: 'Cancelar' },
        { text: 'Tirar foto', onPress: handleTakePic },
        { text: 'Escolher da galeria', onPress: handleChoosePic },
      ]
    );
  }

  const handleRemovePic = (index: number) => {
    const updatedPhotos = [...(data?.photos || [])];

    updatedPhotos.splice(index, 1);

    setPostData({ photos: updatedPhotos });
  }

  const renderPic = (index: number) => {
    const photo = (data?.photos || [])[index];

    if (!photo) return <View style={styles.pic}></View>;

    return (
      <ImageBackground
        source={{ uri: photo.uri }}
        style={styles.pic}
        borderRadius={60}
      >
        <TouchableOpacity
          style={styles.removePicButton}
          onPress={() => handleRemovePic(index)}
        >
          <Feather name="trash-2" size={50} color="red" />
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  return (
    <Container>
      <ScrollView style={styles.content} contentContainerStyle={styles.container}>
        <View style={styles.header}>
          {/* <BackButton color="#000" /> */}

          <Text style={styles.headerTitle}>Criar uma postagem</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.sectionButton} onPress={handleNavigateToCategories}>
            <Text style={styles.sectionButtonText}>Categorias</Text>

            <Feather name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>

          <If condition={!!data?.category}>
            <View style={styles.sectionValueWrapper}>
              <View style={styles.sectionValueContainer}>
                <Text style={styles.sectionValue}>{data?.category}</Text>
              </View>
            </View>
          </If>
        </View>

        <If condition={!!errors.category}>
          <Text style={styles.validation}>{errors.category}</Text>
        </If>

        <View style={[styles.section, { marginTop: 20 }]}>
          <TouchableOpacity style={styles.sectionButton} onPress={handleNavigateToType}>
            <Text style={styles.sectionButtonText}>Tipo</Text>

            <Feather name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>

          <If condition={!!data?.type}>
            <View style={styles.sectionValueWrapper}>
              <View style={styles.sectionValueContainer}>
                <Text style={styles.sectionValue}>{data?.type}</Text>
              </View>
            </View>
          </If>
        </View>

        <If condition={!!errors.type}>
          <Text style={styles.validation}>{errors.type}</Text>
        </If>

        <View style={styles.picsContainer}>
          <Text style={styles.picsContainerTitle}>Fotos</Text>

          <View style={styles.pics}>
            <If
              condition={!!(data?.photos || [])[3]}
              otherwise={
                <TouchableOpacity style={styles.pic} onPress={handleAddPhotoPress}>
                  <Feather name="plus" size={40} color="#000" />
                </TouchableOpacity>
              }
            >
              {renderPic(3)}
            </If>

            {renderPic(0)}
          </View>

          <View style={styles.pics}>
            {renderPic(1)}

            {renderPic(2)}
          </View>
        </View>

        <Button onPress={handleContinue} style={styles.button}>Continue</Button>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 40
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
  section: {
    borderBottomColor: '#A9A9A9',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionButtonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  sectionValueWrapper: {
    flexDirection: 'row',
  },
  sectionValueContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#D92525',
    marginTop: 8,
    borderRadius: 8,
  },
  sectionValue: {
    fontSize: 16,
    fontWeight: 'medium',
    color: '#fff',
  },
  picsContainer: {
    flex: 1,
    marginTop: 30
  },
  picsContainerTitle: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  pics: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    marginTop: 24,
  },
  pic: {
    height: 120,
    flex: 1,
    backgroundColor: '#CDCDCD',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 40,
  },
  removePicButton: {
    opacity: .8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 60,
  },
  validation: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 4,
  },
});
