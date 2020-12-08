import firebase from 'firebase/app'

// import WorkDistribut from './workDistributHelp'
import UserCompletedWork from './UserCompletedWork'

export default {
  state: {
    completedWorksArr: [],
    userName: ''
  },

  mutations: {
    completedWorks (state, payload) {
      state.completedWorksArr = payload
    },
    userNameLabel (state, payload) {
      state.userName = payload
    }
  },

  actions: {

    async completedWork ({commit}, {startDate, endDate, userID}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        // поиск штрихкода соответствующего текущему userID
        const regUsers = await firebase.database().ref('registred_users').once('value')
        const regUsersDB = regUsers.val()

        let curUserBarcode = ''
        let activeUserJobsArr = []
        let startDateCompare = new Date(startDate).setHours(0, 0, 0, 0)
        let endDateCompare = new Date(endDate).setHours(0, 0, 0, 0)
        let curUserFio = ''
        // let curUserProduct = ''
        // let curUserOperation = ''
        // let curUserFinish = 0

        Object.keys(regUsersDB).forEach(key => {
          const ID = regUsersDB[key].id // id текущего пользователя
          if (ID === userID) {
            curUserBarcode = regUsersDB[key].barcode
          }
        })

        // Чтениние данных из БД распределенных работ для текущего пользователя и запись массива в объект класса UserCompletedWork
        const workDistribution = await firebase.database().ref('work_distribution').once('value')
        const distWork = workDistribution.val()

        Object.keys(distWork).forEach(key => {
          const curKey = key
          const dateDB = new Date(key).setHours(0, 0, 0, 0) //  дата по базе данных
          const barcodeArr = distWork[key] //  штрихкод по базе данных
          Object.keys(barcodeArr).forEach(key => {
            const barcode = key

            // сравнение дат из БД с диапазоном выбранным пользователем
            if (startDateCompare <= dateDB && endDateCompare >= dateDB) {
              if (curUserBarcode === barcode) {
                const curUserJob = barcodeArr[key]

                // приведение даты в понятный вид
                const date = new Date(curKey).getDate()
                const month = new Date(curKey).getMonth() + 1
                const year = new Date(curKey).getFullYear()
                const fullDate = date + '-' + month + '-' + year

                Object.keys(curUserJob).forEach(key => {
                  const CUJ = curUserJob[key]
                  curUserFio = CUJ.fio
                  // if (CUJ.finish !== 0) {
                  activeUserJobsArr.push(new UserCompletedWork(
                    CUJ.fio,
                    fullDate,
                    CUJ.product,
                    CUJ.operation,
                    CUJ.finish
                  ))
                  // }
                })
              }
            }
          })
        })

        // console.log(activeUserJobsArr)
        commit('userNameLabel', curUserFio)
        commit('completedWorks', activeUserJobsArr)

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    userJobs (state) {
      return state.completedWorksArr
    },
    userFio (state) {
      return state.userName
    }
  }
}
