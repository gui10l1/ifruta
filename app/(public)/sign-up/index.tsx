import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Yup from 'yup';
import logo from '../../../assets/Logo.png';
import Container from '../../../components/Container';
import If from '../../../components/If';
import { getValidationErrors } from '../../../utils/getValidationErrors';
import { supabase } from '../../../lib/supabase/supabase';

const schema = Yup.object({
  fullName: Yup.string().required('Preencha este campo!'),
  email: Yup.string().required('Forneça seu email!').email('Insira um email válido!'),
  phone: Yup.string().required('Preencha este campo!'),
  password: Yup.string().required('Preencha este campo!'),
});

export default function SignUpScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const passwordInputRef = useRef<TextInput>(null);

  const handleFormSubmit = async () => {
    try {
      setErrors({});

      const data = {
        fullName,
        email,
        phone,
        password,
      }

      await schema.validate(data, { abortEarly: false });

      const { data: { session, user }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
          }
        }
      });

      if (error) {
        Alert.alert('Ops...', error.message);
        return;
      }
      
      if (session && user) {
        Alert.alert('Legal!', 'Cadastro realizado! Aproveite o uso do aplicativo.');
        router.push('/(private)/home');
      }

      if (!session) Alert.alert('Verificação', 'Por favor, verifique seu email para ativar sua conta.');
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
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Crie sua</Text>
            <Text style={styles.headerText}>conta</Text>
            <Image source={logo} resizeMode="contain" />
          </View>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nome completo</Text>
              <View style={styles.inputWrapper}>
                <Feather name="user" size={28} color="#000" />

                <TextInput
                  placeholder="Nome completo"
                  placeholderTextColor="#fff"
                  style={styles.input}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>

              <If condition={!!errors.fullName}>
                <Text style={styles.validation}>{errors.fullName}</Text>
              </If>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <Feather name="mail" size={28} color="#000" />

                <TextInput
                  placeholder="E-mail"
                  placeholderTextColor="#fff"
                  style={styles.input}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <If condition={!!errors.email}>
                <Text style={styles.validation}>{errors.email}</Text>
              </If>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Telefone</Text>
              <View style={styles.inputWrapper}>
                <Feather name="phone" size={28} color="#000" />

                <TextInput
                  placeholder="Telefone"
                  placeholderTextColor="#fff"
                  style={styles.input}
                  onChangeText={setPhone}
                  keyboardType="numeric"
                  autoCapitalize="none"
                />
              </View>

              <If condition={!!errors.phone}>
                <Text style={styles.validation}>{errors.phone}</Text>
              </If>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Senha</Text>

              <View style={styles.inputWrapper}>
                <TouchableOpacity style={styles.togglePasswordButton} onPress={() => setShowPassword(!showPassword)}>
                  <Feather name={showPassword ? 'eye-off' : 'eye'} size={28} color="#000" />
                </TouchableOpacity>

                <TextInput
                  placeholder="Senha"
                  placeholderTextColor="#fff"
                  style={styles.input}
                  onChangeText={setPassword}
                  ref={passwordInputRef}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  textContentType="oneTimeCode"
                />
              </View>

              <If condition={!!errors.password}>
                <Text style={styles.validation}>{errors.password}</Text>
              </If>
            </View>

            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
                <Text style={styles.submitButtonText}>Cadastrar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonWrapper}>
              <TouchableOpacity onPress={() => router.push('/(public)/login')}>
                <Text>Já tem uma conta? Entre</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50,
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  header: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: '400',
  },
  form: {
    marginTop: 32,
    gap: 16,
  },
  formGroup: {
    gap: 4,
  },
  label: {
    fontSize: 20,
    paddingLeft: 8,
  },
  inputWrapper: {
    height: 44,
    backgroundColor: 'hsla(0, 0%, 80%, 1)',
    borderRadius: 40,
    paddingHorizontal: 14,

    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingLeft: 16,
    height: '100%',
    color: '#151515',
    fontSize: 16,
  },
  togglePasswordButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordButton: {
    paddingVertical: 6,
    paddingLeft: 8,
  },
  forgotPasswordButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButton: {
    height: 62,
    paddingHorizontal: 74,
    backgroundColor: 'hsla(0, 71%, 50%, 1)',

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 40,

    // iOS shadow
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    // Android shadow
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 26,
    color: 'white',
  },
  validation: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 4,
  },
});

