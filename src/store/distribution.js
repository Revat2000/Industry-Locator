
// import firebase from 'firebase/app'

// import Distribution from './distribut_help'

// export default {
//   state: {

//   },

//   mutations: {

//   },

//   actions: {

//     async newDistribution ({commit}) {
//       commit('clearError')
//       commit('setLoading', true)
//       try {
//         // Чтениние данных поступивших из 1С и запись в объект класса Distribution
//         const curDist = await firebase.database().ref('start').once('value')
//         const curDistValue = curDist.val()

//         // eslint-disable-next-line no-unused-vars
//         let currentDist = new Distribution(
//           curDistValue.machineID,
//           curDistValue.machine,
//           curDistValue.commentID,
//           curDistValue.comment,
//           curDistValue.productID,
//           curDistValue.product,
//           curDistValue.operationID,
//           curDistValue.operation,
//           curDistValue.start,
//           curDistValue.finish,
//           curDistValue.balance
//         )
//         // console.log(currentDist)

//         // Поиск имеющейся записи в распределенной базе данных или создание новой из объекта Distribution

//         const mcnDB = await firebase.database().ref('OneC/machine_comment_new').once('value')
//         const mcnDBArr = mcnDB.val()
//         let checkMachine = false // ключь успешной проверки наличия станка в распределенной базе
//         let checkComment = false // ключь успешной проверки наличия комментария в распределенной базе
//         let checkProduct = false // ключь успешной проверки наличия номенклатуры в распределенной базе
//         let checkOperation = false // ключь успешной проверки наличия техоперации в распределенной базе
//         let path = ''
//         let path1 = ''
//         let path2 = ''
//         let path3 = ''
//         // console.log(mcnDBArr)
//         // цикл по станкам
//         Object.keys(mcnDBArr).forEach(key => {
//           if (mcnDBArr[key].id === curDistValue.machineID) {
//             // console.log('id cтанка: ' + mcnDBArr[key].id)
//             checkMachine = true
//             path = 'OneC/machine_comment_new/' + key + '/comments/'
//             // checkMachine = true
//             // console.log(checkMachine)
//             const ttComments = mcnDBArr[key].comments
//             // console.log(ttComments)

//             // цикл по комментариям
//             Object.keys(ttComments).forEach(key => {
//               if (ttComments[key].comID === curDistValue.commentID) {
//                 // console.log('Комментарий: ' + curDistValue.comment)
//                 checkComment = true
//                 path1 = path + key + '/products/'
//                 const pProducts = ttComments[key].products

//                 // цикл по номенклатуре
//                 Object.keys(pProducts).forEach(key => {
//                   if (pProducts[key].prodID === curDistValue.productID) {
//                     // console.log('Номенклатура: ' + curDistValue.product)
//                     checkProduct = true
//                     path2 = path1 + key + '/operations/'
//                     const operations = pProducts[key].operations

//                     // цикл по техоперациям
//                     Object.keys(operations).forEach(key => {
//                       if (operations[key].operID === curDistValue.operationID) {
//                         // console.log('Техоперация: ' + curDistValue.operation)
//                         checkOperation = true
//                         path3 = path2 + key
//                       }
//                     })
//                   }
//                 })
//               }
//             })
//           }
//         })

//         if (checkOperation) {
//           firebase.database().ref(path3).child('/activity').update({start: curDistValue.start, finish: curDistValue.finish, balance: curDistValue.balance})
//           // console.log('Обновление старт-финиш 1!')
//         } else if (checkProduct) {
//           const newOperKey = firebase.database().ref(path2).push().key
//           firebase.database().ref(path2).child(newOperKey).update({operID: curDistValue.operationID, operation: curDistValue.operation})
//           // console.log('Обновление техоперации 2!')

