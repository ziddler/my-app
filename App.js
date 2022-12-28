import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import store from './store/CustomerServiceStore.js';
import Root from './components/Root';


const Drawer = createDrawerNavigator();

export default function App() {
  React.useEffect(() => {
    //console.log(getHtml());
  } ,[])
  
  const getHtml = async () => {
    const response = await fetch("https://hive2.lexvid.com/api/Find?Filter=bi");
    const html = await response.json();
    console.log(html)   

    return html;
  }

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}


const styles = StyleSheet.create({
  backgroundImage: {
      flex: 1,
      width: null,
      height: null,
  },
});