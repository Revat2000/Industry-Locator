// у автора это task.js

import firebase from 'firebase/app'

// import Distribution from './distribut_help'
import Machines from './machines_help'
import Comments from './comments_help'
import Products from './products_help'
import Operations from './operations_help'
import Activity from './activity_help'

export default {
  state: {
    activeActions: [],
    activeComments: [],
    activeProducts: [],
    activeOperations: [],
    activeActivities: [],
    chUpdate: false
  },

  mutations: {
    loadActivities (state, payload) {
      state.activeActions = payload
    },
    loadComments (state, payload) {
      state.activeComments = payload
    },
    loadProducts (state, payload) {
      state.activeProducts = payload
    },
    loadOperations (state, payload) {
      state.activeOperations = payload
    },
    loadActivity (state, payload) {
      state.activeActivities = payload
    },
    checkUpdate (state, payload) {
      state.chUpdate = payload
    }
  },

  actions: {
    // Чтениние распределенных данных
    async loadActivities ({commit}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        // хранилище ссылок на изображения станков
        const machines = await firebase.database().ref('machines').once('value')
        const machinesImage = machines.val()

        const mcnDB = await firebase.database().ref('OneC/machine_comment_new').once('value')
        const mcnDBArr = mcnDB.val()

        const activeMachArr2 = []
        const activeCommentsArr2 = []
        const activeProductsArr = []
        let activeProductsArr2 = []
        let activeProductsArr3 = []
        let activeOperationsArr = []
        let activeActivitiesArr = []
        let ttCom2 = ''
        let prodArr2
        let i = 0

        Object.keys(mcnDBArr).forEach(key => {
          const ttId = mcnDBArr[key].id // текущий id станка
          const tt = mcnDBArr[key]
          const ttComments = mcnDBArr[key].comments
          // console.log('ttComments = ')
          // console.log(ttComments)
          activeProductsArr2 = []
          // массив комментариев
          Object.keys(ttComments).forEach(key => {
            const pProducts = ttComments[key].products
            const ttCom = ttComments[key].com
            activeProductsArr2 = []
            i = 0
            ttCom2 = ''
            // массив всей продукции
            Object.keys(pProducts).forEach(key => {
              let productsArr = pProducts[key].product
              let operations = pProducts[key].operations
              // operationsArr.push(operations)
              activeProductsArr2.push(productsArr)
              // чтобы не дублировать объекты Products с одинаковыми комментариями
              if (ttCom === ttCom2) {
              } else {
                activeProductsArr.push(new Products(
                  tt.id,
                  ttCom,
                  activeProductsArr2
                ))
              }
              activeProductsArr3.push(activeProductsArr2[i])
              i++
              Object.keys(activeProductsArr3).forEach(key => {
                let prodArr = activeProductsArr3[key]
                if (ttCom === ttCom2 & prodArr2 === prodArr) {
                } else {
                  activeOperationsArr.push(new Operations(
                    tt.id,
                    ttCom,
                    prodArr,
                    operations
                  ))
                  // масив техопераций и значений старт-финиш
                  Object.keys(operations).forEach(key => {
                    const oper = operations[key].operation
                    // console.log(oper)
                    const activ = operations[key].activity
                    activeActivitiesArr.push(new Activity(
                      tt.id,
                      ttCom,
                      prodArr,
                      oper,
                      activ.start,
                      activ.finish,
                      activ.balance
                    ))
                  })
                  prodArr2 = prodArr
                }
              })
              ttCom2 = ttCom
              activeProductsArr3 = []
            })
          })
          // Определение активных станков и формирование переноса
          // их массива в мутации для отражения картинки и названия станка
          Object.keys(machinesImage).forEach(key => {
            const tttId = machinesImage[key].id
            const t = machinesImage[key]
            if (ttId === tttId) {
              activeMachArr2.push(
                new Machines(
                  tt.used = true,
                  tt.id,
                  t.image,
                  t.title,
                  ttComments
                )
              )
            }
          })

          activeCommentsArr2.push(new Comments(
            tt.id,
            ttComments
          ))
        })
        // console.log('loadActivities - has done!')
        commit('loadActivities', activeMachArr2)
        commit('loadComments', activeCommentsArr2)
        commit('loadProducts', activeProductsArr)
        commit('loadOperations', activeOperationsArr)
        commit('loadActivity', activeActivitiesArr)
        commit('checkUpdate', true)
        // commit('setUser', new User(user.user.uid))

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    machines (state) {
      return state.activeActions.filter(activeActions => {
        return activeActions.used
      })
    },
    comments (state) {
      return state.activeComments
    },
    products (state) {
      return state.activeProducts
    },
    operations (state) {
      return state.activeOperations
    },
    activity (state) {
      return state.activeActivities
    },
    checkUpdate (state) {
      return state.chUpdate
    }
    // ,
    // machinesCompleted (state) {
    //   return state.activeActions.filter(activeActions => {
    //     return activeActions.used
    //   })
    // },
    // machinesNotCompleted (state) {
    //   return state.activeActions.filter(activeActions => {
    //     return activeActions.used === false
    //   })
    // }
  }
}