//           firebase.database().ref(path2 + newOperKey).child('/activity').update({start: curDistValue.start, finish: curDistValue.finish, balance: curDistValue.balance})
//           // console.log('Обновление старт-финиш 2!')
//         } else if (checkComment) {
//           const newProdKey = firebase.database().ref(path1).push().key
//           firebase.database().ref(path1).child(newProdKey).update({prodID: curDistValue.productID, product: curDistValue.product})
//           // console.log('Обновление продукции 3!')

//           const newOperKey = firebase.database().ref(path1 + newProdKey + '/operations').push().key
//           firebase.database().ref(path1 + newProdKey + '/operations/').child(newOperKey).update({operID: curDistValue.operationID, operation: curDistValue.operation})
//           // console.log('Обновление техоперации 3!')

//           firebase.database().ref(path1 + newProdKey + '/operations/' + newOperKey).child('/activity').update({start: curDistValue.start, finish: curDistValue.finish, balance: curDistValue.balance})
//           // console.log('Обновление старт-финиш 3!')
//         } else if (checkMachine) {
//           const newComKey = firebase.database().ref(path).push().key
//           firebase.database().ref(path).child(newComKey).update({comID: curDistValue.commentID, com: curDistValue.comment})
//           // console.log('Обновление комментария 4!')

//           const newProdKey = firebase.database().ref(path + newComKey + '/products').push().key
//           firebase.database().ref(path + newComKey + '/products').child(newProdKey).update({prodID: curDistValue.productID, product: curDistValue.product})
//           // console.log('Обновление продукции 4!')

//           const newOperKey = firebase.database().ref(path + newComKey + '/products/' + newProdKey + '/operations').push().key
//           firebase.database().ref(path + newComKey + '/products/' + newProdKey + '/operations').child(newOperKey).update({operID: curDistValue.operationID, operation: curDistValue.operation})
//           // console.log('Обновление техоперации 4!')

//           firebase.database().ref(path + newComKey + '/products/' + newProdKey + '/operations/' + newOperKey).child('/activity').update({start: curDistValue.start, finish: curDistValue.finish, balance: curDistValue.balance})
//           // console.log('Обновление старт-финиш 4!')
//         } else if (!checkMachine) {
//           const newFirstKey = firebase.database().ref('OneC').child('machine_comment_new').push().key
//           firebase.database().ref('OneC/machine_comment_new').child(newFirstKey).update({id: curDistValue.machineID})

//           const newComKey = firebase.database().ref('OneC/machine_comment_new' + newFirstKey + '/comments').push().key
//           firebase.database().ref('OneC/machine_comment_new/' + newFirstKey + '/comments').child(newComKey).update({comID: curDistValue.commentID, com: curDistValue.comment})

//           const newProdKey = firebase.database().ref('OneC/machine_comment_new' + newFirstKey + '/comments/' + newComKey + '/products').push().key
//           firebase.database().ref('OneC/machine_comment_new/' + newFirstKey + '/comments/' + newComKey + '/products').child(newProdKey).update({prodID: curDistValue.productID, product: curDistValue.product})

//           const newOperKey = firebase.database().ref('OneC/machine_comment_new' + newFirstKey + '/comments/' + newComKey + '/products/' + newProdKey + '/operations').push().key
//           firebase.database().ref('OneC/machine_comment_new/' + newFirstKey + '/comments/' + newComKey + '/products/' + newProdKey + '/operations').child(newOperKey).update({operID: curDistValue.operationID, operation: curDistValue.operation})
//           firebase.database().ref('OneC/machine_comment_new/' + newFirstKey + '/comments/' + newComKey + '/products/' + newProdKey + '/operations/' + newOperKey).child('/activity').update({start: curDistValue.start, finish: curDistValue.finish, balance: curDistValue.balance})
//           // console.log('Добавлена новая запись!')
//         }
//         commit('setLoading', false)
//       } catch (error) {
//         commit('setLoading', false)
//         commit('setError', error.message)
//         throw error
//       }
//     }

//   },
//   getters: {

//   }

// }
