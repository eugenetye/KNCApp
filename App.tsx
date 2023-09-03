import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Footer from './src/Footer';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Footer/>
    </NavigationContainer>
  );
}
