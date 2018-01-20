// 'use strict';
// import React from 'react';
// import { Alert, Linking, Share, Platform } from 'react-native';
//
// import axios from 'axios';
//
// import { NavigationActions } from 'react-navigation';
//
// // import type {Icon, IconElement } from '../components/elements/Types';
// // import { AlertUnique } from '../components/elements/AlertUnique';
//
// // import { images, ImageSizes, texts, urls } from '../assets';
// // import { config } from '../config';
//
// import Entypo from 'react-native-vector-icons/Entypo';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Foundation from 'react-native-vector-icons/Foundation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Octicons from 'react-native-vector-icons/Octicons';
// import Zocial from 'react-native-vector-icons/Zocial';
//
// import moment from 'moment';
//
//
// /**
//  * Maps a Icon to the appropriate react-native-vector-icons react component
//  * @param icon The icon information, including family and icon name
//  * @param props Additional props for the icon, such as color
//  * @return {XML}
//  */
// function getIconElement(icon: Icon, props: Object) {
//
//   const IconFamilies = {
//     Entypo,
//     EvilIcons,
//     FontAwesome,
//     // Foundation,
//     Ionicons,
//     MaterialIcons,
//     MaterialCommunityIcons,
//     Octicons,
//     Zocial,
//   };
//
//   if (!(icon.family in IconFamilies)) {
//     throw Error(`Unknown family ${icon.family}`);
//   } else {
//     let Icon = IconFamilies[icon.family];
//     return <Icon name={icon.name} {...props} />;
//   }
// }
//
// /**
//  * Generates an object that can be passed to a ListView, allowing to generate a list view with multiple sections.
//  * The data needs to be passed in the following format:
//  * [{section: sectionID, rows: Array}, {section: sectionID, rows: Array}, ...]
//  * The section ID has to be a unique string and the rows for that section need to be passed as an array
//  * (when rendering a single row, each of these rows will be passed as a rowData object).
//  *
//  * @param data The data object containing all the data divided by section
//  * @param dataSource The ListView.DataSource object initialized inside the calling component,
//  * needed for properly passing the data to the list view
//  */
// function generateSectionDataBlobs(data, dataSource) {
//   let dataBlob = [];
//   let sectionIDs = [];
//   let rowIDs = [];
//
//   // Handle sections
//   for (let i = 0; i < data.length; ++i) {
//     sectionIDs.push(data[i].section);
//
//     // Handle row data
//     rowIDs[i] = [];
//     for (let j = 0; j < data[i].rows.length; ++j) {
//       // add an unique row id
//       rowIDs[i].push(dataBlob.length + j);
//     }
//     // append row data to dataBlob
//     dataBlob.push(...data[i].rows);
//   }
//
//   return dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
// }
//
// function resetNavigationRoute(dispatch, route) {
//   const resetAction = NavigationActions.reset({
//     index: 0,
//     actions: [
//       NavigationActions.navigate({ routeName: route})
//     ]
//   });
//   dispatch && dispatch(resetAction);
// }
//
// // const axiosInstance = axios.create({
// //   baseURL: urls.server.url,
// //   timeout: config.timeout,
// //   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
// // });
//
// // axiosInstance.interceptors.response.use((response) => {
// //   return response;
// // }, (error) => {
// //   let errorTitle = null;
// //   let errorMessage = null;
// //   if (error.response) {
// //     if (error.response.status == 401) {
// //       if (error.response.config.headers.Authorization) {
// //         const token = error.response.config.headers.Authorization.slice(3);
// //         const decoded = jwtDecode(token);
// //         const expirationDate = new Date(decoded.exp * 1000);
// //         if (expirationDate < new Date()) {
// //           Debug.warn('Auth token expired and caused a 401');
// //           errorTitle = 'Authentifizierungsfehler';
// //           errorMessage = 'Bitte loggen Sie sich erneut';
// //         } else {
// //           errorTitle = 'Authentifizierungsfehler';
// //           errorMessage = 'Bitte loggen Sie sich erneut';
// //         }
// //       } else {
// //         errorTitle = 'Authentifizierungsfehler';
// //         errorMessage = 'Bitte loggen Sie sich erneut';
// //       }
// //     } else if (error.response.status == 503 || error.response.status == 502) {
// //       errorTitle = texts.errors['502'].title;
// //       errorMessage = texts.errors['502'].message;
// //     }
// //   }
// //
// //   if (errorTitle && errorMessage) {
// //     displayError(errorTitle, errorMessage);
// //   }
// //
// //   return Promise.reject(error);
// // });
//
// function getRouteParams(routes, name) {
//   const route = routes.find(r => r.routeName == name);
//   return route ? route.params : {};
// }
//
// function getNavigationParams(component) {
//   return component.props.navigation.state.params;
// }
//
// // function genericErrorHandler(error, silent, deviceInfo = null, dispatch) {
// //   const online = deviceInfo ? deviceInfo.online : true;
// //   if (error.response) {
// //     if (error.response.status == 400) {
// //       displayError('Fehler', `Eingabe war falsch. Status ${error.response.status}`);
// //     } else if (error.response.status == 401) {
// //       displayError(texts.errors['401'].title, texts.errors['401'].message);
// //       if (dispatch) {
// //         dispatch({ type: userType.logout });
// //       }
// //     } else if (error.response.status == 403) {
// //       displayError(texts.errors['403'].title, texts.errors['403'].message);
// //     } else if (error.response.status == 404) {
// //       Debug.log(error.response);
// //       displayError(texts.errors['404'].title, texts.errors['404'].message);
// //     } else if (error.response.status == 502 || error.response.status == 503) {
// //       displayError(texts.errors['502'].title, texts.errors['502'].message);
// //     } else if (!silent) {
// //       displayError(texts.errors.unknown.title, texts.errors.unknown.message);
// //     }
// //   } else {
// //     if (online) {
// //       if (error == 'ECONNABORTED' || error.code == 'ECONNABORTED') {
// //         displayError(texts.errors.timeout.title, texts.errors.timeout.message);
// //       } else {
// //         Debug.warn(error);
// //       }
// //     } else {
// //       displayError(texts.errors.noInternet.title, texts.errors.noInternet.message);
// //     }
// //   }
// // }
//
// export const utils = {
//   getIconElement,
//   getRouteParams,
//   getNavigationParams,
//   resetNavigationRoute
// };
