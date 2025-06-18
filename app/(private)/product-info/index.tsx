import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Container from "../../../components/Container";
import BackButton from "../../../components/BackButton";
import If from "../../../components/If";
import { Feather } from '@expo/vector-icons';
import useCreatePost from "../../../hooks/useCreatePost";
import { useRouter } from "expo-router";
import Button from "../../../components/Button";
import * as Yup from 'yup';
import { useState } from "react";
import { getValidationErrors } from "../../../utils/getValidationErrors";
import { supabase } from "../../../lib/supabase/supabase";
import { IDataPhoto } from "../../../contexts/CreatePostContext";
import getFilenameByUri from "../../../utils/getFilenameByUri";
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';

const schema = Yup.object({
  title: Yup.string().required('Preencha este campo!'),
  description: Yup.string().required('Preencha este campo!'),
  price: Yup.number()
    .required('Preencha este campo!')
    .transform((ov, va) => {
      if (ov === '') return undefined;

      return va;
    })
    .typeError('Insira um número válido!'),
  state: Yup.string().required('Preencha este campo!'),
});

export default function ProductInfoScreen() {
  const { data, setPostData, resetPostData } = useCreatePost();
  const { push } = useRouter();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNavigateToProductState = () => {
    push(`/(private)/product-state`);
  }

  const uploadPhotos = async (productId: string, photos: IDataPhoto[]) => {
    const paths: string[] = [];

    for (const photo of photos) {
      const key = `${productId}/${getFilenameByUri(photo.uri)}`;
      const fileContent = await FileSystem.readAsStringAsync(photo.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const { data, error } = await supabase.storage
        .from('products-photos')
        .upload(key, Buffer.from(fileContent, 'base64'));

      if (error) console.error(error);

      if (data) paths.push(data.path);
    }

    return paths;
  }

  const handlePublish = async () => {
    try {
      setErrors({});

      await schema.validate(
        {
          title: data?.title,
          description: data?.description,
          price: data?.price,
          state: data?.state,
        },
        {
          abortEarly: false,
        }
      );

      const { data: productId, error } = await supabase.rpc(`create_product`, {
        _title: data?.title,
        _price: Number(data?.price) || 0,
        _description: data?.description,
        _category: data?.category,
        _type: data?.type,
        _photos: [],
        _state: data?.state,
      });

      if (error) {
        console.error('Error creating product:', error);
        return;
      }

      if (productId && data?.photos?.length) {
        const photosPaths = await uploadPhotos(productId, data.photos);
        const { error } = await supabase.rpc(`update_product_photos`, {
          _product_id: productId,
          _photos: photosPaths,
        });

        if (error) {
          console.error('Error uploading photos:', error);
          return;
        }
      }

      resetPostData();

      push(`/(private)/(tabs)`);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        setErrors(errors);
      }

      console.log(err);
    }
  }

  return (
    <Container>
      <ScrollView style={styles.content} contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <BackButton color="#000" />

          <Text style={styles.headerTitle}>Mais detalhes</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Título</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setPostData({ title: text })}
            value={data?.title || ''}
          />
          <If condition={!!errors.title}>
            <Text style={styles.validation}>{errors.title}</Text>
          </If>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Descrição</Text>
          <TextInput
            style={[styles.input, { height: 150 }]}
            multiline
            numberOfLines={100}
            onChangeText={text => setPostData({ description: text })}
            value={data?.description || ''}
          />
          <If condition={!!errors.description}>
            <Text style={styles.validation}>{errors.description}</Text>
          </If>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Preço</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={text => setPostData({ price: !Number(text) ? 0 : Number(text) })}
            value={data?.price?.toString() || ''}
          />
          <If condition={!!errors.price}>
            <Text style={styles.validation}>{errors.price}</Text>
          </If>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.sectionButton} onPress={handleNavigateToProductState}>
            <Text style={styles.sectionButtonText}>Condição do produto</Text>

            <Feather name="chevron-right" size={24} color="#000" />
          </TouchableOpacity>

          <If condition={!!data?.state}>
            <View style={styles.sectionValueWrapper}>
              <View style={styles.sectionValueContainer}>
                <Text style={styles.sectionValue}>{data?.state}</Text>
              </View>
            </View>
          </If>
        </View>

        <If condition={!!errors.state}>
          <Text style={styles.validation}>{errors.state}</Text>
        </If>

        <Button style={styles.button} onPress={handlePublish}>Publicar</Button>
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
    marginTop: 20,
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
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },
  inputGroup: {
    gap: 6,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#CDCDCD',
    borderRadius: 20,
    paddingHorizontal: 20,
    textAlignVertical: 'top',
    height: Platform.OS === 'ios' ? 50 : 'auto',
  },
  button: {
    marginTop: 30,
  },
  validation: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 4,
  },
});
